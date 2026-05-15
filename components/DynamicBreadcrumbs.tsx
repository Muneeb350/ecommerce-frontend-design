"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function DynamicBreadcrumbs() {
  const params = useSearchParams();
  const category = params.get("category");

  return (
    <nav className="flex items-center gap-1.5 text-[13px] mb-5" aria-label="Breadcrumb">
      <Link href="/" className="text-[#1C7ACC] hover:underline">Home</Link>
      <span className="text-[#8B96A5]">&rsaquo;</span>
      {category ? (
        <span className="text-[#1C2434] font-medium">{category}</span>
      ) : (
        <>
          <Link href="/products" className="text-[#1C7ACC] hover:underline">Clothings</Link>
          <span className="text-[#8B96A5]">&rsaquo;</span>
          <Link href="/products" className="text-[#1C7ACC] hover:underline">Men&apos;s wear</Link>
          <span className="text-[#8B96A5]">&rsaquo;</span>
          <span className="text-[#1C2434] font-medium">Summer clothing</span>
        </>
      )}
    </nav>
  );
}
