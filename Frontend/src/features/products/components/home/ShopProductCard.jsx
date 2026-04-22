import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CURRENCY_SYMBOLS = { INR: "₹", USD: "$", EUR: "€", GBP: "£", JPY: "¥" };

function formatPrice(amount, currency) {
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
  return `${symbol}${Number(amount).toLocaleString("en-IN")}`;
}

const NoImageIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: "var(--color-outline)" }}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

export default function ShopProductCard({ product, index }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const allImages = product.variants?.flatMap((v) => v.images) || [];
  const coverImage = allImages[0]?.url;
  const secondImage = allImages[1]?.url;
  const coverAlt = allImages[0]?.alt ?? product.title;

  const firstVariant = product.variants?.[0];
  const priceDisplay = firstVariant?.price?.amount
    ? formatPrice(firstVariant.price.amount, firstVariant.price.currency)
    : null;

  const variantCount = product.variants?.length ?? 0;
  const isNew = index < 3;

  return (
    <div
      className="flex flex-col cursor-pointer"
      style={{ backgroundColor: "var(--color-surface-container-low)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/products/${product._id}`)}
    >
      {/* ── Image ─────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
        {coverImage ? (
          <>
            <img
              src={coverImage}
              alt={coverAlt}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
              style={{
                opacity: hovered && secondImage ? 0 : 1,
                transform: hovered ? "scale(1.06)" : "scale(1)",
              }}
            />
            {secondImage && (
              <img
                src={secondImage}
                alt={coverAlt}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                style={{
                  opacity: hovered ? 1 : 0,
                  transform: hovered ? "scale(1.03)" : "scale(1.06)",
                }}
              />
            )}
          </>
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2"
            style={{ backgroundColor: "var(--color-surface-container-high)" }}
          >
            <NoImageIcon />
            <span
              className="text-[0.54rem] uppercase tracking-widest"
              style={{ color: "var(--color-outline)" }}
            >
              No image
            </span>
          </div>
        )}

        {/* Index badge */}
        <span
          className="absolute top-3 left-3 text-[0.5rem] font-bold tracking-[0.14em] uppercase"
          style={{
            backgroundColor: "rgba(19,19,19,0.85)",
            color: "var(--color-primary)",
            padding: "3px 8px",
            backdropFilter: "blur(6px)",
          }}
        >
          #{String(index + 1).padStart(2, "0")}
        </span>

        {/* NEW badge */}
        {isNew && (
          <span
            className="absolute top-3 right-3 text-[0.46rem] font-bold tracking-[0.22em] uppercase"
            style={{
              backgroundColor: "var(--color-primary-container)",
              color: "var(--color-on-primary-container)",
              padding: "3px 8px",
            }}
          >
            New
          </span>
        )}

        {/* Quick-view overlay */}
        <div
          className="absolute inset-x-0 bottom-0 flex items-center justify-center py-3 transition-all duration-300"
          style={{
            backgroundColor: "rgba(13,12,9,0.9)",
            backdropFilter: "blur(4px)",
            transform: hovered ? "translateY(0)" : "translateY(100%)",
          }}
        >
          <span
            className="text-[0.56rem] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--color-primary)" }}
          >
            View Details →
          </span>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div
        className="p-4 flex flex-col gap-1.5 transition-colors duration-300"
        style={{
          borderTop: "1px solid rgba(212,160,23,0.06)",
          backgroundColor: hovered
            ? "var(--color-surface-container)"
            : "var(--color-surface-container-low)",
        }}
      >
        <div className="flex items-start justify-between gap-2">
          <h3
            className="font-semibold leading-snug line-clamp-1"
            style={{ color: "var(--color-on-surface)", fontSize: "0.82rem" }}
          >
            {product.title}
          </h3>
          {priceDisplay && (
            <span
              className="font-bold shrink-0"
              style={{ color: "var(--color-primary)", fontSize: "0.88rem" }}
            >
              {priceDisplay}
            </span>
          )}
        </div>

        {variantCount > 0 && (
          <p
            className="text-[0.58rem] uppercase tracking-widest"
            style={{ color: "var(--color-outline)" }}
          >
            {variantCount} variant{variantCount !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </div>
  );
}
