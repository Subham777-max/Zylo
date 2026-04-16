import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const navigate = useNavigate();
  const { products, handleGetProducts } = useProducts();

  useEffect(() => {
    // Fetch products to show in "New Arrivals"
    handleGetProducts();
  }, [handleGetProducts]);

  // Take the last 4 products as "New Arrivals"
  const newArrivals = products?.slice(0, 4) || [];

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor: "var(--color-background)" }}>
      
      {/* ── HERO SECTION ────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ height: "calc(100vh - 64px)" }}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/zylo_noir_hero_model_1776355919750.png" 
            alt="Noir Series Hero" 
            className="w-full h-full object-cover"
          />
          {/* Subtle Overlay Gradient */}
          <div 
            className="absolute inset-0" 
            style={{ background: "linear-gradient(to right, rgba(19, 19, 19, 0.8) 0%, rgba(19, 19, 19, 0.2) 50%, rgba(19, 19, 19, 0.6) 100%)" }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center px-6 lg:px-24">
          <div className="max-w-[600px] flex flex-col gap-6">
            <h1 className="flex flex-col leading-[0.9]">
              <span className="text-[10vw] lg:text-[7rem] font-bold tracking-[-0.04em] mix-blend-difference" style={{ color: "#ffffff" }}>
                NOIR
              </span>
              <span className="text-[12vw] lg:text-[8rem] font-bold tracking-[-0.04em] italic" style={{ color: "var(--color-primary)" }}>
                SERIES
              </span>
            </h1>
            
            <p className="text-[0.8rem] lg:text-[1rem] leading-relaxed max-w-[400px]" style={{ color: "rgba(255,255,255,0.75)" }}>
              The latest transition from sunset to absolute darkness. Explore the AW'24 collection featuring artisanal textures and nocturnal silhouettes.
            </p>

            <button
               onClick={() => navigate("/collections")}
               className="self-start px-12 py-4 text-[0.7rem] font-bold uppercase tracking-[0.2em] transition-all duration-500"
               style={{ 
                 backgroundColor: "var(--color-primary)", 
                 color: "#000",
                 border: "none",
                 borderRadius: 0,
                 cursor: "pointer"
               }}
               onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.15) scale(1.05)")}
               onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
            >
              Explore Collection
            </button>
          </div>
        </div>

        {/* Floating Curated indicator */}
        <div className="absolute bottom-12 right-12 hidden lg:flex flex-col gap-2 border-l border-[var(--color-primary)] pl-6 py-2">
            <span className="text-[0.55rem] uppercase tracking-[0.4em]" style={{ color: "rgba(255,255,255,0.4)" }}>Current Exhibition</span>
            <span className="text-[1.2rem] font-bold tracking-widest" style={{ color: "var(--color-primary)" }}>AESTHETIC OF SILENCE</span>
        </div>
      </section>

      {/* ── EDITORIAL GALLERY ───────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-24">
        <header className="mb-12 flex flex-col items-start gap-1">
          <span className="text-[0.6rem] uppercase tracking-[0.3em]" style={{ color: "var(--color-primary)" }}>Curated Selection</span>
          <h2 className="text-[2.5rem] lg:text-[3.5rem] font-bold tracking-tight" style={{ color: "var(--color-on-surface)" }}>
            The Digital <span className="italic font-light">Gallery</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[700px]">
          {/* Main Large Card */}
          <div className="lg:col-span-8 relative overflow-hidden group">
             <img src="/zylo_gallery_minimalism_1776355947434.png" alt="Minimalism" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#131313]/90 via-transparent to-transparent flex flex-col justify-end p-10">
                <span className="text-[0.6rem] uppercase tracking-widest mb-2" style={{ color: "var(--color-primary)" }}>New Arrival</span>
                <h3 className="text-3xl font-bold tracking-wide text-white">MINIMALISM II</h3>
                <button 
                  onClick={() => navigate("/collections/minimalism")}
                  className="mt-4 self-start text-[0.6rem] font-bold uppercase tracking-[0.2em] border-b border-white pb-1" style={{ color: "white", background: "none" }}>Shop the look</button>
             </div>
          </div>
          
          {/* Right column with two stacks */}
          <div className="lg:col-span-4 flex flex-col gap-6">
             <div className="flex-1 relative overflow-hidden group bg-[#1c1b1b]">
                <div className="absolute inset-0 p-8 flex flex-col justify-center gap-4">
                    <span className="text-[0.5rem] uppercase tracking-widest" style={{ color: "var(--color-primary)" }}>Our Mission</span>
                    <p className="text-xl font-medium leading-relaxed italic" style={{ color: "var(--color-on-surface-variant)" }}>
                       "We believe in <span className="text-[var(--color-primary)]">fashion as an archival practice</span>, not a disposable one."
                    </p>
                    <button className="self-start text-[0.55rem] font-bold uppercase tracking-[0.2em] mt-2 flex items-center gap-2" style={{ color: "var(--color-primary)", background: "none" }}>
                        Learn about Zylo <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </button>
                </div>
             </div>
             
             {/* CTA CARD */}
             <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-center p-8 gap-4 text-center" style={{ backgroundColor: "var(--color-primary)" }}>
                <div className="w-12 h-12 flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path></svg>
                </div>
                <h3 className="text-[1.5rem] font-bold uppercase tracking-[0.1em]" style={{ color: "#000" }}>Join the Atelier</h3>
                <p className="text-[0.7rem] uppercase tracking-widest font-medium" style={{ color: "#000", opacity: 0.7 }}>Sign up to get early access to nocturnal drops.</p>
                <button 
                  onClick={() => navigate("/register")}
                  className="px-8 py-2.5 text-[0.6rem] font-bold uppercase tracking-[0.2em]" style={{ border: "1px solid #000", color: "#000", backgroundColor: "transparent" }}>Register</button>
             </div>
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS PREVIEW ────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-24 bg-[#181818]">
        <div className="flex items-end justify-between mb-12">
            <div>
                <span className="text-[0.6rem] uppercase tracking-[0.3em]" style={{ color: "var(--color-outline)" }}>Latest Drops</span>
                <h2 className="text-[2rem] lg:text-[2.5rem] font-bold text-white uppercase tracking-tighter">New Arrivals</h2>
            </div>
            <button 
              onClick={() => navigate("/new-in")}
              className="text-[0.6rem] font-bold uppercase tracking-[0.15em] flex items-center gap-2 mb-2 transition-colors duration-300 hover:text-[var(--color-primary)]" style={{ color: "var(--color-outline)", background: "none" }}>
                View All <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {newArrivals.length > 0 ? (
                newArrivals.map((product, idx) => (
                    <ProductCard key={product._id} product={product} index={idx} />
                ))
            ) : (
                Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-4 animate-pulse">
                        <div className="aspect-[4/5] bg-neutral-800" />
                        <div className="h-4 w-3/4 bg-neutral-800" />
                        <div className="h-4 w-1/4 bg-neutral-800" />
                    </div>
                ))
            )}
        </div>
      </section>
      
    </div>
  );
}
