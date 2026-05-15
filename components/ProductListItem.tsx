import Link from "next/link";
import Image from "next/image";
import WishlistButton from "@/components/WishlistButton";
import { type Product } from "@/lib/products";

/* Re-export so existing importers don't need to change */
export type ProductListItemProps = Product;

/* ── Stars ── */

function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <span className="flex items-center gap-[2px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
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

/* ── Component ── */

export default function ProductListItem({
  id,
  title,
  src,
  alt,
  price,
  originalPrice,
  rating,
  orders,
  description,
}: ProductListItemProps) {
  return (
    <div className="relative flex gap-5 bg-white border border-[#E5E7EB] rounded-xl p-4 hover:shadow-lg hover:-translate-y-0.5 hover:border-[#C5CCD6] transition-all duration-200">

      {/* Product image */}
      <Link href={`/products/${id}`} className="w-[160px] h-[160px] shrink-0 relative rounded-lg bg-[#F7F7F7] overflow-hidden block">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="160px"
          className="object-contain p-3"
        />
      </Link>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col gap-1.5 pr-10">

        <Link href={`/products/${id}`} className="text-[15px] font-semibold text-[#1C2434] leading-snug hover:text-primary transition-colors">
          {title}
        </Link>

        {/* Prices */}
        <div className="flex items-center gap-3">
          <span className="text-[18px] font-bold text-[#1C2434]">
            ${price.toFixed(2)}
          </span>
          <span className="text-[13px] text-[#8B96A5] line-through">
            ${originalPrice.toFixed(2)}
          </span>
        </div>

        {/* Rating + orders + shipping */}
        <div className="flex items-center gap-2 flex-wrap">
          <Stars rating={rating} />
          <span className="text-[12px] text-[#8B96A5]">{rating.toFixed(1)}</span>
          <span className="text-[#D0D5DD]">·</span>
          <span className="text-[12px] text-[#8B96A5]">{orders} orders</span>
          <span className="text-[#D0D5DD]">·</span>
          <span className="text-[12px] font-medium text-[#00B517]">Free Shipping</span>
        </div>

        {/* Description */}
        <p className="text-[13px] text-[#8B96A5] leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* View details */}
        <Link
          href={`/products/${id}`}
          className="mt-auto text-[13px] font-medium text-[#1C7ACC] hover:underline"
        >
          View details
        </Link>

      </div>

      {/* Wishlist */}
      <WishlistButton
        iconSize={16}
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F5F5F5] hover:bg-[#EFF2F4] text-[#8B96A5] flex items-center justify-center transition-colors shrink-0"
      />

    </div>
  );
}
