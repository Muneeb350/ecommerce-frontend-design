"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { addToCart } from "@/lib/cart";

interface Props {
  id: number;
  title: string;
  price: number;
  src: string;
}

export default function ProductActions({ id, title, price, src }: Props) {
  const router = useRouter();
  const [toast, setToast] = useState(false);

  function handleAddToCart() {
    addToCart({ id, title, price, src });
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  }

  function handleBuyNow() {
    handleAddToCart();
    router.push("/cart");
  }

  return (
    <div className="flex flex-col gap-2 mt-4">

      {/* Size dropdown */}
      <div className="flex flex-col gap-1">
        <label htmlFor="size-select" className="text-[12px] font-medium text-[#8B96A5]">
          Select Size
        </label>
        <div className="relative">
          <select
            id="size-select"
            className="w-full h-[40px] pl-3 pr-8 text-[13px] text-[#1C2434] bg-white border border-[#DEE2E7] rounded-lg appearance-none outline-none focus:border-blue-500 transition-colors cursor-pointer"
          >
            <option value="">Choose a size…</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">Extra Large</option>
          </select>
          <svg
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8B96A5]"
            width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            aria-hidden
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Inline toast — appears for 2.5 s after adding */}
      {toast && (
        <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 text-green-700 text-[13px] font-medium rounded-lg">
          <CheckCircle2 size={14} strokeWidth={2} />
          Added to cart!
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleBuyNow}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 transition-all cursor-pointer"
        >
          Buy Now
        </button>
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-md font-semibold hover:bg-blue-50 transition-all cursor-pointer"
        >
          Add to Cart
        </button>
      </div>

    </div>
  );
}
