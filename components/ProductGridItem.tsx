"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingCart, CheckCircle2 } from "lucide-react";
import WishlistButton from "@/components/WishlistButton";
import { addToCart } from "@/lib/cart";
import { type Product as ProductListItemProps } from "@/lib/products";

function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <span className="flex items-center gap-[2px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={i < filled ? "#FF9017" : "none"}
          stroke={i < filled ? "#FF9017" : "#C5CCD6"}
          strokeWidth="1.5"
          aria-hidden
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}

export default function ProductGridItem({
  id,
  title,
  src,
  alt,
  price,
  originalPrice,
  rating,
}: ProductListItemProps) {
  const router = useRouter();
  const [toast, setToast] = useState(false);

  function handleAddToCart() {
    addToCart({ id, title, price, src });
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  }

  function handleBuyNow() {
    addToCart({ id, title, price, src });
    router.push("/cart");
  }

  return (
    <div
      className="
        flex flex-col
        bg-white border border-[#E5E7EB] rounded-xl
        hover:shadow-lg hover:-translate-y-1 hover:border-[#C5CCD6]
        transition-all duration-200
      "
    >
      {/* Image */}
      <Link
        href={`/products/${id}`}
        className="relative block h-[200px] shrink-0 rounded-t-xl overflow-hidden bg-[#F7F7F7]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-4"
        />
      </Link>

      {/* Info */}
      <div className="px-3 pt-3 pb-1 flex flex-col gap-1">

        {/* Price + Wishlist */}
        <div className="flex items-start gap-1">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-[15px] font-bold text-[#1C2434]">
              ${price.toFixed(2)}
            </span>
            <span className="text-[12px] text-[#8B96A5] line-through">
              ${originalPrice.toFixed(2)}
            </span>
          </div>
          <WishlistButton
            iconSize={13}
            className="
              w-7 h-7 shrink-0 rounded-full
              border border-[#E5E7EB] bg-white
              text-[#8B96A5] hover:text-blue-600 hover:border-blue-600
              flex items-center justify-center transition-colors
            "
          />
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1.5">
          <Stars rating={rating} />
          <span className="text-[12px] text-[#8B96A5]">{rating.toFixed(1)}</span>
        </div>

        {/* Title */}
        <Link
          href={`/products/${id}`}
          className="text-[13px] text-[#1C2434] leading-snug line-clamp-2 hover:text-blue-600 transition-colors"
        >
          {title}
        </Link>

      </div>

      {/* Toast */}
      {toast && (
        <div className="mx-3 mt-1 flex items-center gap-1.5 px-2 py-1.5 bg-green-50 border border-green-200 text-green-700 text-[11px] font-medium rounded-lg">
          <CheckCircle2 size={12} strokeWidth={2} />
          Added to cart!
        </div>
      )}

      {/* Button row */}
      <div className="px-3 pb-3 pt-2 flex items-center gap-2">

        <button
          type="button"
          onClick={handleBuyNow}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md text-[12px] font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Buy Now
        </button>

        <button
          type="button"
          onClick={handleAddToCart}
          aria-label="Add to cart"
          className="
            w-[36px] h-[36px] shrink-0
            flex items-center justify-center
            border-2 border-blue-600 text-blue-600 rounded-md
            hover:bg-blue-600 hover:text-white
            transition-colors cursor-pointer
          "
        >
          <ShoppingCart size={15} strokeWidth={2} />
        </button>

      </div>

    </div>
  );
}
