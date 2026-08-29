import { NextResponse } from "next/server";
import { createWooOrder, type CreateOrderPayload } from "@/lib/woocommerce";
import { products } from "@/lib/products";

interface CartItemInput {
  wooId?: number;
  slug?: string;
  name: string;
  quantity: number;
  price?: number;
}

function toLineItem(item: CartItemInput): CreateOrderPayload["line_items"][number] {
  const quantity = Math.max(1, Number(item.quantity) || 1);

  // Preferred path: a real WooCommerce product. Let WooCommerce price it from
  // the live catalog — this also avoids trusting a client-supplied price.
  if (item.wooId) {
    return { product_id: item.wooId, quantity };
  }

  // Fallback: no matching WooCommerce product (e.g. a placeholder product).
  // WooCommerce ignores a plain "price" field on line items, so we must set
  // subtotal/total explicitly or the line item is created at $0.
  const unitPrice = typeof item.price === "number" ? item.price : 0;
  const lineTotal = (unitPrice * quantity).toFixed(2);
  return {
    name: item.name,
    quantity,
    subtotal: lineTotal,
    total: lineTotal,
  } as CreateOrderPayload["line_items"][number];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, quantity = 1, cartItems, billing } = body;

    let lineItems: CreateOrderPayload["line_items"] = [];

    if (cartItems && Array.isArray(cartItems) && cartItems.length > 0) {
      lineItems = cartItems.map((item: CartItemInput) => toLineItem(item));
    } else if (slug) {
      const product = products.find((p) => p.slug === slug);
      lineItems = [
        toLineItem({
          wooId: product?.wooId,
          name: product ? product.name : slug,
          quantity: Number(quantity) || 1,
          price: product?.price,
        }),
      ];
    } else {
      return NextResponse.json({ error: "Missing product slug or cart items" }, { status: 400 });
    }

    if (billing && (!billing.email || !billing.first_name || !billing.address_1)) {
      return NextResponse.json(
        { error: "Please fill in your name, email, and address before continuing." },
        { status: 400 }
      );
    }

    const order = await createWooOrder({
      line_items: lineItems,
      billing,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      paymentUrl: order.paymentUrl,
    });
  } catch (error: any) {
    console.error("Checkout route error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
