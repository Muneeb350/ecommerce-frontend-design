"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import SidebarFilters from "@/components/SidebarFilters";
import ProductsToolbar from "@/components/ProductsToolbar";
import FilterTagsBar from "@/components/FilterTagsBar";
import ProductListItem, { type ProductListItemProps } from "@/components/ProductListItem";
import ProductGridItem from "@/components/ProductGridItem";
import Pagination from "@/components/Pagination";

interface Props {
  products: ProductListItemProps[];
}

export default function ProductsMain({ products }: Props) {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const urlCategory = searchParams.get("category") ?? "";

  const [viewMode, setViewMode]             = useState<"list" | "grid">("list");
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery]       = useState("");

  /* ── Brand toggle ── */
  const toggleBrand = (brand: string) =>
    setSelectedBrands((prev) => {
      const next = new Set(prev);
      next.has(brand) ? next.delete(brand) : next.add(brand);
      return next;
    });

  /* ── Category toggle — writes to URL ── */
  const handleCategoryChange = (cat: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (urlCategory === cat) {
      next.delete("category");
    } else {
      next.set("category", cat);
    }
    const qs = next.toString();
    router.push(`/products${qs ? `?${qs}` : ""}`);
  };

  /* ── Clear all filters ── */
  const clearAll = () => {
    setSelectedBrands(new Set());
    const next = new URLSearchParams(searchParams.toString());
    next.delete("category");
    const qs = next.toString();
    router.push(`/products${qs ? `?${qs}` : ""}`);
  };

  /* ── Tags shown = selected brands ── */
  const tags = Array.from(selectedBrands);

  /* ── Filtered product list ── */
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

  return (
    <div className="flex gap-5 items-start">

      {/* Sidebar — hidden on mobile */}
      <div className="hidden lg:block shrink-0">
        <SidebarFilters
          selectedBrands={selectedBrands}
          onBrandToggle={toggleBrand}
          selectedCategory={urlCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Right column */}
      <div className="flex-1 min-w-0 flex flex-col gap-4">

        {/* Search */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B96A5] pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
            {filtered.map((p) => <ProductListItem key={p.id} {...p} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p) => <ProductGridItem key={p.id} {...p} />)}
          </div>
        )}

        <Pagination />

      </div>
    </div>
  );
}
