import { Link } from "react-router-dom";

const EXPLORE_LINKS   = ["Archive", "The Journal", "Global Sellers", "Sustainability"];
const CARE_LINKS      = ["Shipping", "Returns", "Size Guide", "Contact"];
const SOCIAL_LINKS    = ["Instagram", "Pinterest", "Vimeo"];

export default function FooterStrip() {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-surface-container-lowest)",
        fontFamily: "var(--font-family)",
      }}
    >
      {/* ── Top divider ────────────────────────────────────────────── */}
      <div style={{ height: "1px", backgroundColor: "var(--color-outline-variant)", opacity: 0.4 }} />

      {/* ── Newsletter bar ─────────────────────────────────────────── */}
      <div
        className="px-8 lg:px-14 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        style={{
          backgroundColor: "var(--color-surface-container-low)",
          borderBottom: "1px solid rgba(79,70,52,0.25)",
        }}
      >
        <div>
          <p
            className="font-bold uppercase mb-1"
            style={{
              color: "var(--color-primary-container)",
              fontSize: "0.58rem",
              letterSpacing: "0.28em",
            }}
          >
            Join the Atelier
          </p>
          <p
            style={{
              color: "var(--color-on-surface-variant)",
              fontSize: "var(--font-size-sm)",
            }}
          >
            Early access to seasonal drops and designer collaborations.
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-stretch shrink-0 w-full sm:w-auto"
          style={{ maxWidth: "360px" }}
        >
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 text-sm py-2"
            style={{
              backgroundColor: "var(--color-surface-container-high)",
              color: "var(--color-on-surface)",
              border: "1px solid var(--color-outline-variant)",
              borderRight: "none",
              outline: "none",
              fontFamily: "var(--font-family)",
              fontSize: "0.78rem",
              minWidth: "200px",
            }}
          />
          <button
            type="submit"
            className="px-5 font-bold uppercase transition-all duration-300"
            style={{
              backgroundColor: "var(--color-primary-container)",
              color: "var(--color-on-primary-container)",
              border: "none",
              fontSize: "0.56rem",
              letterSpacing: "0.2em",
              cursor: "pointer",
              fontFamily: "var(--font-family)",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-primary-container)";
            }}
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* ── Main footer grid ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-8 lg:px-14 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="lg:col-span-2">
          <p
            className="font-bold mb-1"
            style={{
              color: "var(--color-primary-container)",
              fontSize: "1.5rem",
              letterSpacing: "0.24em",
            }}
          >
            ZYLO
          </p>
          <p
            className="mb-5"
            style={{
              color: "var(--color-outline)",
              fontSize: "0.52rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            The Nocturnal Atelier
          </p>
          <p
            style={{
              color: "var(--color-on-surface-variant)",
              fontSize: "var(--font-size-sm)",
              lineHeight: 1.75,
              maxWidth: "24rem",
            }}
          >
            Join the atelier for early access to our seasonal curated drops
            and designer collaborations. Fashion as an archival practice.
          </p>

          {/* Social */}
          <div className="flex items-center gap-5 mt-6">
            {SOCIAL_LINKS.map((s) => (
              <Link
                key={s}
                to="#"
                className="transition-colors duration-300"
                style={{
                  color: "var(--color-outline)",
                  textDecoration: "none",
                  fontSize: "0.56rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-primary-container)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-outline)")
                }
              >
                {s}
              </Link>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <p
            className="font-bold mb-4"
            style={{
              color: "var(--color-primary-container)",
              fontSize: "0.56rem",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
            }}
          >
            Explore
          </p>
          <ul className="flex flex-col gap-3">
            {EXPLORE_LINKS.map((l) => (
              <li key={l}>
                <Link
                  to="#"
                  className="transition-colors duration-300"
                  style={{
                    color: "var(--color-on-surface-variant)",
                    textDecoration: "none",
                    fontSize: "var(--font-size-sm)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-on-surface-variant)")
                  }
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Client Care */}
        <div>
          <p
            className="font-bold mb-4"
            style={{
              color: "var(--color-primary-container)",
              fontSize: "0.56rem",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
            }}
          >
            Client Care
          </p>
          <ul className="flex flex-col gap-3">
            {CARE_LINKS.map((l) => (
              <li key={l}>
                <Link
                  to="#"
                  className="transition-colors duration-300"
                  style={{
                    color: "var(--color-on-surface-variant)",
                    textDecoration: "none",
                    fontSize: "var(--font-size-sm)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-on-surface-variant)")
                  }
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────── */}
      <div
        className="px-8 lg:px-14 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderTop: "1px solid rgba(79,70,52,0.2)" }}
      >
        <p
          style={{
            color: "var(--color-outline)",
            fontSize: "0.52rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          © 2026 Zylo — The Nocturnal Atelier. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          {["Privacy Policy", "Terms of Service"].map((item) => (
            <Link
              key={item}
              to="#"
              className="transition-colors duration-300"
              style={{
                color: "var(--color-outline)",
                textDecoration: "none",
                fontSize: "0.52rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-primary-container)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-outline)")
              }
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
