import Link from "next/link";
import type { PageContent, Section } from "@/lib/content";
import { Fragment } from "react";
import FullBleed from "./FullBleed";
import GalleryBar from "./GalleryBar";
import Reveal from "./Reveal";
import Visual from "./Visual";

export function ArrowLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`eyebrow group inline-flex items-center gap-4 border-b pb-2 transition-colors ${
        light ? "border-white/40 hover:border-white" : "border-ink/30 hover:border-henna hover:text-henna"
      }`}
    >
      {children}
      <span className="transition-transform group-hover:translate-x-1" aria-hidden>
        →
      </span>
    </Link>
  );
}

/** Uppercase two-line heading, e.g. "Taste, crafted\nwith care". */
export function BlockTitle({ children, as: Tag = "h2", className = "" }: { children: string; as?: "h1" | "h2" | "h3"; className?: string }) {
  return (
    <Tag className={`whitespace-pre-line text-3xl font-light uppercase leading-[1.1] tracking-[0.06em] md:text-[2.6rem] ${className}`}>
      {children}
    </Tag>
  );
}

export function Tags({ label, items }: { label?: string; items: string[] }) {
  return (
    <div className="mt-8">
      {label && <p className="eyebrow mb-4 text-stone">{label}</p>}
      <ul className="flex flex-wrap gap-2">
        {items.map((it) => (
          <li key={it} className="rounded-full border border-ink/15 px-4 py-2 text-sm font-light text-ink/80">
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Large image beside a text block. Alternates sides with `reverse`. */
export function ImageText({ section, reverse = false }: { section: Section; reverse?: boolean }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
      <div className={`grid items-center gap-10 md:grid-cols-2 md:gap-20 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        <Reveal>
          <Visual src={section.image} alt="" tone={section.tone} className="aspect-[4/5] w-full" />
        </Reveal>
        <Reveal delay={150} className="max-w-lg">
          <p className="eyebrow text-henna-deep">{section.eyebrow}</p>
          <BlockTitle className="mt-5">{section.title}</BlockTitle>
          <p className="mt-6 text-lg font-light leading-relaxed text-ink/70">{section.body}</p>
          {section.items && <Tags label={section.itemsLabel} items={section.items} />}
          {section.link && (
            <div className="mt-10">
              <ArrowLink href={section.link.href}>{section.link.label}</ArrowLink>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/** Full-width cream band with image + text, used to close expertise pages. */
export function ClosingBlock({ section }: { section: Section }) {
  return (
    <section className="bg-henna-mist">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-[1.1fr_1fr] md:gap-20 md:px-10 md:py-28">
        <Reveal className="max-w-xl">
          <p className="eyebrow text-henna-deep">{section.eyebrow}</p>
          <BlockTitle className="mt-5">{section.title}</BlockTitle>
          <p className="mt-6 text-lg font-light leading-relaxed text-ink/70">{section.body}</p>
          {section.link && (
            <div className="mt-10">
              <ArrowLink href={section.link.href}>{section.link.label}</ArrowLink>
            </div>
          )}
        </Reveal>
        <Reveal delay={150}>
          <Visual src={section.image} alt="" tone={section.tone} className="aspect-[4/3] w-full" />
        </Reveal>
      </div>
    </section>
  );
}

/** Page banner used on all inner pages. */
export function PageHero({
  page,
}: {
  page: Pick<PageContent, "eyebrow" | "title" | "intro" | "tone" | "heroImage"> & { heroVideo?: string };
}) {
  return (
    <section className="pt-20">
      <div className="mx-auto max-w-7xl px-5 pb-14 pt-16 md:px-10 md:pb-20 md:pt-24">
        <Reveal>
          <p className="eyebrow text-henna-deep">{page.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl whitespace-pre-line text-[2.6rem] font-light leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
            {page.title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-ink/70 md:text-xl">{page.intro}</p>
        </Reveal>
      </div>
      {page.heroVideo ? (
        <div className="relative h-[45vh] w-full overflow-hidden bg-henna-night md:h-[60vh]">
          <video
            className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
            src={page.heroVideo}
            poster={page.heroImage}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
          />
          {page.heroImage && (
            <Visual src={page.heroImage} alt="" tone={page.tone} sizes="100vw" className="hidden h-full w-full motion-reduce:block" />
          )}
        </div>
      ) : (
        <Visual src={page.heroImage} alt="" tone={page.tone} preload sizes="100vw" className="h-[45vh] w-full md:h-[60vh]" />
      )}
    </section>
  );
}

/** Dark, warm strip of raw-material photos that scrolls sideways. */
export function MaterialStrip({ items }: { items: { label: string; image: string }[] }) {
  return (
    <section className="bg-gradient-to-br from-[#8a8a44] via-henna to-henna-deep py-14 text-cream md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <p className="eyebrow text-cream/60">Our flavour palette</p>
      </div>
      <div className="mx-auto mt-8 max-w-7xl">
        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden px-5 pb-4 md:gap-6 md:px-10 [scrollbar-width:thin] [scrollbar-color:rgba(255,248,235,0.45)_transparent]">
          {items.map((it, i) => (
            <li key={it.label} className="w-[62vw] shrink-0 snap-start sm:w-[38vw] lg:w-[calc((100%-6rem)/4.5)]">
              <Reveal delay={Math.min(i, 4) * 80}>
                <div className="group overflow-hidden">
                  <Visual
                    src={it.image}
                    alt={it.label}
                    sizes="(min-width: 1024px) 22vw, 60vw"
                    className="aspect-[3/4] w-full transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="eyebrow mt-4 text-cream/80">{it.label}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Standard inner page: hero + alternating image/text sections + optional closing block. */
export function ContentPage({ page }: { page: PageContent }) {
  return (
    <>
      <PageHero page={page} />
      {page.carousel && <MaterialStrip items={page.carousel} />}
      {page.sections.map((s, i) => (
        <Fragment key={s.title}>
          <ImageText section={s} reverse={i % 2 === 1} />
          {page.bands
            ?.filter((b) => b.after === i + 1)
            .map((b) => <FullBleed key={b.image} image={b.image} eyebrow={b.eyebrow} text={b.text} />)}
          {page.gallery?.after === i + 1 && (
            <GalleryBar title={page.gallery.title.replace("\n", " ")} items={page.gallery.items} />
          )}
        </Fragment>
      ))}
      {page.closing ? <ClosingBlock section={page.closing} /> : <ContactBand />}
    </>
  );
}

export function ContactBand() {
  return (
    <section className="bg-henna-mist">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 md:flex-row md:items-center md:justify-between md:px-10">
        <Reveal>
          <p className="eyebrow text-henna-deep">Let&apos;s create together</p>
          <h2 className="mt-4 text-3xl font-light tracking-tight md:text-4xl">Have a project in mind?</h2>
        </Reveal>
        <Reveal delay={150}>
          <ArrowLink href="/contact">Contact our teams</ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
