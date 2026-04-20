import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";

// ── Skeleton card ──────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="flex flex-col animate-pulse" style={{ backgroundColor: "var(--color-surface-container-low)" }}>
      <div className="w-full" style={{ aspectRatio: "4/5", backgroundColor: "var(--color-surface-container-high)" }} />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-3 w-3/4 rounded-none" style={{ backgroundColor: "var(--color-surface-container-high)" }} />
        <div className="h-3 w-1/3 rounded-none" style={{ backgroundColor: "var(--color-surface-container-high)" }} />
        <div style={{ height: "1px", backgroundColor: "rgba(212,160,23,0.08)" }} />
        <div className="flex gap-2">
          <div className="flex-1 h-8" style={{ backgroundColor: "var(--color-surface-container-high)" }} />
          <div className="flex-1 h-8" style={{ backgroundColor: "var(--color-surface-container-high)" }} />
        </div>
      </div>
    </div>
  );
}

// ── Empty state ────────────────────────────────────────────────────────────────
function EmptyState({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-5">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-outline)" }}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
      <div className="text-center">
        <p className="font-semibold text-sm mb-1" style={{ color: "var(--color-on-surface)" }}>No listings yet</p>
        <p className="text-[0.72rem] uppercase tracking-widest" style={{ color: "var(--color-outline)" }}>
          Create your first product to get started
        </p>
      </div>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-6 py-3 transition-all duration-300 text-[0.65rem] font-semibold uppercase tracking-[0.13em]"
        style={{
          border: "1px solid var(--color-primary-container)",
          color: "var(--color-primary-container)",
          backgroundColor: "transparent",
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
        + New Listing
      </button>
    </div>
  );
}

// ── Create Product Modal ────────────────────────────────────────────────────────
function CreateProductModal({ onClose }) {
  const navigate = useNavigate();
  const { handleCreateProduct, loading } = useProducts();
  const [form, setForm] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({});

  function handleFieldChange(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required.";
    if (!form.description.trim()) errs.description = "Description is required.";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    try {
      const newProduct = await handleCreateProduct({ title: form.title, description: form.description });
      // Navigate to seller product details with a state flag to auto-open variant form
      navigate(`/seller/products/${newProduct._id}`, { state: { openVariantForm: true } });
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(10,10,10,0.85)", backdropFilter: "blur(4px)" }}
    >
      <div 
        className="w-full max-w-md p-8 relative flex flex-col"
        style={{ backgroundColor: "var(--color-background)", border: "1px solid var(--color-outline-variant)" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
          style={{ background: "none", border: "none", color: "var(--color-outline)", cursor: "pointer" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h2 className="font-bold tracking-[0.15em] uppercase mb-1" style={{ color: "var(--color-primary-container)", fontSize: "1.2rem" }}>
          New Listing
        </h2>
        <p className="uppercase tracking-[0.14em] text-[0.6rem] mb-6" style={{ color: "var(--color-outline)" }}>
          Basic Details
        </p>

        <ProductForm 
          form={form} 
          onChange={handleFieldChange} 
          errors={errors} 
          onSubmit={handleSubmit} 
          isSubmitting={loading} 
        />
      </div>
    </div>
  );
}

// ── MyProductPage ──────────────────────────────────────────────────────────────
export default function MyProductPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sellerProducts, loading, handleGetProductsCreatedByMe } = useProducts();
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    handleGetProductsCreatedByMe();
  }, []);

  useEffect(() => {
    if (location.state?.openCreateModal) {
      setShowCreateModal(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  return (
    <div
      className="min-h-full p-6 lg:p-10"
      style={{ backgroundColor: "var(--color-background)", fontFamily: "var(--font-family)" }}
    >
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1
            className="font-bold uppercase tracking-[0.14em] mb-1"
            style={{ color: "var(--color-primary-container)", fontSize: "1.3rem" }}
          >
            My Products
          </h1>
          <p className="uppercase tracking-[0.14em] text-[0.58rem]" style={{ color: "var(--color-outline)" }}>
            {loading ? "Loading…" : `${sellerProducts?.length ?? 0} listing${(sellerProducts?.length ?? 0) !== 1 ? "s" : ""}`}
          </p>
          <div className="mt-3" style={{ height: "1px", width: "32px", backgroundColor: "var(--color-primary-container)" }} />
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 transition-all duration-300 shrink-0 text-[0.62rem] font-semibold uppercase tracking-[0.13em]"
          style={{
            border: "1px solid var(--color-primary-container)",
            color: "var(--color-primary-container)",
            backgroundColor: "transparent",
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
          + New Listing
        </button>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : !sellerProducts?.length ? (
        <EmptyState onAdd={() => setShowCreateModal(true)} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {sellerProducts.map((product, idx) => (
            <ProductCard key={product._id} product={product} index={idx} />
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && <CreateProductModal onClose={() => setShowCreateModal(false)} />}
    </div>
  );
}