import type { Product } from "./types";
import { products as fallbackProducts } from "./products";

// petzier934-bhctf.wpcomstaging.com is the permanent WooCommerce backend
// (not a temporary staging site — shop.pettzier.com.au was never finished
// and is no longer used). Set WOOCOMMERCE_URL in every environment
// (including Vercel) to this value; the fallback below just mirrors it.
const WOOCOMMERCE_URL = process.env.WOOCOMMERCE_URL || "https://petzier934-bhctf.wpcomstaging.com";
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

function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').trim();
}

function mapWooToProduct(woo: WooProduct): Product {
  const matchedFallback = fallbackProducts.find((p) => p.slug === woo.slug);
  const price = parseFloat(woo.price) || matchedFallback?.price || 49;
  const originalPrice = woo.regular_price && parseFloat(woo.regular_price) > price
    ? parseFloat(woo.regular_price)
    : matchedFallback?.originalPrice;

  const imageSrc = woo.images && woo.images.length > 0 ? woo.images[0].src : (matchedFallback?.image || "/gps-collar.jpg");

  // Map WooCommerce attributes to specs table
  const wooSpecs = woo.attributes && woo.attributes.length > 0
    ? woo.attributes.map((attr) => ({
        label: attr.name,
        value: Array.isArray(attr.options) ? attr.options.join(", ") : String(attr.options),
      }))
    : null;

  return {
    wooId: woo.id,
    slug: woo.slug,
    name: woo.name,
    tagline: stripHtml(woo.short_description) || matchedFallback?.tagline || "Premium pet essential",
    description: stripHtml(woo.description) || matchedFallback?.description || stripHtml(woo.short_description) || "",
    price: price,
    originalPrice: originalPrice,
    image: imageSrc,
    heroImage: imageSrc,
    badge: matchedFallback?.badge || (woo.sale_price ? "Sale" : undefined),
    dispatchNote: matchedFallback?.dispatchNote || "DISPATCHED IN 1–2 DAYS",
    problems: matchedFallback?.problems || [
      { title: "Vet-Approved Quality", description: "Inspected and quality-tested before dispatch." },
      { title: "Fast AU Dispatch", description: "Dispatched from Melbourne warehouse within 24-48 hours." },
      { title: "30-Day Risk-Free Returns", description: "Try it at home with a 30-day money-back guarantee." },
    ],
    materials: matchedFallback?.materials || [
      { name: "Build", description: "Food-safe, ultra-durable pet friendly materials" },
      { name: "Warranty", description: "12-Month full manufacturer warranty" },
    ],
    boxItems: matchedFallback?.boxItems || [
      { name: woo.name, qty: "×1" },
      { name: "User Guide & Care Instructions", qty: "×1" },
    ],
    specs: wooSpecs || matchedFallback?.specs || [
      { label: "Dispatch", value: "Melbourne Warehouse (1–2 Days)" },
      { label: "Warranty", value: "12 Months" },
      { label: "Stock Status", value: woo.stock_status === "instock" ? "In Stock" : "Limited Stock" },
    ],
    reviews: matchedFallback?.reviews || [
      {
        name: "Verified Customer",
        location: "Australia",
        rating: 5,
        text: "Purchased this through Petzier — arrived fast in 2 days and quality is fantastic!",
        petName: "Buddy",
      },
    ],
    editorialHeadline: matchedFallback?.editorialHeadline || woo.name,
    editorialBody: matchedFallback?.editorialBody || stripHtml(woo.description) || stripHtml(woo.short_description) || "",
  };
}

export async function fetchWooProducts(): Promise<Product[]> {
  if (!WOOCOMMERCE_KEY || !WOOCOMMERCE_SECRET) {
    return fallbackProducts;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${WOOCOMMERCE_URL}/wp-json/wc/v3/products?per_page=50`, {
      headers: {
        Authorization: getAuthHeader(),
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      next: { revalidate: 60 },
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn("WooCommerce API returned status:", res.status);
      return fallbackProducts;
    }

    const data: WooProduct[] = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      return fallbackProducts;
    }

    return data.map((woo) => mapWooToProduct(woo));
  } catch (error) {
    console.error("Failed to fetch products from WooCommerce:", error);
    return fallbackProducts;
  }
}

export async function fetchWooProductBySlug(slug: string): Promise<Product | undefined> {
  // First try fetching live product from WooCommerce by slug
  if (WOOCOMMERCE_KEY && WOOCOMMERCE_SECRET) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(`${WOOCOMMERCE_URL}/wp-json/wc/v3/products?slug=${encodeURIComponent(slug)}`, {
        headers: {
          Authorization: getAuthHeader(),
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        next: { revalidate: 60 },
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data: WooProduct[] = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return mapWooToProduct(data[0]);
        }
      }
    } catch (err) {
      console.error(`Failed to fetch WooCommerce product slug ${slug}:`, err);
    }
  }

  // Fallback to static product list if WooCommerce product is not found or key is missing
  return fallbackProducts.find((p) => p.slug === slug);
}

export interface CreateOrderPayload {
  line_items: {
    product_id?: number;
    name?: string;
    quantity: number;
    /** Not a real WooCommerce field — ignored by the API, kept only for backward compat. */
    price?: number;
    subtotal?: string;
    total?: string;
  }[];
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
    throw new Error(
      "WooCommerce API keys are not configured. Set WOOCOMMERCE_URL, WOOCOMMERCE_KEY and WOOCOMMERCE_SECRET in your environment."
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  let res: Response;
  try {
    res = await fetch(`${WOOCOMMERCE_URL}/wp-json/wc/v3/orders`, {
      method: "POST",
      headers: {
        Authorization: getAuthHeader(),
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        status: "pending",
        currency: "AUD",
        line_items: payload.line_items,
        billing: payload.billing || {},
        shipping: payload.billing || {},
      }),
    });
  } catch (err) {
    const reason = err instanceof Error && err.name === "AbortError" ? "timed out" : "could not connect";
    throw new Error(
      `Could not reach the WooCommerce store at ${WOOCOMMERCE_URL} (request ${reason}). Check that WOOCOMMERCE_URL points to a live, reachable WordPress site.`
    );
  } finally {
    clearTimeout(timeoutId);
  }

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
