import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Shield, Headphones, Truck, ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartItem, { type CartItemData } from "@/components/CartItem";
import { PRODUCTS } from "@/lib/products";

const p15 = PRODUCTS.find((p) => p.id === 15)!;
const p19 = PRODUCTS.find((p) => p.id === 19)!;
const p10 = PRODUCTS.find((p) => p.id === 10)!;

const SAVED_PRODUCTS = [
  PRODUCTS.find((p) => p.id === 4)!,
  PRODUCTS.find((p) => p.id === 21)!,
  PRODUCTS.find((p) => p.id === 3)!,
  PRODUCTS.find((p) => p.id === 2)!,
];

const CART_ITEMS: CartItemData[] = [
  {
    id: 15,
    title: "T-shirts with multiple colors, for men and lady",
    src: p15.src,
    alt: p15.alt,
    price: 78.99,
    size: "medium",
    color: "blue",
    material: "Plastic",
    seller: "Artel Market",
    qty: 9,
  },
  {
    id: 19,
    title: "Denim Drawstring Backpack — Light Blue",
    src: p19.src,
    alt: p19.alt,
    price: 39.00,
    size: "one size",
    color: "blue",
    material: "Denim",
    seller: "Best factory LLC",
    qty: 3,
  },
  {
    id: 10,
    title: "Stone-Base Table Lamp — Linen Shade, Warm White",
    src: p10.src,
    alt: p10.alt,
    price: 170.50,
    size: "30 cm",
    color: "beige",
    material: "Stone / Linen",
    seller: "Artel Market",
    qty: 1,
  },
];

