import type { Product } from "./types";
import { products as fallbackProducts } from "./products";

const WOOCOMMERCE_URL = process.env.WOOCOMMERCE_URL || "https://pettzier.com.au";
const WOOCOMMERCE_KEY = process.env.WOOCOMMERCE_KEY || "";
const WOOCOMMERCE_SECRET = process.env.WOOCOMMERCE_SECRET || "";

function getAuthHeader() {
  const pair = `${WOOCOMMERCE_KEY}:${WOOCOMMERCE_SECRET}`;
  return `Basic ${Buffer.from(pair).toString("base64")}`;
}

export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  price: string;
  regular_price: string;
  sale_price: string;
  description: string;
  short_description: string;
  images: { id: number; src: string; alt: string }[];
  attributes: { name: string; options: string[] }[];
  stock_status: string;
}

export async function fetchWooProducts(): Promise<Product[]> {
  if (!WOOCOMMERCE_KEY || !WOOCOMMERCE_SECRET) {
    return fallbackProducts;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second max timeout

    const res = await fetch(`${WOOCOMMERCE_URL}/wp-json/wc/v3/products?per_page=50`, {
      headers: {
        Authorization: getAuthHeader(),
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      next: { revalidate: 300 }, // Cache in background for 5 minutes
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn("WooCommerce API returned status:", res.status);
      return fallbackProducts;
    }

    const data: WooProduct[] = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      // If WooCommerce has no products published yet, use featured fallback products
      return fallbackProducts;
    }

    // Map WooCommerce products to Petzier frontend Product structure
    return data.map((woo) => {
      // Find matching fallback product to retain rich editorial metadata if available
      const matchedFallback = fallbackProducts.find((p) => p.slug === woo.slug);

      const price = parseFloat(woo.price) || matchedFallback?.price || 49;
      const originalPrice = woo.regular_price && parseFloat(woo.regular_price) > price
        ? parseFloat(woo.regular_price)
        : matchedFallback?.originalPrice;

      return {
        slug: woo.slug,
        name: woo.name,
        tagline: woo.short_description ? woo.short_description.replace(/<[^>]*>/g, "") : matchedFallback?.tagline || "Premium pet essential",
        description: woo.description ? woo.description.replace(/<[^>]*>/g, "") : matchedFallback?.description || "",
        price: price,
        originalPrice: originalPrice,
        image: woo.images[0]?.src || matchedFallback?.image || "/gps-collar.jpg",
        heroImage: woo.images[0]?.src || matchedFallback?.heroImage || "/hero.jpg",
        badge: matchedFallback?.badge || (woo.sale_price ? "Sale" : undefined),
        dispatchNote: matchedFallback?.dispatchNote || "DISPATCHED IN 1–2 DAYS",
        problems: matchedFallback?.problems || [
          { title: "Quality Guarantee", description: "Every unit is inspected before dispatch." },
          { title: "Fast AU Delivery", description: "Ships direct from Melbourne warehouse." },
          { title: "30-Day Returns", description: "Risk-free evaluation period." },
        ],
        materials: matchedFallback?.materials || [
          { name: "Build", description: "Food-safe, pet-friendly durable materials" },
          { name: "Warranty", description: "12-Month manufacturer guarantee" },
        ],
        boxItems: matchedFallback?.boxItems || [
          { name: woo.name, qty: "×1" },
          { name: "User Guide & Warranty", qty: "×1" },
        ],
        specs: matchedFallback?.specs || [
          { label: "Origin", value: "Melbourne Warehouse" },
          { label: "Dispatch", value: "1–2 Business Days" },
          { label: "Warranty", value: "12 Months" },
        ],
        reviews: matchedFallback?.reviews || [],
        editorialHeadline: matchedFallback?.editorialHeadline || woo.name,
        editorialBody: matchedFallback?.editorialBody || woo.short_description || "",
      };
    });
  } catch (error) {
    console.error("Failed to fetch products from WooCommerce:", error);
    return fallbackProducts;
  }
}

export interface CreateOrderPayload {
  line_items: { product_id?: number; name?: string; quantity: number; price?: number }[];
  billing?: {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    address_1?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
}

export async function createWooOrder(payload: CreateOrderPayload) {
  if (!WOOCOMMERCE_KEY || !WOOCOMMERCE_SECRET) {
    throw new Error("WooCommerce API keys are not configured in environment.");
  }

  const res = await fetch(`${WOOCOMMERCE_URL}/wp-json/wc/v3/orders`, {
    method: "POST",
    headers: {
      Authorization: getAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: "pending",
      currency: "AUD",
      line_items: payload.line_items,
      billing: payload.billing || {},
      shipping: payload.billing || {},
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`WooCommerce order creation failed (${res.status}): ${errorText}`);
  }

  const order = await res.json();
  return {
    id: order.id,
    orderKey: order.order_key,
    paymentUrl: order.payment_url,
    total: order.total,
  };
}
