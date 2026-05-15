"use client";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  return (
    <div className="flex items-center justify-between bg-white border border-[#E5E7EB] rounded-xl px-4 h-[52px]">

      {/* Show N — visual indicator, matches ITEMS_PER_PAGE */}
      <div className="flex items-center gap-2">
        <span className="text-[13px] text-[#505050]">Show</span>
        <div className="relative">
          <select className="h-[32px] pl-3 pr-7 text-[13px] text-[#1C1C1C] bg-white border border-[#E5E7EB] rounded-lg appearance-none cursor-pointer outline-none focus:border-primary transition-colors">
            <option>6</option>
            <option>12</option>
            <option>24</option>
          </select>
          <ChevronDown
            size={12}
            strokeWidth={2}
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#8B96A5]"
          />
        </div>
      </div>

      {/* Page controls */}
      <div className="flex items-center gap-1">

        {/* Previous */}
        <button
          type="button"
          aria-label="Previous page"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="w-[34px] h-[34px] flex items-center justify-center rounded-lg border border-[#E5E7EB] text-[#8B96A5] hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={15} strokeWidth={2} />
        </button>

        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            aria-label={`Page ${n}`}
            aria-current={page === n ? "page" : undefined}
            onClick={() => onPageChange(n)}
            className={`w-[34px] h-[34px] flex items-center justify-center rounded-lg text-[13px] font-medium border transition-colors ${
              page === n
                ? "bg-primary border-primary text-white"
                : "border-[#E5E7EB] text-[#505050] hover:border-primary hover:text-primary"
            }`}
          >
            {n}
          </button>
        ))}

        {/* Next */}
        <button
          type="button"
          aria-label="Next page"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="flex items-center gap-1 px-3 h-[34px] rounded-lg border border-[#E5E7EB] text-[13px] font-medium text-[#505050] hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight size={14} strokeWidth={2} />
        </button>

      </div>
    </div>
  );
}
