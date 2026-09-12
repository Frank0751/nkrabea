import type { Metadata } from "next";

/**
 * TEMPORARY REVIEW PAGE. Delete this route once the display face is chosen.
 *
 * Three type pairings rendered on the real content, with the proposed colour
 * shift applied, so the decision is made on rendered type rather than on font
 * names. Satoshi is the body face in all three, loaded from Fontshare's own
 * CDN: no font binary enters this public repository, which is what ruled
 * Satoshi out the first time.
 */

export const metadata: Metadata = {
  title: "Type lab",
  robots: { index: false, follow: false },
};

const BODY = '"Satoshi", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, monospace';

const PAIRINGS = [
  {
    id: "A",
    name: "Bespoke Serif",
    stack: '"Bespoke Serif", Georgia, serif',
    weight: 700,
    tracking: "-0.022em",
    note: "Editorial warmth, and the one you first picked. Reads as heritage and institutional credibility, which is the register funders and ministries respond to. Unlike DM Serif Display it has real weights, so headings can carry force.",
  },
  {
    id: "B",
    name: "Clash Display",
    stack: '"Clash Display", "Satoshi", system-ui, sans-serif',
    weight: 600,
    tracking: "-0.018em",
    note: "Bold and geometric. Reads as a contemporary arts organisation with energy behind it, and sits closest to the drumming and dance side of the work. The biggest departure from what is live now.",
  },
  {
    id: "C",
    name: "Zodiak",
    stack: '"Zodiak", Georgia, serif',
    weight: 800,
    tracking: "-0.012em",
    note: "High contrast serif with attitude, closer to a magazine masthead. Keeps the cultural gravity of a serif but feels sharper and more designed than the current one.",
  },
];

const SWATCHES_NOW = [
  { name: "Band, near black", hex: "#14181a", note: "hero, footer, CTA" },
  { name: "Paper cream", hex: "#f4f1ea", note: "every light section" },
  { name: "Akan gold", hex: "#c9a227", note: "one button, hairlines" },
  { name: "Badge green", hex: "#1f6f5c", note: "small text and icons only" },
  { name: "Clay red", hex: "#b4402f", note: "a 3px divider" },
];

const SWATCHES_NEXT = [
  { name: "Band, forest ink", hex: "#10312a", note: "hero, footer, CTA" },
  { name: "Paper cream", hex: "#f6f3ec", note: "reading surfaces" },
  { name: "Sand", hex: "#eae3d4", note: "a second light surface, so sections are built from planes, not borders" },
  { name: "Akan gold", hex: "#c9a227", note: "numerals, pattern, rules, CTA" },
  { name: "Deep green", hex: "#1f6f5c", note: "charts, pattern, section marks" },
  { name: "Clay red", hex: "#b4402f", note: "second data colour and emphasis" },
];

function Block({ pairing }: { pairing: (typeof PAIRINGS)[number] }) {
  const display = {
    fontFamily: pairing.stack,
    fontWeight: pairing.weight,
    letterSpacing: pairing.tracking,
    lineHeight: 1.06,
  };

  return (
    <section style={{ marginBottom: 88 }}>
      <p
        style={{
          fontFamily: MONO,
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#8a7a4e",
          marginBottom: 14,
        }}
      >
        Option {pairing.id} / {pairing.name} with Satoshi
      </p>

      {/* Dark band, proposed forest ink instead of near black */}
      <div
        style={{
          background: "#10312a",
          color: "#f6f3ec",
          padding: "56px 40px",
          borderRadius: 18,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.5,
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(201,162,39,0.11) 0 2px, transparent 2px 16px), repeating-linear-gradient(45deg, rgba(180,64,47,0.09) 0 2px, transparent 2px 22px)",
          }}
        />
        <div style={{ position: "relative" }}>
          <p
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#d8b64a",
            }}
          >
            Impacting lives through culture and the arts
          </p>
          <h1 style={{ ...display, fontSize: 62, margin: "20px 0 0" }}>
            Ghanaian culture as a tool for{" "}
            <span style={{ color: "#d8b64a" }}>real change</span>
          </h1>
          <p
            style={{
              fontFamily: BODY,
              fontWeight: 400,
              fontSize: 17,
              lineHeight: 1.75,
              maxWidth: 560,
              margin: "22px 0 0",
              color: "rgba(246,243,236,0.82)",
            }}
          >
            A Ghanaian NGO empowering marginalised communities through culture
            and the arts.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
            <span
              style={{
                fontFamily: BODY,
                fontWeight: 700,
                fontSize: 15,
                background: "#c9a227",
                color: "#14181a",
                padding: "13px 24px",
                borderRadius: 999,
              }}
            >
              Partner With Us
            </span>
            <span
              style={{
                fontFamily: BODY,
                fontWeight: 500,
                fontSize: 15,
                border: "1.5px solid rgba(246,243,236,0.35)",
                color: "#f6f3ec",
                padding: "13px 24px",
                borderRadius: 999,
              }}
            >
              Support Our Work
            </span>
          </div>
        </div>
      </div>

      {/* Light section with a stat and a card */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 1fr",
          gap: 40,
          background: "#eae3d4",
          padding: "44px 40px",
          borderRadius: 18,
          marginTop: 14,
        }}
      >
        <div>
          <h2 style={{ ...display, fontSize: 38, color: "#14181a", margin: 0 }}>
            Culture is the tool. Development is the work.
          </h2>
          <p
            style={{
              fontFamily: BODY,
              fontSize: 16,
              lineHeight: 1.8,
              color: "#3c4442",
              marginTop: 18,
            }}
          >
            To showcase, amplify and promote Ghanaian culture and arts dynamism
            as a tool and contribution to socio-economic and cultural
            development.
          </p>
          <p
            style={{
              fontFamily: BODY,
              fontWeight: 700,
              fontSize: 15,
              color: "#1f6f5c",
              marginTop: 20,
            }}
          >
            See the case for support
          </p>
        </div>

        <div>
          <div style={{ display: "flex", gap: 28 }}>
            <div>
              <p
                style={{
                  ...display,
                  fontSize: 58,
                  color: "#14181a",
                  margin: 0,
                }}
              >
                500
              </p>
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#6b6257",
                  marginTop: 8,
                }}
              >
                PWDs to train
              </p>
            </div>
            <div>
              <p
                style={{
                  ...display,
                  fontSize: 58,
                  color: "#14181a",
                  margin: 0,
                }}
              >
                100
              </p>
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#6b6257",
                  marginTop: 8,
                }}
              >
                Deaf students
              </p>
            </div>
          </div>

          <div
            style={{
              background: "#fdfbf6",
              border: "1px solid #ddd3bd",
              borderRadius: 14,
              padding: 22,
              marginTop: 26,
            }}
          >
            <p
              style={{
                fontFamily: MONO,
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#1f6f5c",
              }}
            >
              Raising funds
            </p>
            <h3
              style={{
                ...display,
                fontSize: 19,
                color: "#14181a",
                margin: "12px 0 0",
                lineHeight: 1.25,
              }}
            >
              Skills Development, Cape Coast School for the Deaf
            </h3>
            <p
              style={{
                fontFamily: BODY,
                fontSize: 14,
                lineHeight: 1.7,
                color: "#5a5348",
                marginTop: 10,
              }}
            >
              Kente weaving and vibrotactile drumming for 100 students, with
              every piece of equipment left behind as a school asset.
            </p>
          </div>
        </div>
      </div>

      <p
        style={{
          fontFamily: BODY,
          fontSize: 14,
          lineHeight: 1.7,
          color: "#5a5348",
          marginTop: 16,
          maxWidth: 900,
        }}
      >
        {pairing.note}
      </p>
    </section>
  );
}

