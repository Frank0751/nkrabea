import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Nkrabea's own Cloudinary account, pinned to their cloud so the site
    // cannot be pointed at another library. Delivery is public, so no API
    // credentials are needed here or at runtime.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dmyrmlj5z/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
