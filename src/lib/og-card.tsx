import { ImageResponse } from "next/og";
import { PHOTOS, LOGO } from "./content";
import { withTransform } from "./cloudinary";

/**
 * The share card: what a link to the site looks like when it is pasted into
 * WhatsApp, Facebook, LinkedIn or X, which is how an NGO's links actually
 * travel. Rendered at build by next/og and served as a static PNG from
 * /opengraph-image and /twitter-image.
 *
 * Everything is fetched at build and every fetch degrades: a missing
 * photograph leaves the ink band, a missing badge leaves the words, and a
 * missing font falls back to the renderer's own sans. A share card is never
 * worth a failed deploy.
 *
 * The fonts are Fontshare's TTF files, because the renderer cannot read
 * WOFF2. They are fetched from Fontshare at build, exactly like the site's
 * own faces, and are never committed, for the licence reason in globals.css.
 */

export const SHARE_CARD_SIZE = { width: 1200, height: 630 };

const FONT_URLS = {
  display:
    "https://cdn.fontshare.com/wf/LJ2MIWBZLOP5ROTPIATJWJHTCINMBNEE/S7KFQDT7WDO3EXV2IMELFT6AAOX24DTM/A3D35MFKWQ3EIKAD2QI6LGKQ7ZD2BKN5.ttf",
  body: "https://cdn.fontshare.com/wf/P2LQKHE6KA6ZP4AAGN72KDWMHH6ZH3TA/ZC32TK2P7FPS5GFTL46EU6KQJA24ZYDB/7AHDUZ4A7LFLVFUIFSARGIWCRQJHISQP.ttf",
};

const INK = "#103028";
const CREAM = "#f4f1ea";
/** --accent on the band. */
const GOLD_ON_INK = "#d9b640";
const STRIP = 14;

async function fetchBytes(url: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

async function fetchDataUrl(url: string, mime: string): Promise<string | null> {
  const bytes = await fetchBytes(url);
  return bytes
    ? `data:${mime};base64,${Buffer.from(bytes).toString("base64")}`
    : null;
}

/** The triangle weave from .woven-edge, as an SVG strip the renderer can draw. */
function wovenStrip(width: number): string {
  const colours = ["#1f6f5c", "#c9a227", "#b4402f"];
  let polygons = "";
  for (let x = 0, i = 0; x < width; x += 16, i++) {
    polygons += `<polygon points="${x},${STRIP} ${x + 8},0 ${x + 16},${STRIP}" fill="${colours[i % 3]}"/>`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${STRIP}">${polygons}</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

type CardFont = {
  name: string;
  data: ArrayBuffer;
  weight: 500 | 700;
  style: "normal";
};

export async function renderShareCard(): Promise<ImageResponse> {
  const { width, height } = SHARE_CARD_SIZE;

  const [photo, badge, display, body] = await Promise.all([
    fetchDataUrl(
      withTransform(
        PHOTOS.dancersSmiling.src,
        `c_fill,g_auto,w_${width},h_${height},f_jpg,q_80`
      ),
      "image/jpeg"
    ),
    fetchDataUrl(withTransform(LOGO.badge, "f_png,w_520"), "image/png"),
    fetchBytes(FONT_URLS.display),
    fetchBytes(FONT_URLS.body),
  ]);

  const fonts: CardFont[] = [];
  if (display) fonts.push({ name: "Bespoke Serif", data: display, weight: 700, style: "normal" });
  if (body) fonts.push({ name: "Satoshi", data: body, weight: 500, style: "normal" });

  return new ImageResponse(
    (
      <div
        style={{
          width,
          height,
          display: "flex",
          position: "relative",
          backgroundColor: INK,
          fontFamily: body ? "Satoshi" : undefined,
        }}
      >
        {photo && (
          <img
            src={photo}
            alt=""
            width={width}
            height={height}
            style={{ position: "absolute", top: 0, left: 0, width, height, objectFit: "cover" }}
          />
        )}

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width,
            height,
            display: "flex",
            backgroundImage:
              "linear-gradient(90deg, rgba(16,48,40,0.97) 0%, rgba(16,48,40,0.9) 50%, rgba(16,48,40,0.42) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width,
            height: height - STRIP,
            display: "flex",
            alignItems: "center",
            paddingLeft: 72,
            paddingRight: 72,
          }}
        >
          {badge && (
            <img
              src={badge}
              alt=""
              width={236}
              height={236}
              style={{ marginRight: 52 }}
            />
          )}
          <div style={{ display: "flex", flexDirection: "column", maxWidth: badge ? 720 : 980 }}>
            <div
              style={{
                display: "flex",
                fontSize: 20,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: GOLD_ON_INK,
              }}
            >
              Registered Ghanaian NGO
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 18,
                fontFamily: display ? "Bespoke Serif" : undefined,
                fontWeight: 700,
                fontSize: 66,
                lineHeight: 1.04,
                color: CREAM,
              }}
            >
              Nkrabea Culture and Arts Ensemble
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 30,
                lineHeight: 1.3,
                color: "rgba(244,241,234,0.86)",
              }}
            >
              Impacting lives through culture and the arts
            </div>
          </div>
        </div>

        <img
          src={wovenStrip(width)}
          alt=""
          width={width}
          height={STRIP}
          style={{ position: "absolute", left: 0, bottom: 0 }}
        />
      </div>
    ),
    { ...SHARE_CARD_SIZE, fonts: fonts.length ? fonts : undefined }
  );
}
