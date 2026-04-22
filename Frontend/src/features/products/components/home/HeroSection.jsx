import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroImg from "../../assets/hero.png";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "calc(100vh - 64px)", backgroundColor: "#0a0a0a" }}
    >
      {/* ── Background image — right half ─────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 0 }}
      >
        <img
          src={heroImg}
          alt="Zylo — The Nocturnal Atelier"
          className="w-full h-full object-cover"
          style={{ objectPosition: "65% top" }}
        />
        {/* Strong left gradient so text side is clean dark */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #0a0a0a 0%, #0a0a0a 35%, rgba(10,10,10,0.85) 55%, rgba(10,10,10,0.2) 80%, transparent 100%)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "35%",
            background: "linear-gradient(to top, #131313 0%, transparent 100%)",
          }}
        />
        {/* Top fade (under navbar) */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: "15%",
            background: "linear-gradient(to bottom, #131313 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Season tag — vertical ────────────────────────────────── */}
      <div
        className="absolute top-1/2 left-5 -translate-y-1/2 hidden xl:flex items-center gap-2 pointer-events-none select-none"
        style={{
          writingMode: "vertical-rl",
          transform: "translateY(-50%) rotate(180deg)",
          zIndex: 10,
        }}
      >
        <span
          style={{
            color: "var(--color-outline)",
            fontSize: "0.44rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
          }}
        >
          AW26 · Nocturnal Series · Zylo
        </span>
      </div>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div
        className="relative flex flex-col justify-center h-full max-w-7xl mx-auto px-8 lg:px-14"
        style={{
          minHeight: "calc(100vh - 64px)",
          zIndex: 10,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
        }}
      >
        <div className="max-w-xl pt-10 pb-20">
          {/* Season label */}
          <p
            className="mb-6"
            style={{
              color: "var(--color-primary-container)",
              fontSize: "0.56rem",
              fontWeight: 700,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
            }}
          >
            — AW26 Collection
          </p>

          {/* Display headline — editorial scale */}
          <h1
            className="font-bold leading-none mb-6"
            style={{
              fontSize: "clamp(3rem, 6vw, 5rem)",
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
            }}
          >
            <span style={{ color: "#ffffff", display: "block" }}>
              NOIR
            </span>
            <span
              style={{
                color: "var(--color-primary)",
                display: "block",
                fontStyle: "italic",
              }}
            >
              SERIES
            </span>
          </h1>

          {/* Editorial subline */}
          <p
            className="mb-8"
            style={{
              color: "var(--color-on-surface-variant)",
              fontSize: "var(--font-size-sm)",
              lineHeight: 1.75,
              maxWidth: "22rem",
            }}
          >
            The curated transition from sunset to absolute darkness.
            Explore the AW26 collection featuring artisanal textures and
            nocturnal silhouettes.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 flex-wrap mb-16">
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 font-bold uppercase transition-all duration-300"
              style={{
                backgroundColor: "var(--color-primary-container)",
                color: "var(--color-on-primary-container)",
                textDecoration: "none",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                padding: "0.85rem 2rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-primary)";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 8px 28px rgba(212,160,23,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-primary-container)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Explore Collection
            </Link>

            <Link
              to="/sellers"
              className="inline-flex items-center gap-2 font-semibold uppercase transition-all duration-300"
              style={{
                border: "1px solid rgba(155,143,122,0.3)",
                color: "var(--color-on-surface-variant)",
                textDecoration: "none",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                padding: "0.85rem 2rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-primary)";
                e.currentTarget.style.color = "var(--color-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(155,143,122,0.3)";
                e.currentTarget.style.color = "var(--color-on-surface-variant)";
              }}
            >
              Our Sellers
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-0">
            {[
              { value: "2K+",  label: "Curated Pieces" },
              { value: "150+", label: "Designers"      },
              { value: "98%",  label: "Satisfaction"   },
            ].map(({ value, label }, i, arr) => (
              <div key={label} className="flex items-center">
                <div className="pr-8">
                  <p
                    className="font-bold leading-none"
                    style={{
                      color: "var(--color-primary)",
                      fontSize: "1.4rem",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {value}
                  </p>
                  <p
                    className="mt-1"
                    style={{
                      color: "var(--color-outline)",
                      fontSize: "0.5rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </p>
                </div>
                {i < arr.length - 1 && (
                  <div
                    className="h-8 mr-8"
                    style={{
                      width: "1px",
                      backgroundColor: "var(--color-outline-variant)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────── */}
      <div
        className="absolute bottom-8 right-10 hidden lg:flex flex-col items-center gap-2"
        style={{
          zIndex: 10,
          opacity: loaded ? 0.55 : 0,
          transition: "opacity 1.4s ease 0.7s",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "48px",
            background: "linear-gradient(to bottom, var(--color-primary-container), transparent)",
            animation: "heroPulse 2s ease-in-out infinite",
          }}
        />
        <p
          style={{
            color: "var(--color-outline)",
            fontSize: "0.42rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </p>
        <style>{`
          @keyframes heroPulse {
            0%,100% { opacity:0.35; transform:scaleY(1); }
            50%      { opacity:1;    transform:scaleY(1.1); }
          }
        `}</style>
      </div>
    </section>
  );
}
