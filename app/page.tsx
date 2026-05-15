import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DealsAndOffers from "@/components/DealsAndOffers";
import CategoryGrid, { type GridProduct } from "@/components/CategoryGrid";
import InquirySection from "@/components/InquirySection";
import RecommendedItems from "@/components/RecommendedItems";
import ExtraServices from "@/components/ExtraServices";
import SuppliersByRegion from "@/components/SuppliersByRegion";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

/* ── Section data ── */

const HOME_PRODUCTS: readonly [
  GridProduct, GridProduct, GridProduct, GridProduct,
  GridProduct, GridProduct, GridProduct, GridProduct,
] = [
  { id: 7,  label: "Soft chairs"    },
  { id: 8,  label: "Sofa & chair"   },
  { id: 9,  label: "Plants"         },
  { id: 10, label: "Table lamps"    },
  { id: 11, label: "Home organiser" },
  { id: 12, label: "Kitchen mixer"  },
  { id: 13, label: "Coffee maker"   },
  { id: 14, label: "Cooking pots"   },
];

const ELECTRONICS_PRODUCTS: readonly [
  GridProduct, GridProduct, GridProduct, GridProduct,
  GridProduct, GridProduct, GridProduct, GridProduct,
] = [
  { id: 21, label: "Smartphones"     },
  { id: 4,  label: "Tablets"         },
  { id: 5,  label: "Iphones"         },
  { id: 22, label: "Electric kettles"},
  { id: 3,  label: "Smart watches"   },
  { id: 2,  label: "Laptops"         },
  { id: 1,  label: "Cameras"         },
  { id: 23, label: "Headphones"      },
];

/* ── Page ── */

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-[#F5F5F5]">
        <Hero />
        <DealsAndOffers />
        <CategoryGrid
          title="Home & outdoor"
          bannerSrc="/assets/e569161444be4cfea24366cb3d27cb335105ed84.jpg"
          bannerAlt="Living room with teal sofa and plants"
          products={HOME_PRODUCTS}
        />
        <CategoryGrid
          title="Consumer electronics"
          bannerSrc="/assets/2899a4374c8412945ece65003461e7d1b12857d0.png"
          bannerAlt="Phone, smartwatch, and headphones on light blue background"
          products={ELECTRONICS_PRODUCTS}
        />
        <InquirySection />
        <RecommendedItems />
        <ExtraServices />
        <SuppliersByRegion />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
