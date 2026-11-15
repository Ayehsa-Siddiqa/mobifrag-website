import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/Sections";
import { pages } from "@/lib/content";

export const metadata: Metadata = pageMetadata({ title: "Responsibility & Sustainability", description: "How Mobifrag sources fragrance and flavour oils responsibly, supports communities and reduces its environmental impact.", path: "/csr", image: "/media/csr-hero.jpg" });

export default function Page() {
  return <ContentPage page={pages["csr"]} />;
}
