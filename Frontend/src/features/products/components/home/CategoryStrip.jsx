import { Link } from "react-router-dom";

const CATEGORIES = [
  { label: "Men",        icon: "♂",  desc: "Tailored & Street" },
  { label: "Women",      icon: "♀",  desc: "Editorial Looks"   },
  { label: "Accessories",icon: "◈",  desc: "Finishing Touch"   },
  { label: "Footwear",   icon: "◎",  desc: "Step in Style"     },
  { label: "New In",     icon: "✦",  desc: "Fresh Arrivals"    },
];

export default function CategoryStrip() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      {/* Header */}
      <div className="flex items-center gap-6 mb-10">
        <div className="shrink-0">
          <p
            className="text-[0.56rem] uppercase tracking-[0.26em] mb-1.5"
            style={{ color: "var(--color-primary-container)" }}
          >
            Browse
          </p>
          <h2
            className="font-bold"
            style={{
              color: "var(--color-on-surface)",
              fontSize: "1.25rem",
              letterSpacing: "-0.02em",
            }}
          >
            Shop by Category
          </h2>
        </div>
        <div
          className="flex-1 h-px"
          style={{
            background:
              "linear-gradient(to right, var(--color-outline-variant), transparent)",
          }}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {CATEGORIES.map(({ label, icon, desc }) => (
          <Link
            key={label}
            to={`/collections?cat=${label.toLowerCase()}`}
            className="group flex flex-col items-center justify-center py-8 gap-2 transition-all duration-300"
            style={{
              border: "1px solid var(--color-outline-variant)",
              backgroundColor: "var(--color-surface-container-low)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-primary-container)";
              e.currentTarget.style.backgroundColor = "var(--color-surface-container)";
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(212,160,23,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-outline-variant)";
              e.currentTarget.style.backgroundColor = "var(--color-surface-container-low)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span style={{ color: "var(--color-primary)", fontSize: "1.5rem" }}>
              {icon}
            </span>
            <span
              className="text-[0.68rem] font-semibold uppercase tracking-[0.14em]"
              style={{ color: "var(--color-on-surface)" }}
            >
              {label}
            </span>
            <span
              className="text-[0.54rem] uppercase tracking-widest"
              style={{ color: "var(--color-outline)" }}
            >
              {desc}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
