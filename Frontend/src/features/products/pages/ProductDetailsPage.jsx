import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";
import ProductImageGallery from "../components/ProductImageGallery";
import { formatPrice, formatDate, getInitials } from "../../../components/helpers/helpers";

// ─── Skeleton ────────────────────────────────────────────────────────────────
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
        <div className="lg:w-105 flex flex-col gap-4">
          {[80, 60, 40, 100, 100].map((w, i) => (
            <div key={i} className="h-4 rounded-none" style={{ width: `${w}%`, backgroundColor: "var(--color-surface-container-low)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Variant Selector ─────────────────────────────────────────────────────────
function VariantSelector({ variants, selectedVariant, onSelect }) {
  if (!variants || variants.length === 0) return null;

  // Gather all unique attribute keys across all variants
  const allKeys = [...new Set(variants.flatMap((v) => [...(v.attributes?.keys?.() ?? Object.keys(v.attributes ?? {}))]))];

  // Build a map: key → Set of available values
  const valueMap = {};
  allKeys.forEach((key) => {
    valueMap[key] = [...new Set(
      variants
        .map((v) => {
          if (v.attributes instanceof Map) return v.attributes.get(key);
          return v.attributes?.[key];
        })
        .filter(Boolean)
    )];
  });

  // Current selections per key
  const currentSelections = {};
  if (selectedVariant) {
    allKeys.forEach((key) => {
      if (selectedVariant.attributes instanceof Map) {
        currentSelections[key] = selectedVariant.attributes.get(key);
      } else {
        currentSelections[key] = selectedVariant.attributes?.[key];
      }
    });
  }

  const getAttrValue = (variant, key) => {
    if (variant.attributes instanceof Map) return variant.attributes.get(key);
    return variant.attributes?.[key];
  };

  const handleSelect = (key, value) => {
    // Build new desired attributes
    const desired = { ...currentSelections, [key]: value };
    // Find the variant that matches all desired attributes
    const match = variants.find((v) =>
      allKeys.every((k) => getAttrValue(v, k) === desired[k])
    );
    if (match) onSelect(match);
    else {
      // Partial match: find variant that at least matches the changed key
      const partial = variants.find((v) => getAttrValue(v, key) === value);
      if (partial) onSelect(partial);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {allKeys.map((key) => (
        <div key={key}>
          <p
            className="uppercase tracking-[0.14em] text-[0.55rem] mb-3"
            style={{ color: "var(--color-outline)" }}
          >
            {key}
            {currentSelections[key] && (
              <span style={{ color: "var(--color-on-surface-variant)", marginLeft: "0.5rem" }}>
                — {currentSelections[key]}
              </span>
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            {valueMap[key].map((val) => {
              const isActive = currentSelections[key] === val;
              // Check if this value is available given other current selections
              const isSomeAvail = variants.some((v) => {
                return (
                  getAttrValue(v, key) === val &&
                  allKeys
                    .filter((k) => k !== key && currentSelections[k])
                    .every((k) => getAttrValue(v, k) === currentSelections[k])
                );
              });

              return (
                <button
                  key={val}
                  onClick={() => handleSelect(key, val)}
                  disabled={!isSomeAvail}
                  className="px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.1em] transition-all duration-300"
                  style={{
                    border: isActive
                      ? "1px solid var(--color-primary-container)"
                      : "1px solid rgba(79,70,52,0.45)",
                    backgroundColor: isActive
                      ? "rgba(212,160,23,0.12)"
                      : "var(--color-surface-container)",
                    color: isActive
                      ? "var(--color-primary)"
                      : isSomeAvail
                      ? "var(--color-on-surface-variant)"
                      : "var(--color-outline)",
                    cursor: isSomeAvail ? "pointer" : "not-allowed",
                    opacity: isSomeAvail ? 1 : 0.35,
                    fontFamily: "var(--font-family)",
                    borderRadius: 0,
                    boxShadow: isActive ? "var(--shadow-gold-glow-sm)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSomeAvail || isActive) return;
                    e.currentTarget.style.borderColor = "var(--color-outline)";
                    e.currentTarget.style.backgroundColor = "var(--color-surface-container-high)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSomeAvail || isActive) return;
                    e.currentTarget.style.borderColor = "rgba(79,70,52,0.45)";
                    e.currentTarget.style.backgroundColor = "var(--color-surface-container)";
                  }}
                >
                  {val}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Variant Info Strip ───────────────────────────────────────────────────────
function VariantInfoStrip({ variant }) {
  if (!variant) return null;
  const inStock = variant.stock > 0;
  return (
    <div
      className="flex items-center justify-between px-4 py-3"
      style={{
        backgroundColor: "var(--color-surface-container-low)",
        borderLeft: `2px solid ${inStock ? "var(--color-primary-container)" : "rgba(255,100,100,0.4)"}`,
      }}
    >
      <div className="flex items-center gap-3">
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: inStock ? "var(--color-primary-container)" : "rgba(255,100,100,0.6)" }}
        />
        <span
          className="text-[0.62rem] uppercase tracking-widest font-semibold"
          style={{ color: inStock ? "var(--color-on-surface-variant)" : "rgba(255,120,120,0.75)" }}
        >
          {inStock ? `${variant.stock} in stock` : "Out of stock"}
        </span>
      </div>
      {variant.price?.amount && (
        <span className="text-[0.62rem] uppercase tracking-widest" style={{ color: "var(--color-outline)" }}>
          {formatPrice(variant.price.amount, variant.price.currency)}
        </span>
      )}
    </div>
  );
}

// ─── ProductDetailsPage (Buyer View) ─────────────────────────────────────────
export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, handleGetProductById } = useProducts();
  const user = useSelector((s) => s.auth?.user ?? null);
  const { handleAddToCart } = useCart();

  const [activeImg, setActiveImg] = useState(0);
  const [cartAdded, setCartAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const cartTimerRef = useRef(null);

  const isSeller = user && product?.seller?._id && user._id === product.seller._id;

  // Redirect sellers to their own view
  useEffect(() => {
    if (isSeller) navigate(`/seller/products/${id}`, { replace: true });
  }, [isSeller, id, navigate]);

  useEffect(() => {
    if (id) handleGetProductById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Auto-select first variant if variants exist
  useEffect(() => {
    if (product?.variants?.length > 0) {
      setSelectedVariant(product.variants[0]);
    } else {
      setSelectedVariant(null);
    }
    setActiveImg(0);
  }, [product?._id]);

  // Sync gallery images when variant changes
  const displayImages = selectedVariant?.images?.length > 0
    ? selectedVariant.images
    : product?.images?.length > 0
      ? product.images
      : product?.variants?.flatMap(v => v.images || []) || [];

  const displayPrice = selectedVariant?.price?.amount
    ? selectedVariant.price
    : product?.price;

  const handleAddToCartClick = async () => {
    if (cartAdded) return;
    await handleAddToCart(product._id, 1);
    setCartAdded(true);
    clearTimeout(cartTimerRef.current);
    cartTimerRef.current = setTimeout(() => setCartAdded(false), 2500);
  };

  if (loading) return <Skeleton />;
  if (!product) return (
    <div className="flex items-center justify-center h-full py-24" style={{ fontFamily: "var(--font-family)" }}>
      <p className="text-[0.75rem] uppercase tracking-widest" style={{ color: "var(--color-outline)" }}>
        Product not found
      </p>
    </div>
  );

  const hasVariants = product.variants && product.variants.length > 0;
  const seller = product.seller;

  return (
    <div
      className="min-h-full p-6 lg:p-10"
      style={{ backgroundColor: "var(--color-background)", fontFamily: "var(--font-family)" }}
    >
      <div className="max-w-275 mx-auto">
        {/* Back breadcrumb */}
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
          Back
        </button>

        <div className="flex flex-col lg:flex-row gap-8 xl:gap-14">

          {/* LEFT — Image gallery */}
          <ProductImageGallery images={displayImages} activeImg={activeImg} setActiveImg={setActiveImg} product={product} />

          {/* RIGHT — Details panel */}
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
              {displayPrice?.amount ? (
                <>
                  <span
                    className="font-bold"
                    style={{ color: "var(--color-primary)", fontSize: "1.55rem" }}
                  >
                    {formatPrice(displayPrice.amount, displayPrice.currency)}
                  </span>
                  <span
                    className="text-[0.58rem] font-semibold uppercase tracking-widest px-2 py-1"
                    style={{ backgroundColor: "var(--color-surface-container-high)", color: "var(--color-outline)" }}
                  >
                    {displayPrice.currency}
                  </span>
                </>
              ) : (
                <span
                  className="font-bold uppercase tracking-widest text-[0.7rem]"
                  style={{ color: "var(--color-outline)" }}
                >
                  Select a variant to see price
                </span>
              )}
            </div>

            {/* Gold rule */}
            <div style={{ height: "1px", backgroundColor: "rgba(212,160,23,0.15)" }} />

            {/* ── Variants Section ── */}
            {hasVariants && (
              <div className="flex flex-col gap-4">
                <p
                  className="uppercase tracking-[0.18em] text-[0.55rem] font-bold"
                  style={{ color: "var(--color-primary-container)" }}
                >
                  Select Options
                </p>

                <VariantSelector
                  variants={product.variants}
                  selectedVariant={selectedVariant}
                  onSelect={setSelectedVariant}
                />

                {/* Stock / variant price strip */}
                <VariantInfoStrip variant={selectedVariant} />

                <div style={{ height: "1px", backgroundColor: "rgba(212,160,23,0.1)" }} />
              </div>
            )}

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
            <p className="text-[0.6rem] uppercase tracking-widest" style={{ color: "var(--color-outline)" }}>
              Listed on {formatDate(product.createdAt)}
            </p>

            {/* Gold rule */}
            <div style={{ height: "1px", backgroundColor: "rgba(212,160,23,0.1)" }} />

            {/* Actions — Buyer */}
            <div className="flex flex-col gap-3 mt-1">
              {/* Buy Now — solid gold */}
              <button
                onClick={() => {/* wire buy now / Razorpay later */}}
                disabled={!selectedVariant || selectedVariant.stock === 0}
                className="w-full py-3 font-semibold uppercase tracking-[0.13em] transition-all duration-300 text-[0.68rem]"
                style={{
                  backgroundColor: (!selectedVariant || selectedVariant.stock === 0) ? "var(--color-surface-container-high)" : "var(--color-primary-container)",
                  color: (!selectedVariant || selectedVariant.stock === 0) ? "var(--color-outline)" : "var(--color-on-primary-container)",
                  border: "none",
                  cursor: (!selectedVariant || selectedVariant.stock === 0) ? "not-allowed" : "pointer",
                  fontFamily: "var(--font-family)",
                  borderRadius: 0,
                }}
                onMouseEnter={(e) => { if (selectedVariant && selectedVariant.stock > 0) e.currentTarget.style.filter = "brightness(1.12)" }}
                onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
              >
                Buy Now
              </button>

              {/* Add to Cart — ghost gold with feedback */}
              <button
                onClick={handleAddToCartClick}
                disabled={cartAdded || !selectedVariant || selectedVariant.stock === 0}
                className="w-full py-3 font-semibold uppercase tracking-[0.13em] text-[0.68rem] flex items-center justify-center gap-2"
                style={{
                  border: cartAdded ? "1px solid rgba(74,222,128,0.5)" : (!selectedVariant || selectedVariant.stock === 0) ? "1px solid rgba(79,70,52,0.4)" : "1px solid var(--color-primary-container)",
                  color: cartAdded ? "rgba(74,222,128,0.9)" : (!selectedVariant || selectedVariant.stock === 0) ? "rgba(79,70,52,0.6)" : "var(--color-primary-container)",
                  backgroundColor: cartAdded ? "rgba(74,222,128,0.06)" : "transparent",
                  cursor: cartAdded || (!selectedVariant || selectedVariant.stock === 0) ? "not-allowed" : "pointer",
                  fontFamily: "var(--font-family)",
                  borderRadius: 0,
                  transition: "all 400ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={(e) => {
                  if (cartAdded || !selectedVariant || selectedVariant.stock === 0) return;
                  e.currentTarget.style.backgroundColor = "rgba(212,160,23,0.08)";
                  e.currentTarget.style.borderColor = "var(--color-primary)";
                  e.currentTarget.style.color = "var(--color-primary)";
                }}
                onMouseLeave={(e) => {
                  if (cartAdded || !selectedVariant || selectedVariant.stock === 0) return;
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "var(--color-primary-container)";
                  e.currentTarget.style.color = "var(--color-primary-container)";
                }}
              >
                {cartAdded ? (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Added to Cart
                  </>
                ) : (
                  "Add to Cart"
                )}
              </button>
            </div>

            {/* Image count chip */}
            <p className="text-[0.58rem] uppercase tracking-widest mt-1" style={{ color: "var(--color-outline)" }}>
              {displayImages.length} image{displayImages.length !== 1 ? "s" : ""} uploaded
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}