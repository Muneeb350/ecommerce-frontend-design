/* ── Data ── */

/*
  Flag images served from flagcdn.com (public CDN, no API key required).
  w40 resolution fetched so retina/HiDPI screens stay sharp; displayed at 20 px
  via Tailwind w-5. Using <img> instead of next/image avoids adding a
  remotePatterns entry to next.config.ts for a 20 px decorative icon.
*/
const REGIONS = [
  { code: "ae", country: "Arabic Emirates", url: "shopname.ae"    },
  { code: "au", country: "Australia",        url: "shopname.au"    },
  { code: "us", country: "United States",    url: "shopname.com"   },
  { code: "ru", country: "Russia",           url: "shopname.ru"    },
  { code: "it", country: "Italy",            url: "shopname.it"    },
  { code: "dk", country: "Denmark",          url: "shopname.dk"    },
  { code: "fr", country: "France",           url: "shopname.fr"    },
  { code: "ae", country: "Arabic Emirates",  url: "shopname.ae"    },
  { code: "cn", country: "China",            url: "shopname.cn"    },
  { code: "gb", country: "Great Britain",    url: "shopname.co.uk" },
] as const;

/* ── Component ── */

export default function SuppliersByRegion() {
  return (
    <section className="w-full bg-white border-y border-[#E5E7EB]">
      <div className="max-w-[1280px] mx-auto px-6 py-6">

        <h2 className="text-[16px] font-semibold text-[#1C2434] mb-4">
          Suppliers by region
        </h2>

        <div className="flex flex-col">

          {/* Row 1 — items 0–4 */}
          <div className="flex divide-x divide-[#E5E7EB] border border-[#E5E7EB] rounded-t-xl overflow-hidden">
            {REGIONS.slice(0, 5).map(({ code, country, url }, i) => (
              <RegionItem key={i} code={code} country={country} url={url} />
            ))}
          </div>

          {/* Row 2 — items 5–9 */}
          <div className="flex divide-x divide-[#E5E7EB] border-x border-b border-[#E5E7EB] rounded-b-xl overflow-hidden">
            {REGIONS.slice(5).map(({ code, country, url }, i) => (
              <RegionItem key={i + 5} code={code} country={country} url={url} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ── Region item ── */

function RegionItem({
  code,
  country,
  url,
}: {
  code: string;
  country: string;
  url: string;
}) {
  return (
    <a
      href="#"
      className="flex-1 flex items-center gap-3 px-4 py-4 hover:bg-[#EFF2F4] transition-colors group"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://flagcdn.com/w40/${code}.png`}
        alt={`${country} flag`}
        width={20}
        height={15}
        className="shrink-0 rounded-sm object-cover"
      />
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-[#1C2434] truncate group-hover:text-primary transition-colors">
          {country}
        </p>
        <p className="text-[11px] text-[#8B96A5] truncate">{url}</p>
      </div>
    </a>
  );
}
