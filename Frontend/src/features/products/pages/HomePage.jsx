import { useEffect } from "react";
import { useProducts } from "../hooks/useProducts";

import HeroSection      from "../components/home/HeroSection";
import MarqueeStrip     from "../components/home/MarqueeStrip";
import CategoryStrip    from "../components/home/CategoryStrip";
import ProductsSection  from "../components/home/ProductsSection";
import EditorialBanner  from "../components/home/EditorialBanner";
import FooterStrip      from "../components/home/FooterStrip";

export default function HomePage() {
  const { allProducts, loading, handleGetAllProducts } = useProducts();

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "var(--color-background)",
        fontFamily: "var(--font-family)",
        minHeight: "100vh",
      }}
    >
      <HeroSection />
      <MarqueeStrip />
      <CategoryStrip />
      <ProductsSection products={allProducts} loading={loading} />
      <EditorialBanner />
      <FooterStrip />
    </div>
  );
}
