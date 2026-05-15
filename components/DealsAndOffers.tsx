"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/products";

/* ── Data ── */

/* Target date: 4 days from 2026-05-12 */
const TARGET = new Date("2026-05-16T12:00:00");

const DEALS = [
  { id: 3,  label: "Smart watches",  discount: "-25%" },
  { id: 2,  label: "Laptops",        discount: "-15%" },
  { id: 1,  label: "GoPro cameras",  discount: "-40%" },
  { id: 23, label: "Headphones",     discount: "-25%" },
  { id: 1,  label: "Canon cameras",  discount: "-25%" },
];

/* ── Helpers ── */

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
  return {
    days:  Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    mins:  Math.floor((diff % 3_600_000)  /    60_000),
    secs:  Math.floor((diff %    60_000)  /     1_000),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/* ── Component ── */

export default function DealsAndOffers() {
  /* Start with zeros so server HTML matches the initial client render */
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    /* Sync immediately after mount, then tick every second */
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { value: time.days,  label: "Days"  },
    { value: time.hours, label: "Hours" },
    { value: time.mins,  label: "Mins"  },
    { value: time.secs,  label: "Secs"  },
  ];

  return (
    <section className="w-full bg-[#F5F5F5]">
      <div className="max-w-[1280px] mx-auto px-6 py-6">
        <div className="flex border border-[#E5E7EB] rounded-xl overflow-hidden bg-white">

          {/* ── Left: countdown panel ──
               min-w-[260px] + shrink-0: 260px is the minimum needed to fit four
               42px boxes + three colons + gap-1.5 gaps within px-5 padding (220px
               content area) without the timer bleeding into the first product card.
          */}
          <div className="min-w-[260px] w-[260px] shrink-0 bg-[#EFF2F4] border-r border-[#E5E7EB] flex flex-col items-center justify-center gap-6 px-5 py-8">

            <div className="text-center">
              <h2 className="text-[17px] font-bold text-[#1C2434] leading-snug">
                Deals and<br />offers
              </h2>
              <p className="mt-1 text-[12px] text-[#8B96A5]">Hygiene equipments</p>
            </div>

            {/* Countdown boxes */}
            <div className="flex items-start gap-1.5">
              {units.map(({ value, label }, i) => (
                <div key={label} className="flex items-start gap-1.5">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-[42px] h-[42px] rounded-lg bg-[#1C2434] flex items-center justify-center">
                      <span className="text-[15px] font-bold text-white tabular-nums leading-none">
                        {pad(value)}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#8B96A5] leading-none">{label}</span>
                  </div>
                  {/* colon separator — hidden after last unit */}
                  {i < units.length - 1 && (
                    <span className="text-[#1C2434] font-bold text-[15px] mt-[10px] leading-none select-none">
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: product cards ── */}
          <div className="flex flex-1 min-w-0 divide-x divide-[#E5E7EB]">
            {DEALS.map(({ id, label, discount }) => {
              const product = PRODUCTS.find((p) => p.id === id);
              const src = product?.src ?? "";
              const alt = product?.alt ?? label;

              return (
                <Link
                  key={label}
                  href={`/products/${id}`}
                  className="relative flex-1 flex flex-col items-center justify-center gap-3 px-3 py-6 hover:bg-[#EFF2F4] transition-colors group"
                >
                  {/* Discount badge */}
                  <span className="absolute top-3 left-3 bg-[#FF4040] text-white text-[10px] font-semibold px-[7px] py-[3px] rounded-sm leading-none">
                    {discount}
                  </span>

                  {/* Product image */}
                  <div className="relative w-[110px] h-[110px]">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain"
                    />
                  </div>

                  {/* Label */}
                  <p className="text-[12px] text-[#1C1C1C] font-medium text-center leading-snug group-hover:text-primary transition-colors">
                    {label}
                  </p>
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
