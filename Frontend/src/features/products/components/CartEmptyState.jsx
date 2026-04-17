import { useNavigate } from "react-router-dom";

const ArrowRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function CartEmptyState() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center gap-7 px-6 text-center"
      style={{ backgroundColor: "var(--color-background)", fontFamily: "var(--font-family)" }}
    >
      <div className="flex flex-col items-center gap-4 max-w-95">
        {/* Decorative */}
        <div
          className="w-16 h-16 flex items-center justify-center mb-2"
          style={{ border: "1px solid rgba(212,160,23,0.2)", backgroundColor: "rgba(212,160,23,0.04)" }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(212,160,23,0.6)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </div>
        <span className="text-[0.52rem] font-bold uppercase tracking-[0.28em]" style={{ color: "var(--color-primary)" }}>
          The Atelier
        </span>
        <h1 className="text-[2rem] font-bold uppercase tracking-tight leading-none" style={{ color: "var(--color-on-surface)" }}>
          Your Cart is Empty
        </h1>
        <p className="text-[0.8rem] leading-loose" style={{ color: "var(--color-outline)" }}>
          Nothing curated yet. Explore the collection and add pieces that speak to your narrative.
        </p>
      </div>
      <button
        onClick={() => navigate("/collections")}
        className="flex items-center gap-3 px-10 py-4 text-[0.62rem] font-bold uppercase tracking-[0.22em] transition-all duration-300"
        style={{
          backgroundColor: "var(--color-primary-container)",
          color: "var(--color-on-primary-container)",
          border: "none", borderRadius: 0, cursor: "pointer",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
      >
        Explore Collections <ArrowRight />
      </button>
    </div>
  );
}
