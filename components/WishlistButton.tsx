"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

export default function WishlistButton({
  iconSize = 16,
  className = "",
}: {
  iconSize?: number;
  className?: string;
}) {
  const [saved, setSaved] = useState(false);
  return (
    <button
      type="button"
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      onClick={() => setSaved((s) => !s)}
      className={`${className} cursor-pointer`}
    >
      <Heart
        size={iconSize}
        strokeWidth={1.8}
        className={saved ? "fill-red-500 text-red-500" : ""}
      />
    </button>
  );
}
