import Link from "next/link";
import Image from "next/image";
import WishlistButton from "@/components/WishlistButton";
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
  return (
    <div className="relative flex flex-col bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 hover:border-[#C5CCD6] transition-all duration-200">

      {/* Image */}
      <Link href={`/products/${id}`} className="relative h-[200px] bg-[#F7F7F7] block">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-4"
        />
      </Link>

      {/* Content */}
      <div className="p-3 pb-10 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-bold text-[#1C2434]">
            ${price.toFixed(2)}
          </span>
          <span className="text-[12px] text-[#8B96A5] line-through">
            ${originalPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Stars rating={rating} />
          <span className="text-[12px] text-[#8B96A5]">{rating.toFixed(1)}</span>
        </div>
        <Link href={`/products/${id}`} className="text-[13px] text-[#1C2434] leading-snug line-clamp-2 hover:text-primary transition-colors">
          {title}
        </Link>
      </div>

      {/* Wishlist — bottom-right of card */}
      <WishlistButton
        iconSize={14}
        className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-[#EBF3FF] hover:bg-[#d6e9ff] text-primary flex items-center justify-center transition-colors"
      />

    </div>
  );
}
