/*
  Banner background: #1C7ACC — a rich professional blue derived from the
  design reference. Distinct from the dark navy (#1C2434) used in the header
  and from Tailwind's default blue-600 (#2563EB).
  The "Send inquiry" button uses the same hex so they read as one colour system.
*/

const UNITS = ["Pcs", "Kg", "Tons", "Boxes", "Sets", "Pairs"];

export default function InquirySection() {
  return (
    <section className="w-full bg-[#1C7ACC]">
      <div className="max-w-[1280px] mx-auto px-6 py-14 flex flex-col lg:flex-row items-center gap-12">

        {/* ── Left: copy ── */}
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-[28px] sm:text-[34px] font-bold text-white leading-[1.2]">
            An easy way to send requests<br className="hidden sm:block" />
            to all suppliers
          </h2>
          <p className="text-[14px] text-white/70 leading-relaxed max-w-[400px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* ── Right: form card ── */}
        <div className="w-full lg:w-[390px] shrink-0 bg-white rounded-xl border border-[#E5E7EB] shadow-lg p-5">

          <h3 className="text-[15px] font-semibold text-[#1C2434] mb-4">
            Send quote to suppliers
          </h3>

          <form action="#" className="flex flex-col gap-3">

            {/* Item name */}
            <input
              type="text"
              name="item"
              placeholder="What item you need?"
              className="w-full h-[40px] px-3 text-[13px] text-[#1C1C1C] placeholder:text-[#8B96A5] border border-[#E5E7EB] rounded-lg outline-none focus:border-[#1C7ACC] transition-colors"
            />

            {/* Details textarea */}
            <textarea
              name="details"
              rows={3}
              placeholder="Type more details"
              className="w-full px-3 py-2 text-[13px] text-[#1C1C1C] placeholder:text-[#8B96A5] border border-[#E5E7EB] rounded-lg outline-none focus:border-[#1C7ACC] transition-colors resize-none leading-relaxed"
            />

            {/* Quantity + unit row */}
            <div className="flex gap-2">
              <input
                type="number"
                name="quantity"
                min={1}
                placeholder="Qty"
                className="flex-1 h-[40px] px-3 text-[13px] text-[#1C1C1C] placeholder:text-[#8B96A5] border border-[#E5E7EB] rounded-lg outline-none focus:border-[#1C7ACC] transition-colors"
              />
              <div className="relative">
                <select
                  name="unit"
                  defaultValue="Pcs"
                  className="h-[40px] pl-3 pr-8 text-[13px] text-[#1C1C1C] bg-white border border-[#E5E7EB] rounded-lg outline-none focus:border-[#1C7ACC] appearance-none cursor-pointer transition-colors"
                >
                  {UNITS.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8B96A5]"
                  width="11" height="11" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            {/* Submit — same blue as the banner */}
            <button
              type="submit"
              className="w-full h-[40px] mt-1 bg-[#1C7ACC] hover:bg-[#1668B5] text-white text-[13px] font-semibold rounded-lg transition-colors"
            >
              Send inquiry
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}
