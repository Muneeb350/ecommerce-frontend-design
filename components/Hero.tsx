"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Car,
  ShoppingBag,
  Home,
  Monitor,
  Wrench,
  Activity,
  Heart,
  Settings,
  LayoutGrid,
  ChevronRight,
  User,
} from "lucide-react";

/* ── Data ── */

const CATEGORIES = [
  { icon: Car,         label: "Automobiles" },
  { icon: ShoppingBag, label: "Clothes and wear" },
  { icon: Home,        label: "Home interiors" },
  { icon: Monitor,     label: "Computer and tech" },
  { icon: Wrench,      label: "Tools, equipments" },
  { icon: Activity,    label: "Sports and outdoor" },
  { icon: Heart,       label: "Animal and pets" },
  { icon: Settings,    label: "Machinery tools" },
  { icon: LayoutGrid,  label: "More category" },
];

/* ── Component ── */

export default function Hero() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-[1280px] mx-auto px-6 py-4">

        {/*
          Three equal-gap columns.
          Sidebar height controls the row; banner + cards stretch to match.
        */}
        <div className="flex gap-4">

          {/* ── Left: Category sidebar ── */}
          <aside className="hidden lg:block w-[190px] shrink-0 bg-white border border-[#E5E7EB] rounded overflow-hidden self-stretch">
            <ul className="divide-y divide-[#F0F0F0]">
              {CATEGORIES.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-[9px] text-[13px] text-[#1C1C1C] hover:bg-[#EFF2F4] hover:text-primary transition-colors group"
                  >
                    <Icon
                      size={16}
                      strokeWidth={1.8}
                      className="text-[#8B96A5] group-hover:text-primary shrink-0 transition-colors"
                    />
                    <span className="flex-1 truncate leading-tight">{label}</span>
                    <ChevronRight
                      size={13}
                      strokeWidth={2}
                      className="text-[#C5CCD6] shrink-0"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* ── Center: Hero banner ── */}
          {/*
            bg-[#C2EDEA] = the mint-teal of the photo, used as a loading fallback
            so there is no flash of white before the image paints.
            No color overlay — the image is shown as-is per the design.
          */}
          <div className="flex-1 min-h-[260px] rounded-xl overflow-hidden relative flex items-center bg-[#C2EDEA]">

            {/* Photo — fills container, no overlay */}
            <Image
              src="/assets/15bee8c1b9d77e50133ea130b3270887efd96310.png"
              alt="Headphones and laptop — latest trending electronic items"
              fill
              className="object-cover object-center"
              priority
            />

            {/* Text — dark navy against the light teal image background */}
            <div className="relative z-10 pl-10 pr-4 py-8">
              <p className="text-[13px] text-[#606060] mb-1 tracking-wide">
                Latest trending
              </p>
              <h2 className="text-[30px] font-bold text-[#1C2434] leading-[1.2] mb-5">
                Electronic
                <br />
                items
              </h2>
              <Link
                href="/products"
                className="inline-block px-5 py-[7px] border border-[#1C2434] text-[#1C2434] text-[13px] font-medium rounded hover:bg-[#1C2434] hover:text-white hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                Learn more
              </Link>
            </div>
          </div>

          {/* ── Right: Stacked promo cards ── */}
          <div className="hidden lg:flex w-[190px] shrink-0 flex-col gap-3 self-stretch">

            {/* Card 1 — Hi, user (white) */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-3 flex items-start gap-3 shrink-0">
              <div className="w-10 h-10 rounded-full bg-[#EFF2F4] flex items-center justify-center shrink-0">
                <User size={18} strokeWidth={1.8} className="text-[#8B96A5]" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#8B96A5] leading-tight">Hi, user</p>
                <p className="text-[11px] font-semibold text-[#1C2434] leading-snug mt-0.5">
                  let's get started
                </p>
                <a
                  href="#"
                  className="mt-2 inline-block px-4 py-1 bg-primary hover:bg-primary-hover text-white text-[11px] font-medium rounded transition-colors"
                >
                  Join now
                </a>
              </div>
            </div>

            {/* Card 2 — Orange promo (#FA8232, solid — no matching asset found) */}
            <div className="flex-1 bg-[#FA8232] rounded-xl p-4 flex flex-col justify-between overflow-hidden">
              <div>
                <p className="text-white/80 text-[11px] leading-tight">Get US $10 off</p>
                <p className="text-white font-bold text-[13px] leading-snug mt-0.5">
                  on best deals
                </p>
              </div>
              <a
                href="#"
                className="self-start mt-3 px-3 py-1.5 bg-white text-[#FA8232] text-[11px] font-bold rounded hover:bg-orange-50 transition-colors"
              >
                Explore
              </a>
            </div>

            {/* Card 3 — Teal promo (#0D8A6A, solid — no matching asset found) */}
            <div className="flex-1 bg-[#0D8A6A] rounded-xl p-4 flex flex-col justify-between overflow-hidden">
              <div>
                <p className="text-white font-bold text-[13px] leading-snug">
                  Send quote with
                </p>
                <p className="text-white/75 text-[11px] leading-snug mt-0.5">
                  supplier preferences
                </p>
              </div>
              <a
                href="#"
                className="self-start mt-3 px-3 py-1.5 bg-white/25 hover:bg-white/35 text-white text-[11px] font-medium rounded transition-colors"
              >
                Send inquiry
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
