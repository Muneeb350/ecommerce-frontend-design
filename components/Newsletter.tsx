/* ── Component ── */

export default function Newsletter() {
  return (
    <section className="w-full bg-[#EFF2F4]">
      <div className="max-w-[1280px] mx-auto px-6 py-12 flex flex-col items-center gap-3 text-center">

        <h2 className="text-[22px] font-bold text-[#1C2434]">
          Subscribe on our newsletter
        </h2>
        <p className="text-[14px] text-[#8B96A5] max-w-[400px] leading-relaxed">
          Get digital coupon for your first order and be the first to know about
          new deals and offers.
        </p>

        <form
          action="#"
          className="flex w-full max-w-[460px] h-[44px] mt-2 rounded-lg overflow-hidden border border-[#E5E7EB] bg-white shadow-sm"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="flex-1 min-w-0 px-4 text-[13px] text-[#1C1C1C] placeholder:text-[#8B96A5] outline-none bg-white"
          />
          <button
            type="submit"
            className="px-5 bg-primary hover:bg-primary-hover text-white text-[13px] font-semibold shrink-0 transition-colors"
          >
            Subscribe
          </button>
        </form>

      </div>
    </section>
  );
}
