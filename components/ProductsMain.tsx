"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import SidebarFilters from "@/components/SidebarFilters";
import ProductsToolbar from "@/components/ProductsToolbar";
import FilterTagsBar from "@/components/FilterTagsBar";
import ProductListItem, { type ProductListItemProps } from "@/components/ProductListItem";
import ProductGridItem from "@/components/ProductGridItem";
import Pagination from "@/components/Pagination";

const ITEMS_PER_PAGE = 6;

interface Props {
  products: ProductListItemProps[];
}

export default function ProductsMain({ products }: Props) {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const urlCategory = searchParams.get("category") ?? "";

  const [viewMode, setViewMode]             = useState<"list" | "grid">("grid");
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery]       = useState("");
  const [currentPage, setCurrentPage]       = useState(1);
  const [filterOpen, setFilterOpen]         = useState(false);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => {
      const next = new Set(prev);
      next.has(brand) ? next.delete(brand) : next.add(brand);
      return next;
    });
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (urlCategory === cat) {
      next.delete("category");
    } else {
      next.set("category", cat);
    }
    const qs = next.toString();
    router.push(`/products${qs ? `?${qs}` : ""}`);
    setCurrentPage(1);
  };

  const clearAll = () => {
    setSelectedBrands(new Set());
    setCurrentPage(1);
    const next = new URLSearchParams(searchParams.toString());
    next.delete("category");
    const qs = next.toString();
    router.push(`/products${qs ? `?${qs}` : ""}`);
  };

  const tags = Array.from(selectedBrands);

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        const matchesSearch =
          !searchQuery ||
          p.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesBrand =
          selectedBrands.size === 0 || selectedBrands.has(p.brand);
        const matchesCategory =
          !urlCategory || p.category === urlCategory;
        return matchesSearch && matchesBrand && matchesCategory;
      }),
    [products, searchQuery, selectedBrands, urlCategory]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage   = Math.min(currentPage, totalPages);
  const paginated  = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  const sidebarProps = {
    selectedBrands,
    onBrandToggle: toggleBrand,
    selectedCategory: urlCategory,
    onCategoryChange: handleCategoryChange,
  };

  return (
    <div className="flex gap-5 items-start">

      {/* Sidebar — desktop only, fixed width */}
      <div className="hidden lg:block w-[220px] shrink-0">
        <SidebarFilters {...sidebarProps} />
      </div>

      {/* Right column — always full width on mobile */}
      <div className="flex-1 min-w-0 flex flex-col gap-4">

        {/* Mobile filter toggle button */}
        <button
          type="button"
          onClick={() => setFilterOpen((o) => !o)}
          className="lg:hidden flex items-center gap-2 h-[42px] px-4 bg-white border border-[#E5E7EB] rounded-xl text-[13px] font-medium text-[#1C2434] hover:border-primary transition-colors cursor-pointer"
        >
          <SlidersHorizontal size={15} strokeWidth={2} />
          {filterOpen ? "Hide filters" : "Show filters"}
        </button>

        {/* Mobile filter drawer */}
        {filterOpen && (
          <div className="lg:hidden">
            <SidebarFilters {...sidebarProps} />
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B96A5] pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search products…"
            className="w-full h-[42px] pl-9 pr-4 text-[13px] text-[#1C1C1C] placeholder:text-[#8B96A5] bg-white border border-[#E5E7EB] rounded-xl outline-none focus:border-primary transition-colors"
          />
        </div>

        <ProductsToolbar viewMode={viewMode} onViewChange={setViewMode} />

        {tags.length > 0 && (
          <FilterTagsBar tags={tags} onRemove={toggleBrand} onClear={clearAll} />
        )}

        {/* Product list / grid */}
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center h-[200px] bg-white border border-[#E5E7EB] rounded-xl">
            <p className="text-[14px] text-[#8B96A5]">No products match your filters.</p>
          </div>
        ) : viewMode === "list" ? (
          <div className="flex flex-col gap-4">
            {paginated.map((p) => <ProductListItem key={p.id} {...p} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginated.map((p) => <ProductGridItem key={p.id} {...p} />)}
          </div>
        )}

        <Pagination
          page={safePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

      </div>
    </div>
  );
}
