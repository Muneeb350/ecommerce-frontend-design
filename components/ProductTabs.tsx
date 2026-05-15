"use client";

import { useState } from "react";

const TABS = ["Description", "Reviews", "Shipping", "About seller"] as const;
type Tab = (typeof TABS)[number];

const SPECS = [
  { label: "Model",       value: "#8786867" },
  { label: "Style",       value: "Classic style" },
  { label: "Certificate", value: "ISO-898921212" },
  { label: "Size",        value: "34mm x 450mm x 19mm" },
  { label: "Memory",      value: "36GB RAM" },
];

const FEATURES = [
  "Some great feature name here",
  "Lorem ipsum dolor sit amet, consectetur",
  "Duis aute irure dolor in reprehenderit",
  "Some great feature name here",
];

const REVIEWS = [
  {
    id: 1,
    name: "Robert Fox",
    initials: "RF",
    date: "March 14, 2026",
    rating: 5,
    comment:
      "Absolutely love this product! Build quality is excellent and it arrived well-packaged. Would definitely recommend to anyone looking for a reliable option at this price point.",
  },
  {
    id: 2,
    name: "Savannah Nguyen",
    initials: "SN",
    date: "February 28, 2026",
    rating: 4,
    comment:
      "Great product overall. Setup was straightforward and it works exactly as described. Knocked off one star only because delivery took a couple of days longer than estimated.",
  },
  {
    id: 3,
    name: "Jacob Jones",
    initials: "JJ",
    date: "January 19, 2026",
    rating: 5,
    comment:
      "Exceeded my expectations. The material feels premium and the finish is clean. Already ordered a second one for my office.",
  },
  {
    id: 4,
    name: "Cody Fisher",
    initials: "CF",
    date: "December 5, 2025",
    rating: 4,
    comment:
      "Solid purchase. Good value for money and the seller was responsive when I had a question about sizing. Will buy from this supplier again.",
  },
];

function ReviewStars({ rating, size }: { rating: number; size: number }) {
  const filled = Math.round(rating);
  return (
    <span className="flex items-center gap-[2px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
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

export default function ProductTabs({ description }: { description: string }) {
  const [active, setActive] = useState<Tab>("Description");

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">

      {/* Tab bar */}
      <div className="flex border-b border-[#E5E7EB]">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={`px-5 py-3.5 text-[13px] font-medium transition-colors border-b-2 -mb-px ${
              active === tab
                ? "border-primary text-primary"
                : "border-transparent text-[#8B96A5] hover:text-[#1C2434]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-5">

        {active === "Description" && (
          <div className="flex flex-col gap-5">
            {/* Body text — two paragraphs */}
            <div className="flex flex-col gap-3">
              <p className="text-[13px] text-[#505565] leading-relaxed">{description}</p>
              <p className="text-[13px] text-[#505565] leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>

            {/* Specs table */}
            <table className="w-full text-[13px] border border-[#E5E7EB] rounded-lg overflow-hidden">
              <tbody>
                {SPECS.map(({ label, value }) => (
                  <tr key={label} className="border-b border-[#E5E7EB] last:border-0">
                    <td className="px-4 py-2.5 bg-[#F7FAFC] text-[#8B96A5] w-[140px]">{label}</td>
                    <td className="px-4 py-2.5 text-[#1C2434]">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Feature checklist */}
            <ul className="flex flex-col gap-2">
              {FEATURES.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-[13px] text-[#505565]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="#2563EB" strokeWidth="2.5" aria-hidden>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {active === "Reviews" && (
          <div className="flex flex-col gap-6">
            <h3 className="text-[15px] font-semibold text-[#1C2434]">Customer Reviews</h3>

            {/* Summary bar */}
            <div className="flex items-center gap-6 p-4 bg-[#F7FAFC] rounded-xl border border-[#E5E7EB]">
              <div className="flex flex-col items-center shrink-0">
                <span className="text-[40px] font-bold text-[#1C2434] leading-none">4.5</span>
                <ReviewStars rating={4.5} size={16} />
                <span className="text-[12px] text-[#8B96A5] mt-1">32 reviews</span>
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                {[5, 4, 3, 2, 1].map((star) => {
                  const pct = star === 5 ? 60 : star === 4 ? 25 : star === 3 ? 10 : star === 2 ? 3 : 2;
                  return (
                    <div key={star} className="flex items-center gap-2 text-[12px] text-[#8B96A5]">
                      <span className="w-3 text-right">{star}</span>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="#FF9017" stroke="#FF9017" strokeWidth="1.5" aria-hidden>
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <div className="flex-1 h-[6px] bg-[#E5E7EB] rounded-full overflow-hidden">
                        <div className="h-full bg-[#FF9017] rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-6 text-right">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Individual reviews */}
            <div className="flex flex-col divide-y divide-[#F5F5F5]">
              {REVIEWS.map((r) => (
                <div key={r.id} className="py-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[12px] font-bold text-[#4361EE] shrink-0">
                        {r.initials}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-[#1C2434]">{r.name}</p>
                        <p className="text-[11px] text-[#8B96A5]">{r.date}</p>
                      </div>
                    </div>
                    <ReviewStars rating={r.rating} size={13} />
                  </div>
                  <p className="text-[13px] text-[#505565] leading-relaxed">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {active === "Shipping" && (
          <p className="text-[13px] text-[#8B96A5]">
            Worldwide shipping available. Estimated delivery: 7–14 business days.
          </p>
        )}

        {active === "About seller" && (
          <p className="text-[13px] text-[#8B96A5]">
            Guanjiu Trading LLC — verified seller based in Germany, Berlin. Over 10 years of
            experience in wholesale electronics and accessories.
          </p>
        )}

      </div>
    </div>
  );
}
