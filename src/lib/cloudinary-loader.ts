import type { ImageLoaderProps } from "next/image";
import { withTransform } from "./cloudinary";

/**
 * next/image loader that sends every request straight to Cloudinary.
 *
 * Before this, each photograph made two cold hops: Vercel's optimiser fetched
 * the 250 kB original from Cloudinary, re-encoded it, and did that again for
 * every width and every deploy. Now the browser asks Cloudinary for exactly
 * the width next/image chose, f_auto picks WebP or AVIF from the Accept
 * header, q_auto picks the quality, c_limit refuses to upscale past the
 * 1280px originals, and the derived image is stored and edge cached the
 * first time anyone asks for it. `npm run images:warm` asks first, so no
 * visitor pays for a cold transformation.
 *
 * koombei-studio-skill Part 8: always q_auto,f_auto, never a raw original.
 *
 * Local files (the logo, two artworks) pass through unchanged and are served
 * as static files.
 */
export default function cloudinaryLoader({ src, width }: ImageLoaderProps): string {
  return withTransform(src, `f_auto,q_auto,c_limit,w_${width}`);
}
