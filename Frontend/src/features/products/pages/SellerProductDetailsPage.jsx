import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductImageGallery from "../components/ProductImageGallery";
import ImageUploader from "../components/ImageUploader";
import { formatPrice, formatDate } from "../../../components/helpers/helpers";
import ConfirmModal from "../../../components/utils/ConfirmModal";

// ─── Skeleton ────────────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div
      className="min-h-full p-6 lg:p-10 animate-pulse"
      style={{ backgroundColor: "var(--color-background)", fontFamily: "var(--font-family)" }}
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex-1 flex flex-col gap-3">
            <div className="w-full" style={{ aspectRatio: "4/5", backgroundColor: "var(--color-surface-container-low)" }} />
          </div>
          <div className="lg:w-96 flex flex-col gap-4">
            {[80, 60, 40, 100].map((w, i) => (
              <div key={i} className="h-4" style={{ width: `${w}%`, backgroundColor: "var(--color-surface-container-low)" }} />
            ))}
          </div>
        </div>
        <div className="h-48 w-full" style={{ backgroundColor: "var(--color-surface-container-low)" }} />
      </div>
    </div>
  );
}

// ─── Attribute Row ────────────────────────────────────────────────────────────
function AttributeRow({ attrKey, attrValue, onKeyChange, onValueChange, onRemove, isFirst }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex-1 zylo-input-group"
        style={{ backgroundColor: "var(--color-surface-container-highest)" }}
      >
        <input
          type="text"
          placeholder="e.g. Size"
          value={attrKey}
          onChange={(e) => onKeyChange(e.target.value)}
          style={{ fontSize: "0.78rem", color: "var(--color-on-surface)" }}
        />
      </div>
      <span className="text-[0.6rem]" style={{ color: "var(--color-outline)" }}>:</span>
      <div
        className="flex-1 zylo-input-group"
        style={{ backgroundColor: "var(--color-surface-container-highest)" }}
      >
        <input
          type="text"
          placeholder="e.g. M"
          value={attrValue}
          onChange={(e) => onValueChange(e.target.value)}
          style={{ fontSize: "0.78rem", color: "var(--color-on-surface)" }}
        />
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="w-8 h-8 flex items-center justify-center transition-all duration-200 flex-shrink-0"
        style={{
          backgroundColor: "transparent",
          border: "1px solid rgba(255,100,100,0.2)",
          color: "rgba(255,100,100,0.5)",
          borderRadius: 0,
          cursor: "pointer",
          fontFamily: "var(--font-family)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255,80,80,0.08)";
          e.currentTarget.style.borderColor = "rgba(255,100,100,0.5)";
          e.currentTarget.style.color = "rgba(255,120,120,0.9)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.borderColor = "rgba(255,100,100,0.2)";
          e.currentTarget.style.color = "rgba(255,100,100,0.5)";
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

// ─── Variant Form Card ────────────────────────────────────────────────────────
function VariantFormCard({ index, variant, onChange, onRemove, isOnly }) {
  const addAttr = () => {
    const attrs = [...variant.attributes, { key: "", value: "" }];
    onChange({ ...variant, attributes: attrs });
  };

  const removeAttr = (i) => {
    const attrs = variant.attributes.filter((_, idx) => idx !== i);
    onChange({ ...variant, attributes: attrs });
  };

  const setAttrKey = (i, key) => {
    const attrs = variant.attributes.map((a, idx) => idx === i ? { ...a, key } : a);
    onChange({ ...variant, attributes: attrs });
  };

  const setAttrValue = (i, value) => {
    const attrs = variant.attributes.map((a, idx) => idx === i ? { ...a, value } : a);
    onChange({ ...variant, attributes: attrs });
  };

  return (
    <div
      className="flex flex-col gap-4 p-5"
      style={{
        backgroundColor: "var(--color-surface-container-low)",
        borderLeft: "2px solid var(--color-primary-container)",
      }}
    >
      {/* Variant header */}
      <div className="flex items-center justify-between">
        <span
          className="text-[0.55rem] uppercase tracking-[0.18em] font-bold"
          style={{ color: "var(--color-primary-container)" }}
        >
          Variant {index + 1}
        </span>
        {!isOnly && (
          <button
            type="button"
            onClick={onRemove}
            className="text-[0.55rem] uppercase tracking-[0.1em] transition-colors duration-200 flex items-center gap-1"
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,100,100,0.5)",
              cursor: "pointer",
              fontFamily: "var(--font-family)",
              fontWeight: 600,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,120,120,0.9)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,100,100,0.5)")}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
            </svg>
            Remove
          </button>
        )}
      </div>

      {/* Attributes */}
      <div className="flex flex-col gap-2">
        <label className="zylo-label">Attributes</label>
        {variant.attributes.map((attr, i) => (
          <AttributeRow
            key={i}
            attrKey={attr.key}
            attrValue={attr.value}
            onKeyChange={(k) => setAttrKey(i, k)}
            onValueChange={(v) => setAttrValue(i, v)}
            onRemove={() => removeAttr(i)}
          />
        ))}
        <button
          type="button"
          onClick={addAttr}
          className="self-start text-[0.58rem] uppercase tracking-[0.1em] transition-colors duration-200 mt-1 flex items-center gap-1.5"
          style={{
            background: "none",
            border: "none",
            color: "var(--color-outline)",
            cursor: "pointer",
            fontFamily: "var(--font-family)",
            fontWeight: 600,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-primary-container)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-outline)")}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Attribute
        </button>
      </div>

      {/* Price + Stock row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="zylo-label">Price</label>
          <div className="zylo-input-group" style={{ backgroundColor: "var(--color-surface-container-highest)" }}>
            <span className="text-[0.65rem]" style={{ color: "var(--color-outline)", flexShrink: 0 }}>
              {variant.currency}
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={variant.price}
              onChange={(e) => onChange({ ...variant, price: e.target.value })}
              style={{ fontSize: "0.78rem" }}
            />
          </div>
        </div>
        <div>
          <label className="zylo-label">Stock</label>
          <div className="zylo-input-group" style={{ backgroundColor: "var(--color-surface-container-highest)" }}>
            <input
              type="number"
              min="0"
              step="1"
              placeholder="0"
              value={variant.stock}
              onChange={(e) => onChange({ ...variant, stock: e.target.value })}
              style={{ fontSize: "0.78rem" }}
            />
          </div>
        </div>
      </div>

      {/* Currency */}
      <div>
        <label className="zylo-label">Currency</label>
        <div className="zylo-input-group" style={{ backgroundColor: "var(--color-surface-container-highest)", padding: 0 }}>
          <select
            value={variant.currency}
            onChange={(e) => onChange({ ...variant, currency: e.target.value })}
            style={{
              fontSize: "0.78rem",
              color: "var(--color-on-surface)",
              backgroundColor: "var(--color-surface-container-highest)",
              border: "none",
              outline: "none",
              padding: "0.55rem 0.85rem",
              width: "100%",
              cursor: "pointer",
              fontFamily: "var(--font-family)",
            }}
          >
            {["INR", "USD", "EUR", "GBP", "JPY"].map((c) => (
              <option key={c} value={c} style={{ backgroundColor: "var(--color-surface-container-highest)" }}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Variant Images */}
      <div className="mt-2">
        <label className="zylo-label mb-2 block">Variant Images</label>
        <ImageUploader 
          images={variant.images || []} 
          onChange={(imgs) => onChange({ ...variant, images: imgs })} 
        />
      </div>
    </div>
  );
}

// ─── Existing Variant List ────────────────────────────────────────────────────

function ExistingVariantList({ variants }) {
  if (!variants || variants.length === 0) return (
    <div
      className="flex items-center justify-center py-8"
      style={{ backgroundColor: "var(--color-surface-container-low)" }}
    >
      <p className="text-[0.6rem] uppercase tracking-widest" style={{ color: "var(--color-outline)" }}>
        No variants yet — create one below
      </p>
    </div>
  );

  return (
    <div className="flex flex-col gap-0">
      {variants.map((v, i) => {
        const attrs = v.attributes
          ? (v.attributes instanceof Map
            ? [...v.attributes.entries()]
            : Object.entries(v.attributes))
          : [];
        const inStock = v.stock > 0;
        return (
          <div
            key={i}
            className="flex items-center justify-between px-4 py-3 transition-colors duration-200"
            style={{
              backgroundColor: i % 2 === 0 ? "var(--color-surface-container-low)" : "var(--color-surface-container)",
              borderLeft: `2px solid ${inStock ? "var(--color-primary-container)" : "rgba(79,70,52,0.3)"}`,
            }}
          >
            {/* Attributes */}
            <div className="flex flex-wrap gap-2">
              {attrs.map(([key, val]) => (
                <span
                  key={key}
                  className="px-2 py-1 text-[0.55rem] uppercase tracking-[0.1em]"
                  style={{
                    backgroundColor: "var(--color-surface-container-high)",
                    color: "var(--color-on-surface-variant)",
                  }}
                >
                  <span style={{ color: "var(--color-outline)" }}>{key}:</span> {val}
                </span>
              ))}
            </div>

            {/* Price + stock */}
            <div className="flex items-center gap-4 ml-4 flex-shrink-0">
              {v.price?.amount && (
                <span className="text-[0.62rem] font-semibold" style={{ color: "var(--color-primary)" }}>
                  {formatPrice(v.price.amount, v.price.currency)}
                </span>
              )}
              <span
                className="flex items-center gap-1.5 text-[0.55rem] uppercase tracking-widest"
                style={{ color: inStock ? "var(--color-outline)" : "rgba(255,100,100,0.5)" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: inStock ? "var(--color-primary-container)" : "rgba(255,100,100,0.5)" }}
                />
                {inStock ? `${v.stock} units` : "Out of stock"}
              </span>

              {/* Edit action placeholder */}
              <button
                type="button"
                className="text-[0.52rem] uppercase tracking-[0.1em] transition-colors duration-200"
                style={{
                  background: "none", border: "none",
                  color: "var(--color-outline)", cursor: "pointer",
                  fontFamily: "var(--font-family)", fontWeight: 600,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-primary-container)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-outline)")}
              >
                Edit
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Create Variant Blank State ───────────────────────────────────────────────
const blankVariant = () => ({
  attributes: [{ key: "", value: "" }],
  price: "",
  currency: "INR",
  stock: "",
  images: [],
});

// ─── SellerProductDetailsPage ─────────────────────────────────────────────────
export default function SellerProductDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { product, loading, handleGetProductById, deleting, handleDeleteProduct, handleAddVariant } = useProducts();

  const [activeImg, setActiveImg] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Variant form state
  const [variantForms, setVariantForms] = useState([blankVariant()]);
  const [showVariantForm, setShowVariantForm] = useState(false);
  const [variantSaving, setVariantSaving] = useState(false);
  const variantFormRef = useRef(null);

  useEffect(() => {
    if (id) {
      handleGetProductById(id);
      if (location.state?.openVariantForm) {
        handleOpenVariantForm();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, location.state]);

  useEffect(() => { setActiveImg(0); }, [product?._id]);

  const addVariantForm = () => {
    setVariantForms((prev) => [...prev, blankVariant()]);
  };

  const removeVariantForm = (i) => {
    setVariantForms((prev) => prev.filter((_, idx) => idx !== i));
  };

  const updateVariantForm = (i, updated) => {
    setVariantForms((prev) => prev.map((v, idx) => idx === i ? updated : v));
  };

  const handleOpenVariantForm = () => {
    setShowVariantForm(true);
    // Wait one tick for the form to mount, then scroll to it
    setTimeout(() => {
      variantFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleSaveVariants = async () => {
    setVariantSaving(true);
    try {
      // Save all variants sequentially
      for (const form of variantForms) {
        // Convert attributes array [{key, value}] to object {key: value}
        const attrsObj = {};
        form.attributes.forEach((attr) => {
          if (attr.key.trim() && attr.value.trim()) {
            attrsObj[attr.key.trim()] = attr.value.trim();
          }
        });

        // Skip saving empty variants
        if (Object.keys(attrsObj).length === 0 && (!form.price || form.price === "")) continue;

        const payload = {
          attributes: attrsObj,
          priceAmount: Number(form.price),
          priceCurrency: form.currency,
          stock: Number(form.stock) || 0,
          images: form.images?.map(img => img.file) || []
        };

        await handleAddVariant(id, payload);
      }
      
      // Reset after success
      setShowVariantForm(false);
      setVariantForms([blankVariant()]);
    } catch (error) {
      console.error("Failed to save variants:", error);
    } finally {
      setVariantSaving(false);
    }
  };

  if (loading) return <Skeleton />;
  if (!product) return (
    <div className="flex items-center justify-center h-full py-24" style={{ fontFamily: "var(--font-family)" }}>
      <p className="text-[0.75rem] uppercase tracking-widest" style={{ color: "var(--color-outline)" }}>
        Product not found
      </p>
    </div>
  );

  const images = product.images?.length > 0 
    ? product.images 
    : product.variants?.flatMap(v => v.images || []) || [];

  return (
    <div
      className="min-h-full p-6 lg:p-10"
      style={{ backgroundColor: "var(--color-background)", fontFamily: "var(--font-family)" }}
    >
      <div className="max-w-300 mx-auto flex flex-col gap-12">

        {/* ── Back + Header ── */}
        <div>
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

          {/* Seller badge */}
          <div className="flex items-center gap-3 mb-2">
            <span
              className="px-2 py-1 text-[0.48rem] font-bold uppercase tracking-[0.18em]"
              style={{ backgroundColor: "rgba(212,160,23,0.12)", color: "var(--color-primary-container)", border: "1px solid rgba(212,160,23,0.2)" }}
            >
              Seller View
            </span>
            <span className="text-[0.52rem] uppercase tracking-[0.1em]" style={{ color: "var(--color-outline)" }}>
              Managing Listing
            </span>
          </div>
        </div>

        {/* ── Product Overview ── */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-14">

          {/* LEFT — Gallery */}
          <ProductImageGallery images={images} activeImg={activeImg} setActiveImg={setActiveImg} product={product} />

          {/* RIGHT — Info */}
          <div className="flex-1 flex flex-col gap-5 min-w-0">
            <span
              className="self-start px-3 py-1 text-[0.52rem] font-bold uppercase tracking-[0.14em]"
              style={{ backgroundColor: "var(--color-surface-container-low)", color: "var(--color-outline)" }}
            >
              Product
            </span>

            <h1
              className="font-bold leading-tight"
              style={{ color: "var(--color-on-surface)", fontSize: "1.55rem", letterSpacing: "-0.01em" }}
            >
              {product.title}
            </h1>

            {/* Price */}
            {product.variants?.length > 0 && product.variants[0].price ? (
              <div className="flex items-baseline gap-3">
                <span className="font-bold" style={{ color: "var(--color-primary)", fontSize: "1.55rem" }}>
                  {formatPrice(product.variants[0].price.amount, product.variants[0].price.currency)}
                </span>
                <span
                  className="text-[0.58rem] font-semibold uppercase tracking-widest px-2 py-1"
                  style={{ backgroundColor: "var(--color-surface-container-high)", color: "var(--color-outline)" }}
                >
                  {product.variants[0].price.currency}
                </span>
              </div>
            ) : (
              <div className="flex items-baseline gap-3">
                <span className="font-bold uppercase tracking-widest text-[0.8rem]" style={{ color: "var(--color-outline)" }}>
                  Price pending setup
                </span>
              </div>
            )}

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

            <p className="text-[0.6rem] uppercase tracking-widest" style={{ color: "var(--color-outline)" }}>
              Listed on {formatDate(product.createdAt)}
            </p>

            <div style={{ height: "1px", backgroundColor: "rgba(212,160,23,0.1)" }} />

            {/* Seller actions */}
            <div className="flex flex-col gap-3 mt-1">
              <button
                onClick={() => navigate(`/seller/products/${product._id}/edit`)}
                className="w-full py-3 font-semibold uppercase tracking-[0.13em] transition-all duration-300 text-[0.68rem]"
                style={{
                  backgroundColor: "var(--color-primary-container)",
                  color: "var(--color-on-primary-container)",
                  border: "none", cursor: "pointer",
                  fontFamily: "var(--font-family)", borderRadius: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.12)")}
                onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
              >
                Edit Product
              </button>

              <button
                onClick={() => setShowDeleteModal(true)}
                disabled={deleting}
                className="w-full py-3 font-semibold uppercase tracking-[0.13em] transition-all duration-300 text-[0.68rem]"
                style={{
                  border: "1px solid rgba(255,100,100,0.35)",
                  color: "rgba(255,120,120,0.8)",
                  backgroundColor: "transparent",
                  cursor: "pointer", fontFamily: "var(--font-family)", borderRadius: 0,
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

            <p className="text-[0.58rem] uppercase tracking-widest mt-1" style={{ color: "var(--color-outline)" }}>
              {images.length} image{images.length !== 1 ? "s" : ""} uploaded
            </p>
          </div>
        </div>

        {/* ── Manage Variants Section ── */}
        <div className="flex flex-col gap-6">

          {/* Section header */}
          <div className="flex items-center justify-between">
            <div>
              <p
                className="uppercase tracking-[0.18em] text-[0.55rem] font-bold mb-1"
                style={{ color: "var(--color-primary-container)" }}
              >
                Variants
              </p>
              <h2
                className="font-bold"
                style={{ color: "var(--color-on-surface)", fontSize: "1.15rem", letterSpacing: "-0.01em" }}
              >
                Manage Product Variants
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                if (showVariantForm) {
                  setShowVariantForm(false);
                } else {
                  handleOpenVariantForm();
                }
              }}
              className="flex items-center gap-2 px-4 py-2.5 text-[0.62rem] uppercase tracking-[0.12em] font-semibold transition-all duration-300"
              style={{
                backgroundColor: showVariantForm ? "var(--color-surface-container-high)" : "var(--color-primary-container)",
                color: showVariantForm ? "var(--color-on-surface-variant)" : "var(--color-on-primary-container)",
                border: showVariantForm ? "1px solid rgba(79,70,52,0.4)" : "none",
                borderRadius: 0, cursor: "pointer", fontFamily: "var(--font-family)",
              }}
              onMouseEnter={(e) => { if (!showVariantForm) e.currentTarget.style.filter = "brightness(1.12)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = "none"; }}
            >
              {showVariantForm ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Cancel
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Create Variant
                </>
              )}
            </button>
          </div>

          {/* Existing variants list */}
          <ExistingVariantList variants={product.variants} />

          {/* ── Create Variant Form ── */}
          {showVariantForm && (
            <div
              ref={variantFormRef}
              className="flex flex-col gap-6 p-6"
              style={{
                backgroundColor: "var(--color-surface-container-lowest)",
                borderTop: "1px solid rgba(212,160,23,0.2)",
              }}
            >
              {/* Sub-header */}
              <div>
                <p
                  className="uppercase tracking-[0.18em] text-[0.55rem] font-bold mb-1"
                  style={{ color: "var(--color-primary-container)" }}
                >
                  New Variants
                </p>
                <p className="text-[0.7rem]" style={{ color: "var(--color-outline)" }}>
                  Define size, color, or any custom attributes. Each variant can have its own price and stock.
                </p>
              </div>

              {/* Variant forms */}
              <div className="flex flex-col gap-4">
                {variantForms.map((vf, i) => (
                  <VariantFormCard
                    key={i}
                    index={i}
                    variant={vf}
                    onChange={(upd) => updateVariantForm(i, upd)}
                    onRemove={() => removeVariantForm(i)}
                    isOnly={variantForms.length === 1}
                  />
                ))}
              </div>

              {/* Add another variant */}
              <button
                type="button"
                onClick={addVariantForm}
                className="flex items-center gap-2 py-3 w-full justify-center text-[0.62rem] uppercase tracking-[0.12em] font-semibold transition-all duration-300"
                style={{
                  backgroundColor: "transparent",
                  border: "1px dashed rgba(79,70,52,0.5)",
                  color: "var(--color-outline)",
                  borderRadius: 0, cursor: "pointer", fontFamily: "var(--font-family)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-primary-container)";
                  e.currentTarget.style.color = "var(--color-primary-container)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(79,70,52,0.5)";
                  e.currentTarget.style.color = "var(--color-outline)";
                }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Another Variant
              </button>

              {/* Save */}
              <button
                type="button"
                onClick={handleSaveVariants}
                disabled={variantSaving}
                className="zylo-btn-primary"
              >
                {variantSaving ? "Saving..." : `Save ${variantForms.length} Variant${variantForms.length !== 1 ? "s" : ""}`}
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          setShowDeleteModal(false);
          handleDeleteProduct(product._id);
          navigate("/seller/products");
        }}
        title="Delete Listing"
        message={`Are you sure you want to permanently delete "${product.title}"? This action cannot be undone.`}
        confirmText={deleting ? "Deleting..." : "Delete Permanently"}
        cancelText="Cancel"
        isDestructive={true}
      />
    </div>
  );
}
