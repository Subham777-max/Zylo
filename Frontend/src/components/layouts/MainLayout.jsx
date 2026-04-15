import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function MainLayout() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--color-background)",
        fontFamily: "var(--font-family)",
        color: "var(--color-on-background)",
      }}
    >
      {/* Fixed glassmorphism navbar */}
      <Navbar />

      {/* Page content — padded below navbar height */}
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
}
