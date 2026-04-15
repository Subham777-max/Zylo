import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useProducts } from "../hooks/useProducts";

// ── Helpers ────────────────────────────────────────────────────────────────────
const CURRENCY_SYMBOLS = { INR: "₹", USD: "$", EUR: "€", GBP: "£", JPY: "¥" };

function formatPrice(amount, currency) {
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
  return `${symbol} ${Number(amount).toLocaleString("en-IN")}`;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function getInitials(name = "") {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

// ── Skeleton ───────────────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div
      className="min-h-full p-6 lg:p-10 animate-pulse"
      style={{ backgroundColor: "var(--color-background)", fontFamily: "var(--font-family)" }}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="flex-1 flex flex-col gap-3">
          <div className="w-full" style={{ aspectRatio: "4/5", backgroundColor: "var(--color-surface-container-low)" }} />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex-1" style={{ aspectRatio: "1", backgroundColor: "var(--color-surface-container-low)" }} />
            ))}
          </div>
        </div>
        <div className="lg:w-[420px] flex flex-col gap-4">
          {[80, 60, 40, 100, 100].map((w, i) => (
            <div key={i} className="h-4 rounded-none" style={{ width: `${w}%`, backgroundColor: "var(--color-surface-container-low)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── ProductDetailsPage ─────────────────────────────────────────────────────────
export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, handleGetProductById } = useProducts();
  const user = useSelector((s) => s.auth?.user ?? null);
  const [activeImg, setActiveImg] = useState(0);

  // Is the current user the seller of this product?
  const isSeller = user && product?.seller?._id && user._id === product.seller._id;

  useEffect(() => {
    if (id) handleGetProductById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Reset thumbnail when product changes
  useEffect(() => { setActiveImg(0); }, [product?._id]);

  if (loading) return <Skeleton />;
  if (!product) return (
    <div className="flex items-center justify-center h-full py-24" style={{ fontFamily: "var(--font-family)" }}>
      <p className="text-[0.75rem] uppercase tracking-widest" style={{ color: "var(--color-outline)" }}>
        Product not found
      </p>
    </div>
  );

  const images   = product.images ?? [];
  const mainImg  = images[activeImg]?.url ?? null;
  const seller   = product.seller;

  return (
    <div
      className="min-h-full p-6 lg:p-10"
      style={{ backgroundColor: "var(--color-background)", fontFamily: "var(--font-family)" }}
    >
      {/* Centered container — prevents empty space on ultra-wide screens */}
      <div className="max-w-[1100px] mx-auto">
      {/* ── Back breadcrumb ────────────────────────────────────────────── */}
      <button
      onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-8 transition-colors duration-200"
        style={{
          background: "none", border: "none", cursor: "pointer",
          color: "var(--color-outline)", fontSize: "0.62rem",
          fontWeight: 600, textTransform: "uppercase",
          letterSpacing: "0.12em", fontFamily: "var(--font-family)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-primary-container)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-outline)")}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        My Products
      </button>

      <div className="flex flex-col lg:flex-row gap-8 xl:gap-14">

        {/* ── LEFT — Image gallery ───────────────────────────────────── */}
        <div className="flex flex-col gap-3 w-full lg:w-[420px] lg:shrink-0">
          {/* Main image — capped at 500px so it doesn't fill the full screen */}
          <div
            className="w-full overflow-hidden max-h-[500px]"
            style={{
              aspectRatio: "4/5",
              maxHeight: "500px",
              backgroundColor: "var(--color-surface-container-low)",
            }}
          >
            {mainImg ? (
              <img
                src={mainImg}
                alt={images[activeImg]?.alt ?? product.title}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-[0.6rem] uppercase tracking-widest" style={{ color: "var(--color-outline)" }}>No image</span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, idx) => (
                <button
                  key={img._id}
                  onClick={() => setActiveImg(idx)}
                  className="flex-1 overflow-hidden transition-all duration-200"
                  style={{
                    aspectRatio: "1",
                    border: idx === activeImg
                      ? "1.5px solid var(--color-primary)"
                      : "1.5px solid transparent",
                    padding: 0,
                    cursor: "pointer",
                    background: "none",
                    maxWidth: "80px",
                  }}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    style={{ opacity: idx === activeImg ? 1 : 0.55, transition: "opacity 200ms" }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT — Details panel ─────────────────────────────────────── */}
        <div className="flex-1 flex flex-col gap-5 min-w-0">

          {/* Index chip */}
          <span
            className="self-start px-3 py-1 text-[0.52rem] font-bold uppercase tracking-[0.14em]"
            style={{ backgroundColor: "var(--color-surface-container-low)", color: "var(--color-outline)" }}
          >
            Product
          </span>

          {/* Title */}
          <h1
            className="font-bold leading-tight"
            style={{ color: "var(--color-on-surface)", fontSize: "1.55rem", letterSpacing: "-0.01em" }}
          >
            {product.title}
          </h1>

          {/* Seller info */}
          {seller && (
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 flex items-center justify-center text-[0.58rem] font-bold"
                style={{
                  backgroundColor: "var(--color-secondary-container)",
                  color: "var(--color-on-secondary-container)",
                  borderRadius: 0,
                }}
              >
                {getInitials(seller.fullName ?? seller.email)}
              </div>
              <span className="text-[0.7rem]" style={{ color: "var(--color-outline)" }}>
                Sold by&nbsp;
                <span style={{ color: "var(--color-on-surface-variant)" }}>
                  {seller.fullName ?? seller.email}
                </span>
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span
              className="font-bold"
              style={{ color: "var(--color-primary)", fontSize: "1.55rem" }}
            >
              {formatPrice(product.price.amount, product.price.currency)}
            </span>
            <span
              className="text-[0.58rem] font-semibold uppercase tracking-widest px-2 py-1"
              style={{ backgroundColor: "var(--color-surface-container-high)", color: "var(--color-outline)" }}
            >
              {product.price.currency}
            </span>
          </div>

          {/* Gold rule */}
          <div style={{ height: "1px", backgroundColor: "rgba(212,160,23,0.15)" }} />

          {/* Description */}
          <div>
            <p className="uppercase tracking-[0.14em] text-[0.58rem] mb-2" style={{ color: "var(--color-outline)" }}>
              Description
            </p>
            <p className="text-[0.82rem] leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
              {product.description}
            </p>
          </div>

          {/* Listed date */}
          <p className="text-[0.6rem] uppercase tracking-[0.1em]" style={{ color: "var(--color-outline)" }}>
            Listed on {formatDate(product.createdAt)}
          </p>

          {/* Gold rule */}
          <div style={{ height: "1px", backgroundColor: "rgba(212,160,23,0.1)" }} />

          {/* Actions — only visible to the product's seller */}
          {isSeller && (
          <div className="flex flex-col gap-3 mt-1">
            {/* Edit */}
            <button
              onClick={() => navigate(`/seller/products/${product._id}/edit`)}
              className="w-full py-3 font-semibold uppercase tracking-[0.13em] transition-all duration-300 text-[0.68rem]"
              style={{
                backgroundColor: "var(--color-primary-container)",
                color: "var(--color-on-primary-container)",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-family)",
                borderRadius: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.12)")}
              onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
            >
              Edit Product
            </button>

            {/* Delete */}
            <button
              onClick={() => {/* wire delete handler later */}}
              className="w-full py-3 font-semibold uppercase tracking-[0.13em] transition-all duration-300 text-[0.68rem]"
              style={{
                border: "1px solid rgba(255,100,100,0.35)",
                color: "rgba(255,120,120,0.8)",
                backgroundColor: "transparent",
                cursor: "pointer",
                fontFamily: "var(--font-family)",
                borderRadius: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,80,80,0.08)";
                e.currentTarget.style.borderColor = "rgba(255,100,100,0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "rgba(255,100,100,0.35)";
              }}
            >
              Delete Listing
            </button>
          </div>
          )}

          {/* Image count chip — always visible */}
          <p className="text-[0.58rem] uppercase tracking-widest mt-1" style={{ color: "var(--color-outline)" }}>
            {images.length} image{images.length !== 1 ? "s" : ""} uploaded
          </p>
        </div>
      </div>
      </div>{/* /max-w centered container */}
    </div>
  );
}