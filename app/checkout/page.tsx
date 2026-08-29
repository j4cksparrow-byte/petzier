"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
        <p className="text-[#22211E]/60 text-sm">Your cart is empty.</p>
        <Link
          href="/#products"
          className="font-mono text-xs tracking-[0.1em] uppercase bg-[#4A5842] text-[#EDE8DE] px-5 py-3 hover:bg-[#22211E] transition-colors"
        >
          Browse Products
        </Link>
      </section>
    );
  }

  return (
    <section className="pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12">
        {/* Billing form */}
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#22211E] mb-8">
            Checkout
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="First name" required>
                <input
                  required
                  value={form.first_name}
                  onChange={(e) => update("first_name", e.target.value)}
                  className="checkout-input"
                />
              </Field>
              <Field label="Last name" required>
                <input
                  required
                  value={form.last_name}
                  onChange={(e) => update("last_name", e.target.value)}
                  className="checkout-input"
                />
              </Field>
            </div>

            <Field label="Email" required>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="checkout-input"
              />
            </Field>

            <Field label="Phone">
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="checkout-input"
              />
            </Field>

            <Field label="Address" required>
              <input
                required
                value={form.address_1}
                onChange={(e) => update("address_1", e.target.value)}
                className="checkout-input"
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="City" required>
                <input
                  required
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className="checkout-input"
                />
              </Field>
              <Field label="State" required>
                <select
                  required
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                  className="checkout-input"
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
                  className="checkout-input"
                />
              </Field>
            </div>

            {error && (
              <div className="border border-[#A8503E] bg-[#A8503E]/10 text-[#A8503E] text-sm px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 bg-[#A8503E] text-[#EDE8DE] py-4 px-8 text-sm font-semibold hover:bg-[#22211E] transition-colors duration-300 disabled:opacity-50"
            >
              {submitting ? "Redirecting to payment…" : `Continue to Payment — $${totalPrice.toFixed(2)}`}
            </button>
            <p className="text-[10px] text-[#22211E]/40 text-center">
              You'll complete payment securely on our payment provider's page.
            </p>
          </form>
        </div>

        {/* Order summary */}
        <div className="bg-[#22211E]/[0.03] border border-[#B5A48C]/40 p-6 h-fit">
          <h2 className="font-mono text-xs tracking-[0.1em] uppercase text-[#22211E]/60 mb-5">
            Order Summary
          </h2>
          <ul className="flex flex-col gap-4 mb-6">
            {items.map((item) => (
              <li key={item.slug} className="flex gap-3 items-center">
                <div className="relative w-14 h-14 flex-shrink-0 bg-white overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#22211E] truncate">{item.name}</p>
                  <p className="text-xs text-[#22211E]/50">Qty {item.quantity}</p>
                </div>
                <span className="font-mono text-sm text-[#22211E]">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-[#B5A48C]/40 pt-4 flex items-center justify-between">
            <span className="font-mono text-xs tracking-[0.1em] uppercase text-[#22211E]/60">
              Total
            </span>
            <span className="font-mono text-xl font-semibold text-[#22211E]">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .checkout-input {
          width: 100%;
          background: #fff;
          border: 1px solid #B5A48C;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: #22211E;
        }
        .checkout-input:focus {
          outline: 2px solid #4A5842;
          outline-offset: -1px;
        }
      `}</style>
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
      <span className="font-mono text-[0.65rem] tracking-[0.08em] uppercase text-[#22211E]/60">
        {label}
        {required && <span className="text-[#A8503E]"> *</span>}
      </span>
      {children}
    </label>
  );
}
