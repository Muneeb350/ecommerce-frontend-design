import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/products";

/* ── Types ── */

export interface GridProduct {
  id: number;
  label: string;
}

interface CategoryGridProps {
  title: string;
  bannerSrc: string;
  bannerAlt: string;
  products: readonly [
    GridProduct, GridProduct, GridProduct, GridProduct,
    GridProduct, GridProduct, GridProduct, GridProduct,
  ];
}

/* ── Component ── */

export default function CategoryGrid({
  title,
  bannerSrc,
  bannerAlt,
  products,
}: CategoryGridProps) {
  return (
    <section className="w-full bg-[#F5F5F5]">
      <div className="max-w-[1280px] mx-auto px-6 py-6">

        {/* Section header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[16px] font-semibold text-[#1C2434]">{title}</h2>
          <a href="#" className="text-[13px] text-primary hover:underline">
            View all
          </a>
        </div>

        {/* Card container */}
        <div className="flex border border-[#E5E7EB] rounded-xl overflow-hidden bg-white">

          {/* Left: banner */}
          <div className="relative shrink-0 w-[230px] min-h-[260px] self-stretch">
            <Image
              src={bannerSrc}
              alt={bannerAlt}
              fill
              sizes="230px"
              className="object-cover object-center"
            />
            {/* Gradient for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <p className="text-white font-bold text-[15px] leading-snug mb-3">
                {title}
              </p>
              <Link
                href="/products"
                className="inline-block px-4 py-[6px] bg-white text-[#1C1C1C] text-[12px] font-semibold rounded hover:bg-[#F0F0F0] transition-colors"
              >
                Source now
              </Link>
            </div>
          </div>

          {/* Right: 2 × 4 product grid */}
          <div className="flex-1 border-l border-[#E5E7EB] flex flex-col min-w-0">

            {/* Row 1 */}
            <div className="flex flex-1 divide-x divide-[#E5E7EB]">
              {products.slice(0, 4).map((p) => (
                <ProductCard key={p.label} {...p} />
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex flex-1 divide-x divide-[#E5E7EB] border-t border-[#E5E7EB]">
              {products.slice(4, 8).map((p) => (
                <ProductCard key={p.label} {...p} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Product card ── */

function ProductCard({ id, label }: GridProduct) {
  const product = PRODUCTS.find((p) => p.id === id);
  const src = product?.src ?? "";
  const alt = product?.alt ?? label;

  return (
    <Link
      href={`/products/${id}`}
      className="flex-1 flex flex-col items-center justify-center gap-2 px-2 py-4 hover:bg-[#EFF2F4] transition-colors group"
    >
      <div className="relative w-[90px] h-[90px]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 25vw, 90px"
          className="object-contain"
        />
      </div>
      <p className="text-[12px] text-[#1C1C1C] text-center leading-snug group-hover:text-primary transition-colors">
        {label}
      </p>
    </Link>
  );
}
