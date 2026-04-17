import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../../components/helpers/helpers";

const LockIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="0" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ArrowRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function CartOrderSummary({ subtotal, currency }) {
  const navigate = useNavigate();

  return (
    <div
      className="w-full lg:w-75 xl:w-[320px] shrink-0 flex flex-col lg:sticky lg:top-24"
      style={{ backgroundColor: "var(--color-surface-container-low)" }}
    >
      {/* Panel top accent */}
      <div style={{ height: "2px", backgroundColor: "var(--color-primary-container)" }} />

      {/* Header */}
      <div className="px-6 pt-6 pb-4" style={{ borderBottom: "1px solid rgba(212,160,23,0.08)" }}>
        <span className="text-[0.52rem] font-bold uppercase tracking-[0.3em]" style={{ color: "var(--color-primary)" }}>
          Order Summary
        </span>
      </div>

      {/* Line items */}
      <div className="px-6 py-5 flex flex-col gap-3.5">
        <div className="flex items-center justify-between">
          <span className="text-[0.65rem] uppercase tracking-[0.14em]" style={{ color: "var(--color-on-surface-variant)" }}>
            Subtotal
          </span>
          <span className="text-[0.82rem] font-semibold tabular-nums" style={{ color: "var(--color-on-surface)" }}>
            {formatPrice(subtotal, currency)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[0.65rem] uppercase tracking-[0.14em]" style={{ color: "var(--color-on-surface-variant)" }}>
            Shipping
          </span>
          <span className="text-[0.62rem] italic" style={{ color: "var(--color-outline)" }}>
            Calculated at checkout
          </span>
        </div>

        {/* Divider */}
        <div className="my-1" style={{ height: "1px", backgroundColor: "rgba(212,160,23,0.1)" }} />

        {/* Total */}
        <div className="flex items-baseline justify-between">
          <span className="text-[0.55rem] font-bold uppercase tracking-[0.24em]" style={{ color: "var(--color-primary)" }}>
            Total
          </span>
          <span
            className="font-bold tabular-nums"
            style={{ color: "var(--color-on-surface)", fontSize: "1.3rem", letterSpacing: "-0.02em" }}
          >
            {formatPrice(subtotal, currency)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 pb-7 flex flex-col gap-3">
        <button
          onClick={() => navigate("/checkout")}
          className="w-full py-4 flex items-center justify-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.22em] transition-all duration-300"
          style={{
            backgroundColor: "var(--color-primary-container)",
            color: "#000",
            border: "none", borderRadius: 0, cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
        >
          Proceed to Checkout <ArrowRight />
        </button>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-2 pt-1">
          <LockIcon />
          <span className="text-[0.52rem] uppercase tracking-[0.16em]" style={{ color: "var(--color-outline)" }}>
            Secured by Razorpay
          </span>
        </div>

        {/* Free shipping note */}
        <p className="text-center text-[0.52rem] tracking-wider italic" style={{ color: "rgba(155,143,122,0.5)" }}>
          Free delivery on orders above ₹999
        </p>
      </div>
    </div>
  );
}
