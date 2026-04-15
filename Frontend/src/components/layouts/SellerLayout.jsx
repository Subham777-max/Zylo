import { Outlet } from "react-router-dom";
import SellerSidebar from "./SellerSidebar";

export default function SellerLayout() {
  return (
    <div
      className="flex h-full min-h-[calc(100vh-64px)]"
      style={{
        backgroundColor: "var(--color-background)",
        fontFamily: "var(--font-family)",
      }}
    >
      {/* ── Sidebar — fixed width, full height ──────────────────────────── */}
      <div
        className="hidden lg:flex flex-col shrink-0"
        style={{ width: "220px" }}
      >
        <SellerSidebar />
      </div>

      {/* ── Mobile sidebar — slide-in drawer placeholder ─────────────────
          (can be wired later; for now collapses at < lg) */}

      {/* ── Main content area ───────────────────────────────────────────── */}
      <main
        className="flex-1 overflow-y-auto"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <Outlet />
      </main>
    </div>
  );
}
