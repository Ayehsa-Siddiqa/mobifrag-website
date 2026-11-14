import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { news } from "@/lib/content";
import { formatDate } from "@/components/NewsCard";
import { ArrowLink } from "@/components/Sections";
import Visual from "@/components/Visual";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  return { title: item?.title ?? "News" };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  if (!item) notFound();

  return (
    <article className="pb-28 pt-36 md:pt-44">
      <header className="mx-auto max-w-3xl px-5">
        <p className="eyebrow text-stone">
          {item.category} · {formatDate(item.date)}
        </p>
        <h1 className="mt-5 text-4xl font-light leading-tight tracking-tight md:text-6xl">{item.title}</h1>
      </header>
      <Visual
        src={item.image}
        alt={item.title}
        tone={item.tone}
        preload
        sizes="(min-width: 1024px) 1024px, 100vw"
        className="mx-auto mt-14 aspect-[16/9] w-full max-w-5xl"
      />
      <div className="mx-auto mt-14 max-w-3xl space-y-6 px-5 text-lg font-light leading-relaxed text-ink/75">
        {item.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <div className="pt-10">
          <ArrowLink href="/news">Back to news</ArrowLink>
        </div>
      </div>
    </article>
  );
}
