import Image from "next/image";
import type { Photo } from "@/lib/content";

/**
 * The four ways a photograph appears outside a hero.
 *
 * All of them share one grade (.photo-tone on the image, .photo-grade over
 * it): a slight desaturation and a 14% ink multiply, so forty photographs
 * shot on three different days in three kinds of light sit in the same
 * palette as the band instead of fighting it. That grade is the difference
 * between a site that uses photographs and a site that was designed with
 * them.
 *
 * Captions are set below the image on the page surface, never over it, so
 * their contrast does not depend on what the photograph happens to be.
 */

export function PhotoFigure({
  photo,
  ratio = "4/5",
  sizes = "(max-width: 1024px) 100vw, 33vw",
  caption,
  priority = false,
  bare = false,
  className = "",
}: {
  photo: Photo;
  /** CSS aspect-ratio, e.g. "4/5", "3/2", "1/1". */
  ratio?: string;
  sizes?: string;
  caption?: string;
  priority?: boolean;
  /** Drops the radius and shadow, for use inside a card. */
  bare?: boolean;
  className?: string;
}) {
  return (
    <figure className={`m-0 ${className}`}>
      <div
        className={`photo-frame relative overflow-hidden ${
          bare ? "" : "rounded-2xl"
        }`}
        style={{ aspectRatio: ratio }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="photo-tone object-cover"
        />
        <div className="photo-grade absolute inset-0" aria-hidden="true" />
      </div>
      {caption && (
        <figcaption className="label-mono mt-3 text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * A large photograph with a smaller one mounted over its corner, the way a
 * print sits on a board. Stacks plainly on small screens.
 */
export function PhotoDuo({
  primary,
  secondary,
  ring = "ring-background",
}: {
  primary: Photo;
  secondary: Photo;
  /** Tailwind ring colour matching the section surface. */
  ring?: string;
}) {
  return (
    <div className="relative lg:mb-12 lg:mr-6">
      <PhotoFigure
        photo={primary}
        ratio="4/5"
        sizes="(max-width: 1024px) 100vw, 40vw"
      />
      <div className="mt-4 w-3/4 lg:absolute lg:-bottom-12 lg:-right-6 lg:mt-0 lg:w-[58%]">
        <PhotoFigure
          photo={secondary}
          ratio="4/3"
          sizes="(max-width: 1024px) 75vw, 24vw"
          className={`rounded-2xl ring-8 ${ring}`}
        />
      </div>
    </div>
  );
}

/** Three or four photographs in a row, with a label above and a note below. */
export function PhotoStrip({
  photos,
  label,
  note,
  ratio = "4/5",
}: {
  photos: Photo[];
  label: string;
  note?: string;
  ratio?: string;
}) {
  const cols =
    photos.length >= 4 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-3";
  return (
    <div>
      <p className="label-mono text-primary">{label}</p>
      <div className="section-mark mt-4" aria-hidden="true" />
      <ul className={`mt-7 grid gap-3 sm:gap-5 ${cols}`}>
        {photos.map((photo) => (
          <li key={photo.src}>
            <PhotoFigure
              photo={photo}
              ratio={ratio}
              sizes={`(max-width: 640px) 33vw, ${Math.round(100 / photos.length)}vw`}
              caption={photo.caption}
            />
          </li>
        ))}
      </ul>
      {note && (
        <p className="mt-6 max-w-xl text-xs leading-relaxed text-muted-foreground">
          {note}
        </p>
      )}
    </div>
  );
}

/**
 * A full width photograph between sections, with room for one line of
 * Nkrabea's own words. The deep grade at the foot is what makes the words
 * legible on any picture: cream on 90% ink clears AA whatever sits behind it.
 */
export function PhotoBreak({
  photo,
  quote,
  cite,
  label,
}: {
  photo: Photo;
  quote?: string;
  cite?: string;
  /** A short mono label when there is no quote. */
  label?: string;
}) {
  return (
    <section
      data-rhythm-node
      className="relative isolate flex min-h-[clamp(20rem,58svh,36rem)] items-end overflow-hidden bg-band text-band-foreground"
      aria-label={quote ? undefined : label ?? photo.alt}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="100vw"
        className="photo-tone object-cover"
      />
      <div
        className="photo-grade photo-grade--deep absolute inset-0"
        aria-hidden="true"
      />
      <div className="woven-edge absolute inset-x-0 top-0" aria-hidden="true" />

      {(quote || label) && (
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-20">
          {quote ? (
            <blockquote className="max-w-2xl">
              <p className="font-display text-sub">{quote}</p>
              {cite && (
                <footer className="label-mono mt-5 text-accent">{cite}</footer>
              )}
            </blockquote>
          ) : (
            <p className="label-mono text-accent">{label}</p>
          )}
        </div>
      )}

      <div
        className="woven-edge woven-edge--flip absolute inset-x-0 bottom-0"
        aria-hidden="true"
      />
    </section>
  );
}
