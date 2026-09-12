import type { NextConfig } from "next";

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
};

export default nextConfig;
