import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShopProductCard from "./ShopProductCard";

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

function ProductSkeleton() {
  return (
    <div
      className="flex flex-col animate-pulse"
      style={{ backgroundColor: "var(--color-surface-container-low)" }}
    >
      <div
        className="w-full"
        style={{
          aspectRatio: "4/5",
          backgroundColor: "var(--color-surface-container-high)",
        }}
      />
      <div className="p-4 flex flex-col gap-3">
        <div
          className="h-3 w-3/4"
          style={{ backgroundColor: "var(--color-surface-container-high)" }}
        />
        <div
          className="h-3 w-1/3"
          style={{ backgroundColor: "var(--color-surface-container-high)" }}
        />
      </div>
    </div>
  );
}

function EmptyProducts() {
  return (
    <div className="flex flex-col items-center justify-center py-28 gap-5">
      <svg
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: "var(--color-outline)" }}
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      <div className="text-center">
        <p
          className="font-semibold text-sm mb-1"
          style={{ color: "var(--color-on-surface)" }}
        >
          No products available
        </p>
        <p
          className="text-[0.62rem] uppercase tracking-widest"
          style={{ color: "var(--color-outline)" }}
        >
          Check back soon for new arrivals
        </p>
      </div>
    </div>
  );
}

const PAGE_SIZE = 8;

export default function ProductsSection({ products, loading }) {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const hasMore = visibleCount < (products?.length ?? 0);

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      {/* Section header */}
      <div className="flex items-end justify-between gap-4 mb-10">
        <div>
          <p
            className="text-[0.56rem] uppercase tracking-[0.26em] mb-1.5"
            style={{ color: "var(--color-primary-container)" }}
          >
            Discover
          </p>
          <h2
            className="font-bold"
            style={{
              color: "var(--color-on-surface)",
              fontSize: "1.25rem",
              letterSpacing: "-0.02em",
            }}
          >
            New In
          </h2>
          <p
            className="text-[0.6rem] mt-1 uppercase tracking-widest"
            style={{ color: "var(--color-outline)" }}
          >
            {loading
              ? "Loading…"
              : `${products?.length ?? 0} curated pieces`}
          </p>
        </div>

        <button
          onClick={() => navigate("/collections")}
          className="hidden sm:flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 shrink-0"
          style={{
            color: "var(--color-primary-container)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-family)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--color-primary)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--color-primary-container)")
          }
        >
          View All <ArrowRight />
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : !products?.length ? (
        <EmptyProducts />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
            {products.slice(0, visibleCount).map((product, i) => (
              <ShopProductCard key={product._id} product={product} index={i} />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="px-10 py-3.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300"
                style={{
                  border: "1px solid var(--color-primary-container)",
                  color: "var(--color-primary-container)",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  fontFamily: "var(--font-family)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-primary-container)";
                  e.currentTarget.style.color =
                    "var(--color-on-primary-container)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color =
                    "var(--color-primary-container)";
                }}
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
