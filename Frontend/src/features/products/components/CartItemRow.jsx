import { formatPrice } from "../../../components/helpers/helpers";

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

export default function CartItemRow({ item, onIncrease, onDecrease, onRemove }) {
  const { product, variant, quantity } = item;
  const variantObj = typeof variant === 'object' ? variant : product?.variants;
  const coverImg = variantObj?.images?.[0]?.url;
  const price = variantObj?.price || { amount: 0, currency: "INR" };

  return (
    <div
      className="flex items-center gap-4 sm:gap-6 px-5 sm:px-7 py-6 group transition-colors duration-300"
      style={{
        backgroundColor: "var(--color-surface-container-low)",
        borderBottom: "1px solid rgba(212,160,23,0.07)",
      }}
    >
      {/* ── Image ── */}
      <div
        className="shrink-0 overflow-hidden"
        style={{
          width: "80px", height: "80px",
          minWidth: "80px",
          backgroundColor: "var(--color-surface-container-high)",
        }}
      >
        {coverImg ? (
          <img
            src={coverImg}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[0.45rem] uppercase tracking-widest" style={{ color: "var(--color-outline)" }}>No image</span>
          </div>
        )}
      </div>

      {/* ── Info ── */}
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <span className="text-[0.5rem] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--color-primary)" }}>
          {product.seller?.fullName ?? "Zylo Seller"}
        </span>
        <h3
          className="font-semibold leading-snug line-clamp-1"
          style={{ color: "var(--color-on-surface)", fontSize: "0.88rem", letterSpacing: "0.01em" }}
        >
          {product.title}
        </h3>
        {variantObj?.attributes && (
          <p className="text-[0.6rem] mt-0.5 uppercase tracking-widest flex flex-wrap gap-x-3 gap-y-1" style={{ color: "var(--color-outline)" }}>
            {Object.entries(variantObj.attributes).map(([k, v]) => (
              <span key={k}>{k}: <span style={{ color: "var(--color-on-surface-variant)" }}>{v}</span></span>
            ))}
          </p>
        )}

        {/* Quantity stepper — visible on all screens */}
        <div className="flex items-center gap-0 mt-3">
          <button
            onClick={() => onDecrease(product._id, variantObj?._id)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="flex items-center justify-center transition-colors duration-200 disabled:opacity-25"
            style={{
              width: "28px", height: "28px",
              border: "1px solid rgba(212,160,23,0.25)",
              color: "var(--color-primary)",
              backgroundColor: "transparent",
              cursor: quantity <= 1 ? "not-allowed" : "pointer",
              fontSize: "1rem", lineHeight: 1,
            }}
            onMouseEnter={(e) => { if (quantity > 1) e.currentTarget.style.borderColor = "var(--color-primary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(212,160,23,0.25)"; }}
          >
            −
          </button>

          <div
            className="flex items-center justify-center text-[0.72rem] font-bold"
            style={{
              width: "36px", height: "28px",
              borderTop: "1px solid rgba(212,160,23,0.25)",
              borderBottom: "1px solid rgba(212,160,23,0.25)",
              color: "var(--color-on-surface)",
              fontFamily: "var(--font-family)",
              letterSpacing: "0.08em",
            }}
          >
            {String(quantity).padStart(2, "0")}
          </div>

          <button
            onClick={() => onIncrease(product._id, variantObj?._id)}
            aria-label="Increase quantity"
            disabled={quantity >= (variantObj?.stock ?? 100)}
            className="flex items-center justify-center transition-colors duration-200 disabled:opacity-25"
            style={{
              width: "28px", height: "28px",
              border: "1px solid rgba(212,160,23,0.25)",
              color: "var(--color-primary)",
              backgroundColor: "transparent",
              cursor: quantity >= (variantObj?.stock ?? 100) ? "not-allowed" : "pointer",
              fontSize: "1rem", lineHeight: 1,
            }}
            onMouseEnter={(e) => { if (quantity < (variantObj?.stock ?? 100)) e.currentTarget.style.borderColor = "var(--color-primary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(212,160,23,0.25)"; }}
          >
            +
          </button>
        </div>
      </div>

      {/* ── Price + Remove ── */}
      <div className="flex flex-col items-end gap-3 shrink-0">
        <span
          className="font-bold tabular-nums"
          style={{ color: "var(--color-primary)", fontSize: "0.95rem", letterSpacing: "-0.01em" }}
        >
          {formatPrice(price.amount * quantity, price.currency)}
        </span>
        <span
          className="text-[0.55rem] uppercase tracking-widest"
          style={{ color: "var(--color-outline)" }}
        >
          {quantity} × {formatPrice(price.amount, price.currency)}
        </span>
        <button
          onClick={() => onRemove(product._id, variantObj?._id)}
          aria-label={`Remove ${product.title}`}
          className="transition-colors duration-200 mt-1"
          style={{ color: "var(--color-outline)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(239,68,68,0.7)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-outline)"; }}
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}