export default function TypeLabPage() {
  return (
    <>
      <link rel="preconnect" href="https://api.fontshare.com" />
      <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f%5B%5D=satoshi@400,500,700,900&display=swap" />
      <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f%5B%5D=bespoke-serif@400,500,700&display=swap" />
      <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f%5B%5D=clash-display@400,500,600,700&display=swap" />
      <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f%5B%5D=zodiak@400,700,800&display=swap" />

      <main
        id="main"
        style={{
          background: "#f6f3ec",
          minHeight: "100vh",
          padding: "56px 24px 96px",
        }}
      >
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <h1
            style={{
              fontFamily: BODY,
              fontWeight: 900,
              fontSize: 30,
              letterSpacing: "-0.02em",
              color: "#14181a",
              margin: 0,
            }}
          >
            Three ways the site could read
          </h1>
          <p
            style={{
              fontFamily: BODY,
              fontSize: 16,
              lineHeight: 1.75,
              color: "#5a5348",
              maxWidth: 680,
              marginTop: 12,
            }}
          >
            Satoshi is the body and interface face in all three, so what changes
            between them is the display face and nothing else. The dark band,
            the sand surface and the pattern behind the band are the proposed
            colour shift, shown here so both decisions can be made at once.
            Pick a letter.
          </p>

          <div
            style={{
              height: 3,
              margin: "34px 0 44px",
              backgroundImage:
                "repeating-linear-gradient(90deg, #1f6f5c 0 14px, #c9a227 14px 28px, #b4402f 28px 42px)",
            }}
          />

          {PAIRINGS.map((p) => (
            <Block key={p.id} pairing={p} />
          ))}

          {/* Palette comparison */}
          <section>
            <p
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#8a7a4e",
                marginBottom: 18,
              }}
            >
              The colour shift
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 40,
              }}
            >
              {[
                { title: "Live now", items: SWATCHES_NOW },
                { title: "Proposed", items: SWATCHES_NEXT },
              ].map((col) => (
                <div key={col.title}>
                  <h2
                    style={{
                      fontFamily: BODY,
                      fontWeight: 700,
                      fontSize: 17,
                      color: "#14181a",
                      margin: "0 0 16px",
                    }}
                  >
                    {col.title}
                  </h2>
                  {col.items.map((s) => (
                    <div
                      key={s.name + s.hex}
                      style={{
                        display: "flex",
                        gap: 14,
                        alignItems: "flex-start",
                        marginBottom: 14,
                      }}
                    >
                      <span
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 10,
                          background: s.hex,
                          border: "1px solid rgba(20,24,26,0.12)",
                          flexShrink: 0,
                        }}
                      />
                      <span>
                        <span
                          style={{
                            fontFamily: BODY,
                            fontWeight: 700,
                            fontSize: 14,
                            color: "#14181a",
                            display: "block",
                          }}
                        >
                          {s.name}
                        </span>
                        <span
                          style={{
                            fontFamily: BODY,
                            fontSize: 13,
                            lineHeight: 1.6,
                            color: "#5a5348",
                          }}
                        >
                          {s.note}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
