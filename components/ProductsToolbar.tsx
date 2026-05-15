"use client";

import { ChevronDown, LayoutGrid, LayoutList } from "lucide-react";

interface Props {
  viewMode: "list" | "grid";
  onViewChange: (mode: "list" | "grid") => void;
}

export default function ProductsToolbar({ viewMode, onViewChange }: Props) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl px-4 h-[52px] flex items-center gap-4">

      {/* Left: item count */}
      <p className="flex-1 text-[13px] text-[#505050] whitespace-nowrap">
        12,911 items in{" "}
        <span className="font-semibold text-[#1C2434]">Mobile accessory</span>
      </p>

      {/* Right: controls */}
      <div className="flex items-center gap-3 shrink-0">

        {/* Verified only */}
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            className="w-[14px] h-[14px] accent-primary cursor-pointer"
          />
          <span className="text-[13px] text-[#505050] whitespace-nowrap select-none">
            Verified only
          </span>
        </label>

        {/* Featured dropdown */}
        <div className="relative">
          <select className="h-[34px] pl-3 pr-8 text-[13px] text-[#1C1C1C] bg-white border border-[#E5E7EB] rounded-lg appearance-none cursor-pointer outline-none focus:border-primary transition-colors">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest first</option>
          </select>
          <ChevronDown
            size={13}
            strokeWidth={2}
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8B96A5]"
          />
        </div>

        {/* Grid / List view toggle */}
        <div className="flex items-center border border-[#E5E7EB] rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => onViewChange("grid")}
            aria-label="Grid view"
            className={`w-[34px] h-[34px] flex items-center justify-center transition-colors ${
              viewMode === "grid"
                ? "bg-primary text-white"
                : "text-[#8B96A5] hover:bg-[#F5F5F5]"
            }`}
          >
            <LayoutGrid size={16} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={() => onViewChange("list")}
            aria-label="List view"
            className={`w-[34px] h-[34px] flex items-center justify-center border-l border-[#E5E7EB] transition-colors ${
              viewMode === "list"
                ? "bg-primary text-white"
                : "text-[#8B96A5] hover:bg-[#F5F5F5]"
            }`}
          >
            <LayoutList size={16} strokeWidth={1.8} />
          </button>
        </div>

      </div>
    </div>
  );
}
