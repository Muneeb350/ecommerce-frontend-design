"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
}

export default function ProductImageGallery({ src, alt }: Props) {
  const [active, setActive] = useState(0);

  /* Use the same image for all thumbnails (one image per product in mock data) */
  const thumbs = Array.from({ length: 5 }, () => src);

  return (
    <div className="flex flex-col gap-3">

      {/* Main image */}
      <div className="relative h-[260px] border border-[#E5E7EB] rounded-xl bg-[#F7F7F7] overflow-hidden">
        <Image
          src={thumbs[active]}
          alt={alt}
          fill
          sizes="260px"
          className="object-contain p-6"
          priority
        />
      </div>

      {/* Thumbnail row — flex-1 + aspect-square keeps each thumb proportional
          regardless of how many thumbnails there are or how wide the container is,
          so they never overflow into the adjacent info column. */}
      <div className="flex gap-2">
        {thumbs.map((s, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Product image ${i + 1}`}
            onClick={() => setActive(i)}
            className={`relative flex-1 aspect-square border-2 rounded-lg bg-[#F7F7F7] overflow-hidden transition-colors ${
              active === i
                ? "border-primary"
                : "border-[#E5E7EB] hover:border-[#C5CCD6]"
            }`}
          >
            <Image
              src={s}
              alt={`${alt} view ${i + 1}`}
              fill
              sizes="(max-width: 768px) 20vw, 56px"
              className="object-contain p-1"
            />
          </button>
        ))}
      </div>

    </div>
  );
}
