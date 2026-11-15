import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/Sections";
import { pages } from "@/lib/content";

export const metadata: Metadata = pageMetadata({ title: "Fragrance Oils for Perfumes, Soaps & Cosmetics", description: "Bulk fragrance oils for perfumes, attars, soaps, shampoos and cosmetics. Industrial and cosmetic fragrances supplied by the kilogram from Lahore and the UAE.", path: "/fragrances", image: "/media/banner-fragrances.jpg" });

export default function Page() {
  return <ContentPage page={pages["fragrances"]} />;
}
