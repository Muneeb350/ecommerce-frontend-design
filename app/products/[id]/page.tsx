import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ShoppingCart, ShieldCheck, Globe, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductTabs from "@/components/ProductTabs";
import ProductActions from "@/components/ProductActions";
import { PRODUCTS } from "@/lib/products";

interface Props {
  params:       Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}

/* ── Inline star graphic (server-safe) ── */
function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <span className="flex items-center gap-[2px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24"
          fill={i < filled ? "#FF9017" : "none"}
          stroke={i < filled ? "#FF9017" : "#C5CCD6"}
          strokeWidth="1.5" aria-hidden>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}

/* ── Page ── */

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  const numericId = Number(id);
  const product = PRODUCTS.find((p) => p.id === numericId);

  /* ── Product not found ── */
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 bg-[#F7FAFC] flex items-center justify-center">
          <div className="text-center py-20 px-6">
            <p className="text-[72px] font-bold text-[#E5E7EB] leading-none select-none">404</p>
            <h1 className="text-[22px] font-bold text-[#1C2434] mt-3 mb-2">
              Product Not Found
            </h1>
            <p className="text-[14px] text-[#8B96A5] mb-6 max-w-[340px] mx-auto">
              The product with ID <span className="font-medium text-[#1C2434]">{id}</span> doesn&apos;t
              exist or has been removed from the catalog.
            </p>
            <Link
              href="/products"
              className="inline-block px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-[13px] font-semibold rounded-lg transition-colors"
            >
              Browse all products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { title, src, alt, price, rating, orders, category, subCategory, description } = product;

  /* Tiered pricing derived from product price */
  const tiers = [
    { price: price,                     qty: "50-100 pcs" },
    { price: Math.round(price * 0.91),  qty: "100-700 pcs" },
    { price: Math.round(price * 0.79),  qty: "700+ pcs" },
  ];

  /* Spec rows */
  const specs: { label: string; value: string }[] = [
    { label: "Price",         value: "Negotiable" },
    { label: "Type",          value: subCategory },
    { label: "Material",      value: "Plastic / Metal alloy" },
    { label: "Design",        value: "Modern design" },
    { label: "Customization", value: "Available for bulk orders" },
    { label: "Protection",    value: "Refund policy applies" },
    { label: "Warranty",      value: "2 years manufacturer warranty" },
  ];

  /* Related products — same category first, then others; capped at 6 for the row */
  const allRelated = [
    ...PRODUCTS.filter((p) => p.id !== product.id && p.category === category),
    ...PRODUCTS.filter((p) => p.id !== product.id && p.category !== category),
  ];
  const relatedCards = allRelated.slice(0, 6);

  /* You may like — first 5 from the full related list */
  const mayLike = allRelated.slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-[#F7FAFC]">
        <div className="max-w-[1280px] mx-auto px-6 pt-6 pb-10">

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-[13px] mb-5 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="text-[#1C7ACC] hover:underline">Home</Link>
            <span className="text-[#8B96A5]">&rsaquo;</span>
            <Link href={`/products?category=${encodeURIComponent(category)}`} className="text-[#1C7ACC] hover:underline">
              {category}
            </Link>
            <span className="text-[#8B96A5]">&rsaquo;</span>
            <Link href={`/products?category=${encodeURIComponent(category)}&sub=${encodeURIComponent(subCategory)}`} className="text-[#1C7ACC] hover:underline">
              {subCategory}
            </Link>
            <span className="text-[#8B96A5]">&rsaquo;</span>
            <span className="text-[#1C2434] font-medium truncate max-w-[260px]">{title}</span>
          </nav>

          {/* Two-column layout — stacks on mobile, 70/30 on md+ */}
          <div className="flex flex-col md:flex-row gap-5 items-start">

            {/* ── Left column ── */}
            <div className="w-full md:flex-[7] min-w-0 flex flex-col gap-4">

              {/* Main product card */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-5">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">

                  {/* Image gallery — full-width on mobile, fixed lane on desktop */}
                  <div className="w-full md:w-[280px] md:shrink-0">
                    <ProductImageGallery src={src} alt={alt} />
                  </div>

                  {/* Product info */}
                  <div className="flex-1 min-w-0 flex flex-col gap-3">

                    {/* In stock */}
                    <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#00B517]">
                      <CheckCircle2 size={14} strokeWidth={2} />
                      In stock
                    </span>

                    {/* Title */}
                    <h1 className="text-[18px] font-bold text-[#1C2434] leading-snug">
                      {title}
                    </h1>

                    {/* Rating row */}
                    <div className="flex items-center gap-2 flex-wrap text-[13px]">
                      <Stars rating={rating} />
                      <span className="font-semibold text-[#1C2434]">{(rating * 2.5).toFixed(1)}</span>
                      <span className="text-[#8B96A5]">·</span>
                      <span className="text-[#8B96A5]">32 reviews</span>
                      <span className="text-[#8B96A5]">·</span>
                      <span className="text-[#8B96A5] flex items-center gap-1">
                        <ShoppingCart size={12} strokeWidth={1.8} />
                        {orders} sold
                      </span>
                    </div>

                    {/* Price tiers */}
                    <div className="flex rounded-lg overflow-hidden border border-[#FFD199] bg-[#FFF4E5]">
                      {tiers.map(({ price: t, qty }, i) => (
                        <div
                          key={qty}
                          className={`flex-1 flex flex-col items-center justify-center py-2.5 px-3 text-center ${
                            i < tiers.length - 1 ? "border-r border-[#FFD199]" : ""
                          } ${i === 0 ? "bg-[#FFF0D6]" : ""}`}
                        >
                          <p className="text-[15px] font-bold text-[#EB4500]">
                            ${t.toLocaleString()}
                          </p>
                          <p className="text-[11px] text-[#8B96A5] mt-0.5">{qty}</p>
                        </div>
                      ))}
                    </div>

                    {/* Spec rows */}
                    <div className="flex flex-col divide-y divide-[#F5F5F5]">
                      {specs.map(({ label, value }) => (
                        <div key={label} className="flex gap-4 py-1.5 text-[13px]">
                          <span className="w-[110px] shrink-0 text-[#8B96A5]">{label}:</span>
                          <span className="text-[#1C2434]">{value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Buy Now + Add to Cart — client component handles localStorage & routing */}
                    <ProductActions
                      id={numericId}
                      title={title}
                      price={price}
                      src={src}
                    />

                    {/* Secondary actions */}
                    <div className="flex flex-col gap-2 mt-2">
                      <button
                        type="button"
                        className="w-full h-[40px] bg-primary hover:bg-primary-hover text-white text-[13px] font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        Send inquiry
                      </button>
                      <button
                        type="button"
                        className="w-full h-[40px] border border-[#DEE2E7] text-[#1C2434] text-[13px] font-medium rounded-lg hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                      >
                        Seller&apos;s profile
                      </button>
                    </div>

                  </div>
                </div>
              </div>

              {/* Tabs — Description / Reviews / Shipping / About seller */}
              <ProductTabs description={description} />

            </div>

            {/* ── Right column ── */}
            <div className="w-full md:flex-[3] md:shrink-0 flex flex-col gap-4">

              {/* Supplier card */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 flex flex-col gap-3">

                {/* Avatar + name */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[15px] font-bold text-[#4361EE] shrink-0">
                    R
                  </div>
                  <div>
                    <p className="text-[11px] text-[#8B96A5] mb-0.5">Supplier</p>
                    <p className="text-[13px] font-semibold text-[#1C2434]">Guanjiu Trading LLC</p>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-col gap-1.5 text-[13px] text-[#8B96A5]">
                  <div className="flex items-center gap-2">
                    <span aria-hidden>🇩🇪</span>
                    <span>Germany, Berlin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} strokeWidth={1.8} />
                    <span>Verified Seller</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={14} strokeWidth={1.8} />
                    <span>Worldwide shipping</span>
                  </div>
                </div>

                {/* Buttons */}
                <button
                  type="button"
                  className="w-full h-[40px] bg-primary hover:bg-primary-hover text-white text-[13px] font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Send inquiry
                </button>
                <button
                  type="button"
                  className="w-full h-[40px] border border-[#DEE2E7] text-[#1C2434] text-[13px] font-medium rounded-lg hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                >
                  Seller&apos;s profile
                </button>

                {/* Save for later */}
                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 text-[13px] text-primary hover:underline cursor-pointer"
                >
                  <Heart size={13} strokeWidth={1.8} />
                  Save for later
                </button>

              </div>

              {/* You may like */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 flex flex-col gap-4">
                <h3 className="text-[14px] font-semibold text-[#1C2434]">You may like</h3>
                <div className="flex flex-col gap-3">
                  {mayLike.map((p) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.id}`}
                      className="flex items-center gap-3 group"
                    >
                      <div className="relative w-[48px] h-[48px] shrink-0 bg-[#F7F7F7] rounded-lg overflow-hidden">
                        <Image
                          src={p.src}
                          alt={p.alt}
                          fill
                          sizes="48px"
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-medium text-[#1C2434] group-hover:text-primary line-clamp-2 leading-snug">
                          {p.title}
                        </p>
                        <p className="text-[12px] text-[#8B96A5] mt-0.5">
                          ${p.price.toFixed(0)} – ${p.originalPrice.toFixed(0)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Related products */}
          <section className="mt-10">
            <h2 className="text-[16px] font-bold text-[#1C2434] mb-4">Related products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {relatedCards.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="bg-white border border-[#E5E7EB] rounded-xl p-3 flex flex-col gap-2 hover:shadow-md hover:border-[#C5CCD6] transition-all duration-200"
                >
                  <div className="relative h-[120px] bg-[#F7F7F7] rounded-lg overflow-hidden">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 180px"
                      className="object-contain p-3"
                    />
                  </div>
                  <p className="text-[12px] font-medium text-[#1C2434] line-clamp-2 leading-snug">
                    {p.title}
                  </p>
                  <p className="text-[12px] text-[#8B96A5]">
                    ${p.price.toFixed(0)} – ${p.originalPrice.toFixed(0)}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Promo banner */}
          <div className="mt-10 rounded-xl bg-gradient-to-r from-[#1C3FAA] to-[#2563EB] px-8 py-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-white font-bold text-[18px] leading-snug">
                Super discount on more than 100 USD
              </p>
              <p className="text-[#BFCFFF] text-[13px] mt-1">
                Have you ever finally just write dummy info
              </p>
            </div>
            <button
              type="button"
              className="shrink-0 h-[40px] px-6 bg-[#FF9017] hover:bg-[#F07C00] text-white text-[13px] font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Shop now
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
