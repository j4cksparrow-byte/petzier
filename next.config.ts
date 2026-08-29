import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // WooCommerce backend (petzier934-bhctf.wpcomstaging.com) — this is the
      // permanent production store, not a temporary staging site. It's what
      // WOOCOMMERCE_URL should point to in every environment.
      {
        protocol: "https",
        hostname: "petzier934-bhctf.wpcomstaging.com",
      },
      // WordPress.com CDN
      {
        protocol: "https",
        hostname: "*.wp.com",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com",
      },
      {
        protocol: "https",
        hostname: "i1.wp.com",
      },
      {
        protocol: "https",
        hostname: "i2.wp.com",
      },
      // Storefront domain
      {
        protocol: "https",
        hostname: "pettzier.com.au",
      },
      // iDropship product images (CDN)
      {
        protocol: "https",
        hostname: "*.idropship.com.au",
      },
      {
        protocol: "https",
        hostname: "idropship-s.s3.ap-southeast-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
