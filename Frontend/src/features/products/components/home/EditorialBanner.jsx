import { Link } from "react-router-dom";

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function EditorialBanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-16">
      <div
        className="relative flex flex-col sm:flex-row items-center justify-between gap-8 px-8 sm:px-12 py-12 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--color-surface-container) 0%, var(--color-surface-container-high) 100%)",
          border: "1px solid var(--color-outline-variant)",
        }}
      >
        {/* Gold accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{ backgroundColor: "var(--color-primary-container)" }}
        />

        <div className="relative z-10 text-center sm:text-left">
          <p
            className="text-[0.56rem] uppercase tracking-[0.28em] mb-2"
            style={{ color: "var(--color-primary-container)" }}
          >
            Exclusive Offer
          </p>
          <h2
            className="font-bold mb-2"
            style={{
              color: "var(--color-on-surface)",
              fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Free Shipping on Orders Above ₹5,000
          </h2>
          <p
            className="text-sm"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            Delivered in 3–5 business days. Express delivery available.
          </p>
        </div>

        <Link
          to="/collections"
          className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-[0.68rem] uppercase tracking-[0.16em] transition-all duration-300"
          style={{
            backgroundColor: "var(--color-primary-container)",
            color: "var(--color-on-primary-container)",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-primary)";
            e.currentTarget.style.boxShadow =
              "0 8px 24px rgba(212,160,23,0.3)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              "var(--color-primary-container)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Shop Now <ArrowRight />
        </Link>

        {/* Decorative glow */}
        <div
          className="absolute right-0 top-0 w-72 h-72 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(212,160,23,0.06) 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
      </div>
    </section>
  );
}
