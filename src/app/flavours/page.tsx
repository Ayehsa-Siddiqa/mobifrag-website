import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/Sections";
import { pages } from "@/lib/content";

export const metadata: Metadata = pageMetadata({ title: "Flavour Oils for Drinks, Sharbat & Food", description: "Bulk flavour oils for beverages, sharbat, syrups and food products. Consistent, high-quality flavours supplied by the kilogram from Pakistan and the UAE.", path: "/flavours", image: "/media/banner-flavours.jpg" });

export default function Page() {
  return <ContentPage page={pages["flavours"]} />;
}
