import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SellerSidebar from "./SellerSidebar";
import { CloseIconBig as CloseIcon , MenuIcon } from "../ui/GlobalIcons";

export default function SellerLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  // Auto-close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <div
      className="flex h-full min-h-[calc(100vh-64px)]"
      style={{ backgroundColor: "var(--color-background)", fontFamily: "var(--font-family)" }}
    >
      {/*  Desktop sidebar — sticky, does NOT scroll with content  */}
      <div
        className="hidden lg:flex flex-col shrink-0 sticky top-16 self-start"
        style={{ width: "220px", height: "calc(100vh - 64px)", overflowY: "auto" }}
      >
        <SellerSidebar onNavigate={() => {}} />
      </div>

      {/*  Mobile top bar (visible < lg)  */}
      <div
        className="lg:hidden fixed top-16 left-0 right-0 z-40 flex items-center px-5"
        style={{
          height: "48px",
          backgroundColor: "rgba(28,27,27,0.97)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(212,160,23,0.1)",
        }}
      >
        <button
          onClick={() => setDrawerOpen((v) => !v)}
          aria-label={drawerOpen ? "Close seller menu" : "Open seller menu"}
          className="flex items-center gap-2 transition-colors duration-200"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-primary)",
            fontFamily: "var(--font-family)",
            fontSize: "0.6rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
          }}
        >
          {drawerOpen ? <CloseIcon /> : <MenuIcon />}
          <span style={{ color: "var(--color-outline)" }}>
            {drawerOpen ? "Close" : "Seller Studio"}
          </span>
        </button>
      </div>

      {/*  Mobile drawer overlay  */}
      {/* Backdrop */}
      <div
        className="lg:hidden fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          top: "112px", // 64px navbar + 48px mobile bar
          backgroundColor: "rgba(19,19,19,0.75)",
          backdropFilter: "blur(4px)",
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? "auto" : "none",
        }}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Slide-in drawer panel */}
      <div
        className="lg:hidden fixed z-40 flex flex-col"
        style={{
          top: "112px",
          left: 0,
          bottom: 0,
          width: "260px",
          transform: drawerOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          backgroundColor: "var(--color-surface-container-low)",
          boxShadow: drawerOpen ? "8px 0 32px rgba(0,0,0,0.5)" : "none",
        }}
      >
        <SellerSidebar onNavigate={() => setDrawerOpen(false)} />
      </div>

      {/*  Main content  */}
      <main
        className="flex-1 overflow-y-auto"
        style={{
          backgroundColor: "var(--color-background)",
          // On mobile push content down below the 48px seller top-bar
          paddingTop: "var(--seller-bar-height, 0px)",
        }}
      >
        {/* Mobile spacer so content isn't hidden under the top bar */}
        <div className="lg:hidden" style={{ height: "48px" }} />
        <Outlet />
      </main>
    </div>
  );
}
