import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

/**
 * Refuse to build with a Paystack SECRET key anywhere it could reach a
 * browser. Every NEXT_PUBLIC_ variable and everything under src/ is compiled
 * into the JavaScript each visitor downloads, and a secret key there can move
 * Nkrabea's money. Public keys (pk_) are meant for the browser and pass;
 * secret keys stop the build here, in development and on Vercel alike,
 * before anything ships.
 */
const PAYSTACK_SECRET = /\bsk_(live|test)_[A-Za-z0-9]{8,}/;
const SECRET_ADVICE =
  "Paystack secret keys (sk_) can move money and must never be compiled into the site. " +
  "Use the PUBLIC key (pk_) instead, and regenerate the secret key in Paystack, because it may already have been exposed.";

function assertNoPaystackSecret() {
  for (const [name, value] of Object.entries(process.env)) {
    if (name.startsWith("NEXT_PUBLIC_") && value && PAYSTACK_SECRET.test(value)) {
      throw new Error(`${name} holds a Paystack secret key. ${SECRET_ADVICE}`);
    }
  }
  const pending = [path.join(process.cwd(), "src")];
  while (pending.length > 0) {
    const dir = pending.pop()!;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        pending.push(full);
      } else if (
        /\.(ts|tsx|js|jsx|mjs|json)$/.test(entry.name) &&
        PAYSTACK_SECRET.test(fs.readFileSync(full, "utf8"))
      ) {
        throw new Error(
          `${path.relative(process.cwd(), full)} contains a Paystack secret key. ${SECRET_ADVICE}`
        );
      }
    }
  }
}

assertNoPaystackSecret();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Every photograph is served by Cloudinary directly, resized to the width
    // next/image asks for, in the format the browser accepts. Vercel's
    // optimiser is out of the path entirely: it was a second cold hop on top
    // of Cloudinary's, repeated for every width and every deploy. The loader
    // only rewrites URLs on Nkrabea's own cloud; anything else passes through.
    loader: "custom",
    loaderFile: "./src/lib/cloudinary-loader.ts",
    // The originals are 1280px wide at most, so wider candidates would only
    // repeat the same file under a different name.
    deviceSizes: [384, 640, 750, 828, 1080, 1280],
    imageSizes: [64, 96, 128, 160, 256],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Baseline headers for every response. There is no Content-Security-Policy
  // yet: the page loads Fontshare, Cloudinary and Web3Forms, and a policy that
  // is wrong breaks the site silently in some browsers. Add one deliberately,
  // tested, rather than by default.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // payment is allowed for this page and Paystack's checkout frame
          // only. The frame asks for it (allow="payment") to offer Apple Pay
          // and Google Pay, and payment=() would have blocked that silently.
          {
            key: "Permissions-Policy",
            value:
              'camera=(), microphone=(), geolocation=(), payment=(self "https://checkout.paystack.com"), usb=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
