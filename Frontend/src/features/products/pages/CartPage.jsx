import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCart } from "../hooks/useCart";
import { setIncreaseQuantity, setDecreaseQuantity } from "../states/cart.slice";

import CartSkeleton from "../components/CartSkeleton";
import CartItemRow from "../components/CartItemRow";
import CartEmptyState from "../components/CartEmptyState";
import CartOrderSummary from "../components/CartOrderSummary";

// ── CartPage ──────────────────────────────────────────────────────────────────
export default function CartPage() {
  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const { cart, loading, handleGetMyCart, handleUpdateCart, handleRemoveFromCart } = useCart();

  // One debounce timer per productId
  const debounceRefs = useRef({});

  useEffect(() => {
    handleGetMyCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIncrease = useCallback((productId, variantId) => {
    dispatch(setIncreaseQuantity({ variantId, quantity: 1 }));
    clearTimeout(debounceRefs.current[variantId]);
    debounceRefs.current[variantId] = setTimeout(() => {
      const item = cart?.items?.find((i) => i.variant._id === variantId);
      if (item) handleUpdateCart(productId, variantId, item.quantity + 1);
    }, 700);
  }, [cart, dispatch, handleUpdateCart]);

  const handleDecrease = useCallback((productId, variantId) => {
    const item = cart?.items?.find((i) => i.variant._id === variantId);
    if (!item || item.quantity <= 1) return;
    dispatch(setDecreaseQuantity({ variantId, quantity: 1 }));
    clearTimeout(debounceRefs.current[variantId]);
    debounceRefs.current[variantId] = setTimeout(() => {
      const updated = cart?.items?.find((i) => i.variant._id === variantId);
      if (updated) handleUpdateCart(productId, variantId, updated.quantity - 1);
    }, 700);
  }, [cart, dispatch, handleUpdateCart]);

  const handleRemove = useCallback((productId, variantId) => {
    clearTimeout(debounceRefs.current[variantId]);
    handleRemoveFromCart(productId, variantId);
  }, [handleRemoveFromCart]);

  // ── Derived state ────────────────────────────────────────────────────────────
  const cartItems = cart?.items ?? [];
  const currency  = cartItems[0]?.variant?.price?.currency ?? "INR";
  const subtotal  = cartItems.reduce((s, i) => s + (i.variant?.price?.amount ?? 0) * i.quantity, 0);
  const itemCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  if (loading && cartItems.length === 0) return <CartSkeleton />;

  // ── Empty state ──────────────────────────────────────────────────────────────
  if (!loading && cartItems.length === 0) {
    return <CartEmptyState />;
  }

  // ── Main ─────────────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-background)", fontFamily: "var(--font-family)" }}
    >
      <div className="max-w-300 mx-auto px-5 sm:px-8 lg:px-10 pt-10 sm:pt-14 pb-24">

        {/* ── Page heading ── */}
        <div className="flex items-end justify-between mb-2">
          <div className="flex items-baseline gap-4">
            <h1
              className="font-bold uppercase leading-none"
              style={{ color: "var(--color-on-surface)", fontSize: "clamp(1.6rem, 4vw, 2.8rem)", letterSpacing: "-0.02em" }}
            >
              Your Cart
            </h1>
            <span
              className="text-[0.55rem] font-bold uppercase tracking-[0.24em] pb-0.5"
              style={{ color: "var(--color-primary)" }}
            >
              {String(itemCount).padStart(2, "0")} {itemCount === 1 ? "Item" : "Items"}
            </span>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="text-[0.55rem] font-bold uppercase tracking-[0.18em] hidden sm:flex items-center gap-2 transition-colors duration-200 mb-1"
            style={{ color: "var(--color-outline)", background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-outline)")}
          >
            ← Continue Shopping
          </button>
        </div>

        {/* Gold rule */}
        <div className="mb-8 sm:mb-10" style={{ height: "1px", backgroundColor: "rgba(212,160,23,0.15)" }} />

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-6 xl:gap-10 items-start">

          {/* LEFT — Items ────────────────────────────────────────────────────── */}
          <div className="flex-1 w-full flex flex-col">
            {/* Column header */}
            <div
              className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-4 px-7 pb-4"
              style={{ borderBottom: "1px solid rgba(212,160,23,0.1)" }}
            >
              {["Product", "Qty", "Total"].map((label) => (
                <span
                  key={label}
                  className="text-[0.52rem] font-bold uppercase tracking-[0.22em]"
                  style={{ color: "var(--color-outline)" }}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Items */}
            <div className="flex flex-col">
              {cartItems.map((item) => (
                <CartItemRow
                  key={item.product._id}
                  item={item}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  onRemove={handleRemove}
                />
              ))}
            </div>

            {/* Continue shopping — mobile only */}
            <button
              onClick={() => navigate("/collections")}
              className="sm:hidden mt-4 self-start text-[0.58rem] font-bold uppercase tracking-[0.18em] flex items-center gap-2 transition-colors duration-200 py-2"
              style={{ color: "var(--color-outline)", background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-outline)")}
            >
              ← Continue Shopping
            </button>
          </div>

          {/* RIGHT — Order Summary ─────────────────────────────────────────── */}
          <CartOrderSummary subtotal={subtotal} currency={currency} />

        </div>
      </div>
    </div>
  );
}
