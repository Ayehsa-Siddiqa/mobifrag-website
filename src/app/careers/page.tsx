import type { Metadata } from "next";
import { ContentPage } from "@/components/Sections";
import { pages } from "@/lib/content";

export const metadata: Metadata = { title: "Careers" };

export default function Page() {
  return <ContentPage page={pages["careers"]} />;
}
