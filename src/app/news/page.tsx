import type { Metadata } from "next";
import { news } from "@/lib/content";
import NewsCard from "@/components/NewsCard";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-28 pt-36 md:px-10 md:pt-44">
      <Reveal>
        <p className="eyebrow text-henna-deep">Mobifrag</p>
        <h1 className="mt-5 text-5xl font-light tracking-tight md:text-7xl">News</h1>
      </Reveal>
      <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((n, i) => (
          <Reveal key={n.slug} delay={(i % 3) * 100}>
            <NewsCard item={n} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
