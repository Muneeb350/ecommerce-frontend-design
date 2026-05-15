"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { PRODUCTS } from "@/lib/products";

/* ── Derived from central catalog — always in sync ── */

const CATEGORIES = [...new Set(PRODUCTS.map((p) => p.category))].sort();
const BRANDS     = [...new Set(PRODUCTS.map((p) => p.brand))].sort();
const FEATURES   = ["Metallic", "Plastic cover", "8GB Ram", "Super power", "Large Memory"];
const CONDITIONS = ["Any", "Refurbished", "Brand new", "Old items"] as const;

/* ── Section wrapper ── */

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-t border-[#E5E7EB] px-4 py-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <span className="text-[13px] font-semibold text-[#1C2434]">{title}</span>
        {open
          ? <ChevronUp   size={15} strokeWidth={2} className="text-[#8B96A5] shrink-0" />
          : <ChevronDown size={15} strokeWidth={2} className="text-[#8B96A5] shrink-0" />
        }
      </button>
      {open && children}
    </div>
  );
}

/* ── Star graphic ── */

function Stars({ count }: { count: number }) {
  return (
    <span className="flex items-center gap-[2px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={i < count ? "#FF9017" : "none"}
          stroke={i < count ? "#FF9017" : "#C5CCD6"}
          strokeWidth="1.5"
          aria-hidden
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}

/* ── Props ── */

interface Props {
  selectedBrands: Set<string>;
  onBrandToggle: (brand: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
}

/* ── Main component ── */

export default function SidebarFilters({ selectedBrands, onBrandToggle, selectedCategory, onCategoryChange }: Props) {
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("999999");

  return (
    <aside className="w-[220px] shrink-0 bg-white border border-[#E5E7EB] rounded-xl overflow-hidden self-start">

      {/* ── Category ── */}
      <FilterSection title="Category">
        <ul className="flex flex-col gap-2">
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <button
                type="button"
                onClick={() => onCategoryChange(cat)}
                className={`text-left text-[13px] transition-colors ${
                  selectedCategory === cat
                    ? "text-primary font-semibold"
                    : "text-[#505050] hover:text-primary"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </FilterSection>

      {/* ── Brands ── */}
      <FilterSection title="Brands">
        <ul className="flex flex-col gap-2">
          {BRANDS.map((brand) => (
            <li key={brand} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`brand-${brand}`}
                checked={selectedBrands.has(brand)}
                onChange={() => onBrandToggle(brand)}
                className="w-[14px] h-[14px] accent-primary cursor-pointer shrink-0"
              />
              <label
                htmlFor={`brand-${brand}`}
                className="text-[13px] text-[#505050] cursor-pointer select-none"
              >
                {brand}
              </label>
            </li>
          ))}
        </ul>
        <a href="#" className="mt-3 inline-block text-[12px] text-primary hover:underline">
          See all
        </a>
      </FilterSection>

      {/* ── Features ── */}
      <FilterSection title="Features">
        <ul className="flex flex-col gap-2">
          {FEATURES.map((feat) => (
            <li key={feat} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`feat-${feat}`}
                className="w-[14px] h-[14px] accent-primary cursor-pointer shrink-0"
              />
              <label
                htmlFor={`feat-${feat}`}
                className="text-[13px] text-[#505050] cursor-pointer select-none"
              >
                {feat}
              </label>
            </li>
          ))}
        </ul>
        <a href="#" className="mt-3 inline-block text-[12px] text-primary hover:underline">
          See all
        </a>
      </FilterSection>

      {/* ── Price range ── */}
      <FilterSection title="Price range">
        <input
          type="range"
          min={0}
          max={999999}
          defaultValue={600000}
          className="w-full accent-primary cursor-pointer"
        />
        <div className="flex gap-2 mt-3">
          <div className="flex-1">
            <label className="text-[11px] text-[#8B96A5] block mb-1">Min</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="0"
              className="w-full h-[32px] px-2 text-[12px] text-[#1C1C1C] border border-[#E5E7EB] rounded outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="flex-1">
            <label className="text-[11px] text-[#8B96A5] block mb-1">Max</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="999999"
              className="w-full h-[32px] px-2 text-[12px] text-[#1C1C1C] border border-[#E5E7EB] rounded outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
        <button
          type="button"
          className="mt-3 w-full h-[32px] border border-[#E5E7EB] rounded text-[13px] text-[#505050] hover:border-primary hover:text-primary transition-colors cursor-pointer"
        >
          Apply
        </button>
      </FilterSection>

      {/* ── Condition ── */}
      <FilterSection title="Condition">
        <ul className="flex flex-col gap-2">
          {CONDITIONS.map((cond, i) => (
            <li key={cond} className="flex items-center gap-2">
              <input
                type="radio"
                id={`cond-${cond}`}
                name="condition"
                defaultChecked={i === 0}
                className="w-[14px] h-[14px] accent-primary cursor-pointer shrink-0"
              />
              <label
                htmlFor={`cond-${cond}`}
                className="text-[13px] text-[#505050] cursor-pointer select-none"
              >
                {cond}
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>

      {/* ── Ratings ── */}
      <FilterSection title="Ratings">
        <ul className="flex flex-col gap-2">
          {[5, 4, 3, 2].map((n) => (
            <li key={n} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`rating-${n}`}
                className="w-[14px] h-[14px] accent-primary cursor-pointer shrink-0"
              />
              <label htmlFor={`rating-${n}`} className="flex items-center cursor-pointer">
                <Stars count={n} />
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>

    </aside>
  );
}
