import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { story } from "@/lib/content";
import { ContactBand, PageHero } from "@/components/Sections";
import Reveal from "@/components/Reveal";
import Visual from "@/components/Visual";

export const metadata: Metadata = pageMetadata({ title: "Our Story", description: "From a small team in Lahore in 2016 to a trusted bulk supplier of fragrance and flavour oils across Pakistan and the UAE.", path: "/our-story", image: "/media/story-hero.jpg" });

export default function StoryPage() {
  return (
    <>
      <PageHero page={{ ...story, tone: "rose" }} />

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
        <ol className="relative space-y-20 md:space-y-28 md:before:absolute md:before:inset-y-0 md:before:left-1/2 md:before:w-px md:before:bg-ink/15">
          {story.timeline.map((m, i) => (
            <li key={i} className="relative grid items-center gap-8 md:grid-cols-2 md:gap-20">
              <span
                aria-hidden
                className="absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-henna ring-8 ring-white md:block"
              />
              <Reveal className={i % 2 ? "md:order-2" : ""}>
                <Visual src={m.image} tone={m.tone} sizes="(min-width: 768px) 40vw, 100vw" className="aspect-[4/3] w-full" />
              </Reveal>
              <Reveal delay={120} className={i % 2 ? "md:text-right" : ""}>
                <p className="text-6xl font-light tracking-tight text-henna-deep md:text-7xl">{m.year}</p>
                <h2 className="mt-4 text-2xl font-light uppercase tracking-[0.08em]">{m.title}</h2>
                <p className="mt-3 text-lg font-light leading-relaxed text-ink/70">{m.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <ContactBand />
    </>
  );
}
