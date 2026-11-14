import Link from "next/link";
import type { NewsItem } from "@/lib/content";
import Visual from "./Visual";

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link href={`/news/${item.slug}`} className="group block">
      <div className="overflow-hidden">
        <Visual
          src={item.image}
          alt={item.title}
          tone={item.tone}
          sizes="(min-width: 1024px) 33vw, 80vw"
          className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <p className="eyebrow mt-5 text-stone">
        {item.category} · {formatDate(item.date)}
      </p>
      <h3 className="mt-3 text-xl font-light leading-snug tracking-tight transition-colors group-hover:text-henna">
        {item.title}
      </h3>
      <p className="mt-2 text-sm font-light text-ink/60">{item.excerpt}</p>
    </Link>
  );
}
