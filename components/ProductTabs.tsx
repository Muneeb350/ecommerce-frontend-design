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
          <p className="text-[13px] text-[#8B96A5]">No reviews yet.</p>
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
