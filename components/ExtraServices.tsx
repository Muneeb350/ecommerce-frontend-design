import Image from "next/image";
import { Building2, Palette, Truck, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ── Data ── */

const SERVICES: {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  Icon: LucideIcon;
}[] = [
  {
    title: "Source from Industry Hubs",
    description: "Connect directly with verified suppliers from the world's top manufacturing regions.",
    imageSrc: "/assets/b564a957ce3a966c5d76f6c21ddcaeba336dd251.png",
    imageAlt: "Warehouse with stacked boxes",
    Icon: Building2,
  },
  {
    title: "Customize Your Products",
    description: "Request tailored designs, packaging, and branding to match your business identity.",
    imageSrc: "/assets/4b08c60c3829236b56ad902eb0d7bc9954d83888.png",
    imageAlt: "Color swatch fan with fabric samples",
    Icon: Palette,
  },
  {
    title: "Fast, Reliable Shipping",
    description: "Ocean or air freight with real-time tracking and guaranteed on-time delivery.",
    imageSrc: "/assets/1d9d9dbe3e097f229ff7711c3aefb5b0673a2278.png",
    imageAlt: "Cargo plane over shipping containers",
    Icon: Truck,
  },
  {
    title: "Product Monitoring",
    description: "End-to-end inspection services to ensure quality standards before goods are shipped.",
    imageSrc: "/assets/0c52058c7fecb736fb193ed3a0a046668cf87a58.png",
    imageAlt: "Warehouse worker scanning inventory",
    Icon: ShieldCheck,
  },
];

/* ── Component ── */

export default function ExtraServices() {
  return (
    <section className="w-full bg-[#F5F5F5]">
      <div className="max-w-[1280px] mx-auto px-6 py-6">

        <h2 className="text-[18px] font-semibold text-[#1C2434] mb-4">
          Our extra services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map(({ title, description, imageSrc, imageAlt, Icon }) => (
            <a
              key={title}
              href="#"
              className="group flex flex-col bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image + icon overlay */}
              <div className="relative h-[160px] shrink-0">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
                {/* Blue circular icon — floats over the image */}
                <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-md">
                  <Icon size={18} color="white" strokeWidth={2} />
                </div>
              </div>

              {/* Text */}
              <div className="p-4 flex flex-col gap-1.5 border-t border-[#F0F0F0]">
                <h3 className="text-[14px] font-semibold text-[#1C2434] group-hover:text-primary transition-colors leading-snug">
                  {title}
                </h3>
                <p className="text-[12px] text-[#8B96A5] leading-relaxed">
                  {description}
                </p>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