export default function CartPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-[#F7FAFC]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-6 pb-10">

          {/* Heading */}
          <h1 className="text-[20px] font-bold text-[#1C2434] mb-5">
            My cart ({CART_ITEMS.length})
          </h1>

          {/* Two-column layout — stacks on mobile, side-by-side on lg+ */}
          <div className="flex flex-col lg:flex-row gap-5 items-start">

            {/* ── Left: cart items ── */}
            <div className="w-full flex-1 min-w-0 flex flex-col gap-4">

              {/* Items card */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl px-4 sm:px-5">
                {CART_ITEMS.map((item, i) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    isLast={i === CART_ITEMS.length - 1}
                  />
                ))}
              </div>

              {/* Bottom action row */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Link
                  href="/products"
                  className="flex items-center gap-2 h-[42px] px-5 border border-primary text-primary text-[13px] font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  <ArrowLeft size={15} strokeWidth={2.5} />
                  Back to shop
                </Link>
                <button
                  type="button"
                  className="text-[13px] text-primary hover:underline cursor-pointer"
                >
                  Remove all
                </button>
              </div>
            </div>

            {/* ── Right: checkout summary ── */}
            <div className="w-full lg:w-[300px] lg:shrink-0 lg:sticky lg:top-6 flex flex-col gap-3">

              {/* Card 1 — Coupon */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex flex-col gap-3">
                <p className="text-[13px] font-semibold text-[#1C2434]">Have a coupon?</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Add coupon code"
                    className="flex-1 h-[42px] px-3 text-[12px] text-[#1C2434] border border-[#E5E7EB] rounded-lg bg-[#F7FAFC] outline-none focus:border-primary transition-colors placeholder:text-[#8B96A5]"
                  />
                  <button
                    type="button"
                    className="w-full sm:w-auto h-[42px] px-5 bg-white border border-primary text-primary text-[12px] font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Card 2 — Summary */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 flex flex-col gap-3">

                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-[#8B96A5]">Subtotal:</span>
                    <span className="text-[#1C2434] font-medium">$1403.97</span>
                  </div>
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-[#8B96A5]">Discount:</span>
                    <span className="text-[#FA3434] font-medium">-$60.00</span>
                  </div>
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-[#8B96A5]">Tax:</span>
                    <span className="text-[#00B517] font-medium">+$14.00</span>
                  </div>
                </div>

                <div className="border-t border-[#E5E7EB]" />

                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-semibold text-[#1C2434]">Total:</span>
                  <span className="text-[20px] font-bold text-[#1C2434]">$1357.97</span>
                </div>

                <button
                  type="button"
                  className="w-full h-[48px] bg-[#00B517] hover:bg-[#009914] text-white text-[14px] font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Checkout
                </button>

                {/* Payment icons */}
                <div className="flex items-center justify-center gap-1.5 pt-1 flex-wrap">
                  {[
                    { label: "Amex",   bg: "#2E77BC", text: "AMEX"   },
                    { label: "Master", bg: "#EB001B", text: "MC"      },
                    { label: "PayPal", bg: "#009CDE", text: "PayPal"  },
                    { label: "Visa",   bg: "#1A1F71", text: "VISA"    },
                    { label: "Apple",  bg: "#1C1C1C", text: "  Pay"   },
                  ].map(({ label, bg, text }) => (
                    <span
                      key={label}
                      style={{ backgroundColor: bg }}
                      className="w-[38px] h-[22px] rounded flex items-center justify-center text-white text-[8px] font-bold tracking-wide shrink-0"
                    >
                      {text}
                    </span>
                  ))}
                </div>

              </div>
            </div>

          </div>

          {/* Trust badges — 1 col on mobile, 3 on sm+ */}
          <div className="mt-8 bg-white border border-[#E5E7EB] rounded-xl p-6 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E7EB]">
            {[
              { Icon: Shield,     label: "Secure payment",   sub: "Have you ever finally just" },
              { Icon: Headphones, label: "Customer support", sub: "Have you ever finally just" },
              { Icon: Truck,      label: "Free delivery",    sub: "Have you ever finally just" },
            ].map(({ Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 px-6 py-4 sm:py-0 first:pl-0 last:pr-0 first:pt-0 last:pb-0">
                <Icon size={28} strokeWidth={1.4} className="text-[#8B96A5] shrink-0" />
                <div>
                  <p className="text-[13px] font-semibold text-[#1C2434]">{label}</p>
                  <p className="text-[12px] text-[#8B96A5] mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Saved for later — 2-col on mobile, 4-col on md+ */}
          <section className="mt-8">
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-5">
              <h2 className="text-[16px] font-bold text-[#1C2434] mb-4">Saved for later</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {SAVED_PRODUCTS.map((p) => (
                  <div
                    key={p.id}
                    className="border border-[#E5E7EB] rounded-xl overflow-hidden flex flex-col"
                  >
                    <div className="relative h-[140px] sm:h-[160px] bg-[#F7F7F7] shrink-0">
                      <Image
                        src={p.src}
                        alt={p.alt}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 280px"
                        className="object-contain p-4 sm:p-5"
                      />
                    </div>

                    <div className="p-3 flex flex-col gap-1.5 flex-1">
                      <p className="text-[13px] sm:text-[14px] font-bold text-[#1C2434]">
                        ${p.price.toFixed(2)}
                      </p>
                      <p className="text-[11px] sm:text-[12px] text-[#505565] leading-snug line-clamp-2 flex-1">
                        {p.title}
                      </p>
                      <button
                        type="button"
                        className="mt-2 flex items-center justify-center gap-1.5 h-[36px] sm:h-[34px] border border-primary text-primary text-[12px] font-medium rounded-lg hover:bg-primary hover:text-white transition-colors cursor-pointer w-full"
                      >
                        <ShoppingCart size={13} strokeWidth={2} />
                        Move to cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Promo banner — stacks on mobile */}
          <div className="mt-8 rounded-xl bg-gradient-to-r from-[#1C3FAA] to-[#2563EB] px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-white font-bold text-[16px] sm:text-[18px] leading-snug">
                Super discount on more than 100 USD
              </p>
              <p className="text-[#BFCFFF] text-[13px] mt-1">
                Have you ever finally just write dummy info
              </p>
            </div>
            <button
              type="button"
              className="w-full sm:w-auto shrink-0 h-[42px] px-6 bg-[#FF9017] hover:bg-[#F07C00] text-white text-[13px] font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Shop now
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
