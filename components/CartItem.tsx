"use client";

import Image from "next/image";

export interface CartItemData {
  id: number;
  title: string;
  src: string;
  alt: string;
  price: number;
  size: string;
  color: string;
  material: string;
  seller: string;
  qty: number;
}

interface Props {
  item: CartItemData;
  isLast?: boolean;
}

export default function CartItem({ item, isLast }: Props) {
  return (
    <div className={`flex flex-col sm:flex-row items-start gap-4 py-4 ${!isLast ? "border-b border-[#E5E7EB]" : ""}`}>

      {/* Product image — full-width on mobile, fixed square on sm+ */}
      <div className="relative w-full h-[180px] sm:w-[80px] sm:h-[80px] shrink-0 border border-[#E5E7EB] rounded-lg bg-[#F7F7F7] overflow-hidden">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 100vw, 80px"
          className="object-contain p-2"
        />
      </div>

      {/* Center: title, meta, action links */}
      <div className="flex-1 min-w-0 flex flex-col gap-1 w-full">
        <p className="text-[13px] font-semibold text-[#1C2434] leading-snug">
          {item.title}
        </p>
        <p className="text-[12px] text-[#8B96A5]">
          Size: {item.size}, Color: {item.color}, Material: {item.material}
        </p>
        <p className="text-[12px] text-[#8B96A5]">Seller: {item.seller}</p>

        <div className="flex items-center gap-3 mt-2">
          <button type="button" className="text-[12px] text-[#FA3434] hover:underline cursor-pointer">
            Remove
          </button>
          <button type="button" className="text-[12px] text-primary hover:underline cursor-pointer">
            Save for later
          </button>
        </div>
      </div>

      {/* Right: price + qty — row on mobile (spread across full width), column on sm+ */}
      <div className="flex flex-row items-center justify-between w-full sm:w-auto sm:flex-col sm:items-end gap-2.5 shrink-0">
        <p className="text-[15px] font-bold text-[#1C2434]">
          ${item.price.toFixed(2)}
        </p>

        <div className="relative">
          <select
            defaultValue={item.qty}
            className="h-[36px] pl-3 pr-7 text-[12px] text-[#1C2434] border border-[#E5E7EB] rounded-lg appearance-none bg-white cursor-pointer outline-none focus:border-primary transition-colors"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>Qty: {n}</option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#8B96A5]"
            width="11" height="11" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

    </div>
  );
}
