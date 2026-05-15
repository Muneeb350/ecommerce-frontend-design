"use client";

import Link from "next/link";
import {
  Search,
  User,
  MessageSquare,
  Package,
  ShoppingCart,
  ChevronDown,
  Menu,
  Globe,
} from "lucide-react";

const navLinks = [
  { label: "Hot offers", hot: true },
  { label: "Gift boxes", hot: false },
  { label: "Projects", hot: false },
  { label: "Menu item", hot: false },
];

const searchCategories = [
  "All category",
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports",
  "Toys",
  "Books",
  "Automotive",
];

export default function Header() {
  return (
    <header className="w-full">

      {/* ── Band 1: Top utility bar ── */}
      <div className="w-full bg-[#F5F5F5] border-b border-[#E5E7EB]">
        <div className="max-w-[1280px] mx-auto px-6 h-9 flex items-center justify-end gap-5">
          <TopBarBtn label="English" />
          <span className="text-[#E5E7EB]">|</span>
          <TopBarBtn label="USD" />
          <span className="text-[#E5E7EB]">|</span>
          <button className="flex items-center gap-1.5 text-xs text-[#606060] hover:text-[#1C1C1C] transition-colors">
            <Globe size={13} strokeWidth={1.8} />
            <span>Ship to</span>
            <span role="img" aria-label="Germany" className="text-sm leading-none">🇩🇪</span>
            <ChevronDown size={12} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* ── Band 2: Main navbar ── */}
      <div className="w-full bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center gap-6">

          {/* Logo — far left */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
              <ShoppingCart size={17} color="white" strokeWidth={2.2} />
            </div>
            <span className="text-[18px] font-bold text-[#1C1C1C] tracking-tight">
              Brand
            </span>
          </a>

          {/* Search bar — center, grows to fill */}
          <div className="flex flex-1 h-[44px] rounded border border-[#E5E7EB] overflow-hidden">
            {/* Category select */}
            <div className="relative flex items-center shrink-0 border-r border-[#E5E7EB]">
              <select
                className="h-full pl-3 pr-7 text-sm text-[#1C1C1C] bg-[#F5F5F5] appearance-none cursor-pointer outline-none"
                aria-label="Search category"
              >
                {searchCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={13}
                strokeWidth={2}
                className="pointer-events-none absolute right-2 text-[#8B96A5]"
              />
            </div>

            {/* Text input */}
            <input
              type="text"
              placeholder="Search"
              className="flex-1 min-w-0 px-4 text-sm text-[#1C1C1C] placeholder:text-[#8B96A5] outline-none bg-white"
            />

            {/* Search button */}
            <button
              className="flex items-center justify-center gap-2 px-6 bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-colors shrink-0"
              onClick={() => console.log("Search feature coming soon")}
            >
              <Search size={16} strokeWidth={2.5} />
              <span>Search</span>
            </button>
          </div>

          {/* Right icon group — far right */}
          <div className="flex items-center gap-5 shrink-0">
            <NavIcon
              icon={<User size={24} strokeWidth={1.7} />}
              sublabel="Sign in / Register"
              label="Profile"
            />
            <NavIcon
              icon={<MessageSquare size={24} strokeWidth={1.7} />}
              label="Message"
            />
            <NavIcon
              icon={<Package size={24} strokeWidth={1.7} />}
              label="Orders"
            />
            <NavIcon
              icon={<ShoppingCart size={24} strokeWidth={1.7} />}
              label="My Cart"
              badge={0}
              href="/cart"
            />
          </div>
        </div>
      </div>

      {/* ── Band 3: Category nav bar ── */}
      <div className="w-full bg-[#EFF2F4] border-b border-[#E5E7EB]">
        <div className="max-w-[1280px] mx-auto px-6 h-11 flex items-center">

          {/* "All category" — dark pill on the left */}
          <Link
            href="/products"
            className="flex items-center gap-2 h-full px-4 bg-[#1C2434] hover:bg-[#263347] text-white text-sm font-medium transition-colors shrink-0 cursor-pointer"
          >
            <Menu size={16} strokeWidth={2} />
            <span>All category</span>
          </Link>

          {/* Category links */}
          <nav className="flex items-center h-full ml-1">
            {navLinks.map(({ label, hot }) => (
              <a
                key={label}
                href="#"
                className="flex items-center h-full px-4 text-sm text-[#1C1C1C] hover:text-primary transition-colors whitespace-nowrap"
              >
                {label}
                {hot && (
                  <span className="ml-1.5 w-[7px] h-[7px] rounded-full bg-red-500 shrink-0" />
                )}
              </a>
            ))}
          </nav>

          {/* Help — pushed to the far right */}
          <a
            href="#"
            className="ml-auto flex items-center gap-0.5 px-4 h-full text-sm text-[#1C1C1C] hover:text-primary transition-colors whitespace-nowrap shrink-0"
          >
            Help
            <ChevronDown size={14} strokeWidth={2} />
          </a>
        </div>
      </div>

    </header>
  );
}

/* ── Sub-components ── */

function TopBarBtn({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-1 text-xs text-[#606060] hover:text-[#1C1C1C] transition-colors">
      <span>{label}</span>
      <ChevronDown size={12} strokeWidth={2} />
    </button>
  );
}

function NavIcon({
  icon,
  label,
  sublabel,
  badge,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  badge?: number;
  href?: string;
}) {
  const cls = "flex flex-col items-center gap-0.5 group min-w-[48px]";
  const content = (
    <>
      <div className="relative text-[#8B96A5] group-hover:text-primary transition-colors">
        {icon}
        {badge !== undefined && badge > 0 && (
          <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold leading-none px-1">
            {badge}
          </span>
        )}
      </div>
      <div className="flex flex-col items-center leading-none text-center">
        {sublabel && (
          <span className="text-[9px] text-[#8B96A5] whitespace-nowrap">
            {sublabel}
          </span>
        )}
        <span className="text-[11px] font-medium text-[#1C1C1C] group-hover:text-primary transition-colors whitespace-nowrap">
          {label}
        </span>
      </div>
    </>
  );

  if (href) {
    return <Link href={href} className={cls}>{content}</Link>;
  }
  return <button className={cls}>{content}</button>;
}
