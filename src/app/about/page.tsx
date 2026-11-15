import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { about } from "@/lib/content";
import { BlockTitle, ContactBand, PageHero } from "@/components/Sections";
import FullBleed from "@/components/FullBleed";
import Reveal from "@/components/Reveal";
import Visual from "@/components/Visual";

export const metadata: Metadata = pageMetadata({ title: "About Mobifrag", description: "Mobifrag is a fragrance and flavour oil supplier with 10 years of expertise, a head office in Lahore and an international centre in the UAE.", path: "/about", image: "/media/about-hero.jpg" });

export default function AboutPage() {
  return (
    <>
      <PageHero page={{ ...about, tone: "sand" }} />

      {/* Taglines */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          {about.taglines.map((t, i) => (
            <Reveal key={t} delay={i * 120}>
              <p className="border-l-2 border-henna pl-6 text-2xl font-light leading-snug tracking-tight md:text-3xl">{t}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-henna-night text-cream">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <p className="eyebrow text-henna-mist/70">Our values</p>
          </Reveal>
          <div className="mt-12 grid border-l border-t border-cream/15 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 100} className="border-b border-r border-cream/15 p-8 md:p-10">
                <span className="eyebrow text-cream/40">0{i + 1}</span>
                <h3 className="mt-6 text-2xl font-light uppercase tracking-[0.08em]">{v.title}</h3>
                <p className="mt-4 font-light leading-relaxed text-cream/70">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FullBleed image="/media/fb-about.jpg" eyebrow="Our craft" text="Hundreds of essences, one perfumer's intuition." />

      {/* Network + key figures */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-20">
          <Reveal>
            <Visual src={about.network.image} tone="teal" className="aspect-[4/5] w-full" />
          </Reveal>
          <Reveal delay={150}>
            <BlockTitle>{about.network.title}</BlockTitle>
            <div className="mt-6 space-y-4 text-lg font-light leading-relaxed text-ink/70">
              {about.network.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="mt-20 grid gap-10 border-t border-ink/10 pt-14 sm:grid-cols-3">
          {about.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 120}>
              <p className="text-6xl font-light tracking-tight text-henna-deep md:text-7xl">{s.value}</p>
              <p className="eyebrow mt-3 text-stone">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Quality */}
      <section className="bg-henna-mist">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:gap-20 md:px-10 md:py-28">
          <Reveal>
            <BlockTitle>{about.quality.title}</BlockTitle>
            <div className="mt-6 space-y-4 text-lg font-light leading-relaxed text-ink/70">
              {about.quality.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={150}>
            <Visual src={about.quality.image} tone="sand" className="aspect-[4/3] w-full" />
          </Reveal>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
