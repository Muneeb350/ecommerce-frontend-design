import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/products";

/* IDs of the 10 products shown in this section.
   All data (image, price, description) is sourced from the central catalog. */
const ITEM_IDS = [15, 16, 17, 18, 19, 20, 6, 3, 21, 2];

/* ── Component ── */

export default function RecommendedItems() {
  const items = ITEM_IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);

  return (
    <section className="w-full bg-[#F5F5F5]">
      <div className="max-w-[1280px] mx-auto px-6 py-6">

        <h2 className="text-[18px] font-semibold text-[#1C2434] mb-4">
          Recommended items
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((p) => {
            if (!p) return null;
            return (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="group flex flex-col bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="relative w-full h-[180px] bg-[#F7F7F7]">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-contain p-3"
                  />
                </div>

                {/* Info */}
                <div className="p-3 flex flex-col gap-1.5 border-t border-[#F0F0F0]">
                  <p className="text-[14px] font-semibold text-[#1C2434]">
                    ${p.price.toFixed(2)}
                  </p>
                  <p className="text-[12px] text-[#8B96A5] leading-snug line-clamp-2">
                    {p.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
