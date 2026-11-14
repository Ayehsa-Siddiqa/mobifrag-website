import type { Metadata } from "next";
import { centres, centresIntro } from "@/lib/content";
import { ContactBand, PageHero } from "@/components/Sections";
import Reveal from "@/components/Reveal";
import Visual from "@/components/Visual";

export const metadata: Metadata = { title: "Our centres" };

export default function CentresPage() {
  return (
    <>
      <PageHero page={{ eyebrow: "Worldwide", title: "Discover our centres", intro: centresIntro, tone: "teal" }} />
      <section className="mx-auto grid max-w-7xl gap-x-10 gap-y-16 px-5 py-20 sm:grid-cols-2 md:px-10 md:py-28 lg:grid-cols-4">
        {centres.map((c, i) => (
          <Reveal key={c.region} delay={i * 100}>
            <Visual src={c.image} tone={c.tone} sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-square w-full" />
            <p className="eyebrow mt-6 text-henna-deep">{c.region}</p>
            <h2 className="mt-3 text-2xl font-light tracking-tight">{c.city}</h2>
            <p className="mt-1 font-light text-ink/60">{c.role}</p>
            <address className="mt-4 space-y-0.5 text-sm font-light not-italic text-ink/70">
              {c.address.map((l) => (
                <p key={l}>{l}</p>
              ))}
              {c.phone && <p className="pt-2">Tel. {c.phone}</p>}
            </address>
          </Reveal>
        ))}
      </section>
      <ContactBand />
    </>
  );
}
