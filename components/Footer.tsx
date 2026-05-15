"use client";

import { ShoppingCart, ChevronDown } from "lucide-react";

/* ── Data ── */

const columns = [
  {
    heading: "About",
    links: ["About Us", "Find store", "Categories", "Blog"],
  },
  {
    heading: "Partnership",
    links: ["About Us", "Find store", "Categories", "Blog"],
  },
  {
    heading: "Information",
    links: ["Help Center", "Money Refund", "Shipping", "Contact us"],
  },
  {
    heading: "For users",
    links: ["Login", "Register", "Settings", "My Orders"],
  },
];

/* Simple SVG paths for social brand icons (Lucide has no brand icons) */
const socialIcons: { label: string; path: string }[] = [
  {
    label: "Facebook",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    label: "Twitter",
    path: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
  },
  {
    label: "Instagram",
    path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2z",
  },
  {
    label: "LinkedIn",
    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  },
];

/* ── Component ── */

export default function Footer() {
  return (
    <footer className="w-full">

      {/* ── Main footer grid ── */}
      <div className="w-full bg-[#F5F5F5] border-t border-[#E5E7EB]">
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_1.6fr] gap-8 lg:gap-6">

            {/* Column 1 — Brand */}
            <div className="flex flex-col gap-4">
              {/* Logo */}
              <a href="/" className="flex items-center gap-2 w-fit">
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center shrink-0">
                  <ShoppingCart size={17} color="white" strokeWidth={2.2} />
                </div>
                <span className="text-[18px] font-bold text-[#1C2434] tracking-tight">
                  Brand
                </span>
              </a>

              {/* Description */}
              <p className="text-sm text-[#606060] leading-6 max-w-[220px]">
                Best information about the company goes here but now lorem ipsum is.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-3 mt-1">
                {socialIcons.map(({ label, path }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-[#E5E7EB] text-[#8B96A5] hover:text-primary hover:border-primary transition-colors"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d={path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Columns 2–5 — Links */}
            {columns.map(({ heading, links }) => (
              <div key={heading} className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-[#1C2434]">
                  {heading}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-[#606060] hover:text-primary transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Column 6 — Get app */}
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-[#1C2434]">Get app</h3>
              <AppBadge store="App Store" sub="Download on the" icon="apple" />
              <AppBadge store="Google Play" sub="Get it on" icon="google" />
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom copyright bar ── */}
      <div className="w-full bg-[#E8E8E8] border-t border-[#D5D5D5]">
        <div className="max-w-[1280px] mx-auto px-6 h-12 flex items-center justify-between">
          <span className="text-xs text-[#606060]">© 2023 Ecommerce.</span>

          <button className="flex items-center gap-1.5 text-xs text-[#606060] hover:text-[#1C1C1C] transition-colors">
            <span role="img" aria-label="US flag" className="text-sm leading-none">
              🇺🇸
            </span>
            <span>English</span>
            <ChevronDown size={12} strokeWidth={2} />
          </button>
        </div>
      </div>

    </footer>
  );
}

/* ── App store badge ── */

function AppBadge({
  store,
  sub,
  icon,
}: {
  store: string;
  sub: string;
  icon: "apple" | "google";
}) {
  return (
    <a
      href="#"
      className="flex items-center gap-2.5 px-3 py-2 bg-[#1C2434] hover:bg-[#263347] text-white rounded-md transition-colors w-fit"
    >
      {/* Icon */}
      <span className="text-white leading-none" aria-hidden>
        {icon === "apple" ? (
          /* Apple logo path (simplified SVG) */
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
        ) : (
          /* Google Play triangle (simplified) */
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M3 20.5v-17c0-.83 1-.83 1.5-.5l14 8.5c.5.3.5 1 0 1.3l-14 8.5c-.5.3-1.5.3-1.5-.8z" />
          </svg>
        )}
      </span>

      {/* Text */}
      <div className="flex flex-col leading-tight">
        <span className="text-[9px] text-white/70">{sub}</span>
        <span className="text-[13px] font-semibold">{store}</span>
      </div>
    </a>
  );
}
