import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductsMain from "@/components/ProductsMain";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumbs";
import Newsletter from "@/components/Newsletter";
import { PRODUCTS } from "@/lib/products";

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-[#F7FAFC]">

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-6 pb-10">

          <Suspense fallback={<div className="h-[30px] mb-5" />}>
            <DynamicBreadcrumbs />
          </Suspense>

          <Suspense fallback={<div className="h-[600px]" />}>
            <ProductsMain products={PRODUCTS} />
          </Suspense>

        </div>

        <Newsletter />

      </main>

      <Footer />
    </div>
  );
}
