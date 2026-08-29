import { notFound } from "next/navigation";
import { fetchWooProducts, fetchWooProductBySlug } from "@/lib/woocommerce";
import PDPHero from "@/components/pdp/PDPHero";
import ProblemSolution from "@/components/pdp/ProblemSolution";
import MaterialBreakdown from "@/components/pdp/MaterialBreakdown";
import WhatInBox from "@/components/pdp/WhatInBox";
import SpecsTable from "@/components/pdp/SpecsTable";
import PDPReviews from "@/components/pdp/PDPReviews";
import StickyAddToCart from "@/components/pdp/StickyAddToCart";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const wooProducts = await fetchWooProducts();
  return wooProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchWooProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Petzier`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await fetchWooProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <PDPHero product={product} />
      <ProblemSolution problems={product.problems} />
      <MaterialBreakdown materials={product.materials} />
      <WhatInBox items={product.boxItems} />
      <SpecsTable specs={product.specs} productName={product.name} />
      <PDPReviews reviews={product.reviews} productName={product.name} />
      <Footer />
      <StickyAddToCart
        productName={product.name}
        price={product.price}
        slug={product.slug}
        image={product.image}
        wooId={product.wooId}
      />
    </>
  );
}
