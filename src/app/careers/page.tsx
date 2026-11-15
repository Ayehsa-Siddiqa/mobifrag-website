import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/Sections";
import { pages } from "@/lib/content";

export const metadata: Metadata = pageMetadata({ title: "Careers", description: "Join Mobifrag in Lahore and the UAE. Explore careers in fragrance and flavour oils, quality, production and sales.", path: "/careers", image: "/media/careers-hero.jpg" });

export default function Page() {
  return <ContentPage page={pages["careers"]} />;
}
