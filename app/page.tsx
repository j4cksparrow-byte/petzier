import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ProductGrid from "@/components/ProductGrid";
import EditorialSection from "@/components/EditorialSection";
import ReviewGrid from "@/components/ReviewGrid";
import Footer from "@/components/Footer";
import { fetchWooProducts } from "@/lib/woocommerce";

export default async function HomePage() {
  const products = await fetchWooProducts();

  return (
    <>
      <Hero />
      <TrustBar />
      <ProductGrid products={products} />
      <EditorialSection />
      <ReviewGrid />
      <Footer />
    </>
  );
}
