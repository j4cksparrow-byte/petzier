import { NextResponse } from "next/server";
import { createWooOrder } from "@/lib/woocommerce";
import { products } from "@/lib/products";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, quantity = 1, cartItems } = body;

    let lineItems: { name: string; quantity: number; price?: number }[] = [];

    if (cartItems && Array.isArray(cartItems) && cartItems.length > 0) {
      lineItems = cartItems.map((item: { name: string; quantity: number; price?: number }) => ({
        name: item.name,
        quantity: item.quantity || 1,
        price: item.price,
      }));
    } else if (slug) {
      const product = products.find((p) => p.slug === slug);
      const name = product ? product.name : slug;
      const price = product ? product.price : undefined;
      lineItems = [
        {
          name: name,
          quantity: Number(quantity) || 1,
          price: price,
        },
      ];
    } else {
      return NextResponse.json({ error: "Missing product slug or cart items" }, { status: 400 });
    }

    const order = await createWooOrder({
      line_items: lineItems,
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
