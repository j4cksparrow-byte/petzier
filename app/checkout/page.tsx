"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const AU_STATES = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];

interface BillingForm {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address_1: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

const emptyForm: BillingForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  address_1: "",
  city: "",
  state: "NSW",
  postcode: "",
  country: "AU",
};

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState<BillingForm>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof BillingForm, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: items.map((i) => ({
            wooId: i.wooId,
            name: i.name,
            quantity: i.quantity,
            price: i.price,
          })),
          billing: form,
        }),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Something went wrong creating your order. Please try again.");
        setSubmitting(false);
        return;
      }

      if (data.paymentUrl) {
        clearCart();
        window.location.href = data.paymentUrl;
      } else {
        setError("Order created, but no payment link was returned. Please contact support.");
        setSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setError("Could not connect to the checkout server. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <section className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center gap-4 px-6">
        <p className="text-[#211F1B]/60 text-sm">Your cart is empty.</p>
        <Link
          href="/#products"
          className="rounded-full font-mono text-xs tracking-[0.1em] uppercase bg-[#211F1B] text-white px-5 py-3.5 hover:bg-[#211F1B]/85 transition-colors"
        >
          Browse Products
        </Link>
      </section>
    );
  }

  return (
    <section className="pt-28 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-10" aria-label="Breadcrumb">
          <Link
            href="/"
            className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#211F1B]/40 hover:text-[#211F1B] transition-colors"
          >
            Home
          </Link>
          <span className="text-[#E3DED3] text-xs">/</span>
          <span className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#211F1B]">
            Checkout
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12">
        {/* Billing form */}
        <div>
          <p className="flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#211F1B]/45 mb-3">
            <Lock size={11} strokeWidth={2} aria-hidden="true" />
            Secure checkout
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-[#211F1B] mb-8">
            Your details.
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="First name" required>
                <input
                  required
                  value={form.first_name}
                  onChange={(e) => update("first_name", e.target.value)}
                  className="w-full bg-white border border-[#E3DED3] rounded-xl px-4 py-3 text-sm text-[#211F1B] placeholder:text-[#211F1B]/30 focus:outline focus:outline-2 focus:outline-offset-[-1px] focus:outline-[#211F1B] transition-colors"
                />
              </Field>
              <Field label="Last name" required>
                <input
                  required
                  value={form.last_name}
                  onChange={(e) => update("last_name", e.target.value)}
                  className="w-full bg-white border border-[#E3DED3] rounded-xl px-4 py-3 text-sm text-[#211F1B] placeholder:text-[#211F1B]/30 focus:outline focus:outline-2 focus:outline-offset-[-1px] focus:outline-[#211F1B] transition-colors"
                />
              </Field>
            </div>

            <Field label="Email" required>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full bg-white border border-[#E3DED3] rounded-xl px-4 py-3 text-sm text-[#211F1B] placeholder:text-[#211F1B]/30 focus:outline focus:outline-2 focus:outline-offset-[-1px] focus:outline-[#211F1B] transition-colors"
              />
            </Field>

            <Field label="Phone">
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="w-full bg-white border border-[#E3DED3] rounded-xl px-4 py-3 text-sm text-[#211F1B] placeholder:text-[#211F1B]/30 focus:outline focus:outline-2 focus:outline-offset-[-1px] focus:outline-[#211F1B] transition-colors"
              />
            </Field>

            <Field label="Address" required>
              <input
                required
                value={form.address_1}
                onChange={(e) => update("address_1", e.target.value)}
                className="w-full bg-white border border-[#E3DED3] rounded-xl px-4 py-3 text-sm text-[#211F1B] placeholder:text-[#211F1B]/30 focus:outline focus:outline-2 focus:outline-offset-[-1px] focus:outline-[#211F1B] transition-colors"
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="City" required>
                <input
                  required
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className="w-full bg-white border border-[#E3DED3] rounded-xl px-4 py-3 text-sm text-[#211F1B] placeholder:text-[#211F1B]/30 focus:outline focus:outline-2 focus:outline-offset-[-1px] focus:outline-[#211F1B] transition-colors"
                />
              </Field>
              <Field label="State" required>
                <select
                  required
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                  className="w-full bg-white border border-[#E3DED3] rounded-xl px-4 py-3 text-sm text-[#211F1B] placeholder:text-[#211F1B]/30 focus:outline focus:outline-2 focus:outline-offset-[-1px] focus:outline-[#211F1B] transition-colors"
                >
                  {AU_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Postcode" required>
                <input
                  required
                  value={form.postcode}
                  onChange={(e) => update("postcode", e.target.value)}
                  className="w-full bg-white border border-[#E3DED3] rounded-xl px-4 py-3 text-sm text-[#211F1B] placeholder:text-[#211F1B]/30 focus:outline focus:outline-2 focus:outline-offset-[-1px] focus:outline-[#211F1B] transition-colors"
                />
              </Field>
            </div>

            {error && (
              <div className="rounded-2xl border border-[#211F1B] bg-[#211F1B]/5 text-[#211F1B] text-sm px-4 py-3">
                <span className="font-semibold">Error —</span> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 rounded-full bg-[#211F1B] text-white py-4 px-8 text-sm font-semibold hover:bg-[#211F1B]/85 transition-colors duration-300 disabled:opacity-50"
            >
              {submitting ? "Redirecting to payment…" : `Continue to Payment — $${totalPrice.toFixed(2)}`}
            </button>
            <p className="flex items-center justify-center gap-1.5 text-[10px] text-[#211F1B]/40 text-center">
              <Lock size={10} strokeWidth={2} aria-hidden="true" />
              You&rsquo;ll complete payment securely on our payment provider&rsquo;s page.
            </p>
          </form>
        </div>

        {/* Order summary */}
        <div className="bg-[#FCFAF6] rounded-3xl shadow-card p-6 h-fit">
          <h2 className="font-mono text-xs tracking-[0.1em] uppercase text-[#211F1B]/60 mb-5">
            Order Summary
          </h2>
          <ul className="flex flex-col gap-4 mb-6">
            {items.map((item) => (
              <li key={item.slug} className="flex gap-3 items-center">
                <div className="relative w-14 h-14 flex-shrink-0 bg-white overflow-hidden rounded-xl">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#211F1B] truncate">{item.name}</p>
                  <p className="text-xs text-[#211F1B]/50">Qty {item.quantity}</p>
                </div>
                <span className="font-mono text-sm text-[#211F1B]">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[0.65rem] tracking-[0.08em] uppercase text-[#211F1B]/50">
              Shipping
            </span>
            <span className="font-mono text-xs uppercase text-[#211F1B]/60">Free</span>
          </div>

          <div className="border-t border-[#E3DED3]/60 pt-4 flex items-center justify-between mb-6">
            <span className="font-mono text-xs tracking-[0.1em] uppercase text-[#211F1B]/60">
              Total
            </span>
            <span className="font-serif text-2xl text-[#211F1B]">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          {/* Trust signals */}
          <div className="flex flex-col gap-2 border-t border-[#E3DED3]/60 pt-5">
            {["30-day risk-free returns", "12-month warranty", "Dispatched from Melbourne"].map(
              (signal) => (
                <div key={signal} className="flex items-center gap-2">
                  <span className="text-[#211F1B]/40 text-xs">◈</span>
                  <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-[#211F1B]/50">
                    {signal}
                  </span>
                </div>
              )
            )}
          </div>

          {/* Payment badges */}
          <div className="flex items-center gap-2 flex-wrap mt-5 pt-5 border-t border-[#E3DED3]/60">
            {["Visa", "Mastercard", "Apple Pay", "Afterpay"].map((method) => (
              <span
                key={method}
                className="font-mono text-[0.55rem] tracking-[0.08em] uppercase border border-[#E3DED3] text-[#211F1B]/40 px-2 py-1 rounded"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[0.65rem] tracking-[0.08em] uppercase text-[#211F1B]/60">
        {label}
        {required && <span className="text-[#211F1B]/40"> *</span>}
      </span>
      {children}
    </label>
  );
}
