import { useNavigate } from "react-router-dom";

// Currency symbol map
const CURRENCY_SYMBOLS = { INR: "₹", USD: "$", EUR: "€", GBP: "£", JPY: "¥" };

function formatPrice(amount, currency) {
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
  return `${symbol} ${Number(amount).toLocaleString("en-IN")}`;
}

const EditIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const EyeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default function ProductCard({ product, index }) {
  const navigate = useNavigate();
  // Image from first variant
  const allImages = product.variants?.flatMap(v => v.images) || [];
  const coverImage = allImages?.[0]?.url;
  const coverAlt   = allImages?.[0]?.alt ?? product.title;
  
  // Price from first variant
  const firstVariant = product.variants?.[0];
  const priceDisplay = firstVariant?.price?.amount 
    ? formatPrice(firstVariant.price.amount, firstVariant.price.currency) 
    : "No variant";

  return (
    <div
      className="flex flex-col group transition-colors duration-300"
      style={{
        backgroundColor: "var(--color-surface-container-low)",
        cursor: "default",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-surface-container-high)")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-surface-container-low)")}
    >
      {/* ── Image ──────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/5", maxHeight: "320px" }}>
        {coverImage ? (
          <img
            src={coverImage}
            alt={coverAlt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: "var(--color-surface-container-high)" }}
          >
            <span className="text-[0.6rem] uppercase tracking-widest" style={{ color: "var(--color-outline)" }}>
              No Image
            </span>
          </div>
        )}

        {/* Index badge */}
        <span
          className="absolute top-3 left-3 flex items-center justify-center text-[0.52rem] font-bold tracking-[0.12em]"
          style={{
            backgroundColor: "rgba(19,19,19,0.82)",
            color: "var(--color-primary)",
            padding: "3px 7px",
            backdropFilter: "blur(6px)",
          }}
        >
          #{String(index + 1).padStart(2, "0")}
        </span>

        {/* Image count badge */}
        {allImages.length > 1 && (
          <span
            className="absolute bottom-3 right-3 text-[0.5rem] uppercase tracking-widest"
            style={{
              backgroundColor: "rgba(19,19,19,0.75)",
              color: "var(--color-outline)",
              padding: "2px 6px",
              backdropFilter: "blur(4px)",
            }}
          >
            +{allImages.length - 1} more
          </span>
        )}
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="font-semibold leading-snug line-clamp-2"
            style={{ color: "var(--color-on-surface)", fontSize: "0.85rem" }}
          >
            {product.title}
          </h3>
          <span
            className="font-bold shrink-0"
            style={{ color: firstVariant ? "var(--color-primary)" : "var(--color-outline)", fontSize: firstVariant ? "0.9rem" : "0.7rem", marginTop: firstVariant ? "0" : "0.2rem", textTransform: "uppercase" }}
          >
            {priceDisplay}
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: "rgba(212,160,23,0.1)" }} />

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/products/${product._id}`)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 transition-all duration-200"
            style={{
              border: "1px solid var(--color-outline-variant)",
              color: "var(--color-on-surface-variant)",
              backgroundColor: "transparent",
              fontSize: "0.6rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              cursor: "pointer",
              fontFamily: "var(--font-family)",
              borderRadius: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-primary)";
              e.currentTarget.style.color = "var(--color-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-outline-variant)";
              e.currentTarget.style.color = "var(--color-on-surface-variant)";
            }}
          >
            <EyeIcon /> View
          </button>

          <button
            onClick={() => navigate(`/seller/products/${product._id}/edit`)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 transition-all duration-200"
            style={{
              border: "1px solid var(--color-primary-container)",
              color: "var(--color-primary-container)",
              backgroundColor: "transparent",
              fontSize: "0.6rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              cursor: "pointer",
              fontFamily: "var(--font-family)",
              borderRadius: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-primary-container)";
              e.currentTarget.style.color = "var(--color-on-primary-container)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--color-primary-container)";
            }}
          >
            <EditIcon /> Edit
          </button>
        </div>
      </div>
    </div>
  );
}
