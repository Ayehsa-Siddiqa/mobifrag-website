import Image from "next/image";
import Link from "next/link";
import { expertises, homeSections, news, site } from "@/lib/content";
import { ArrowLink, ContactBand, ImageText } from "@/components/Sections";
import FullBleed from "@/components/FullBleed";
import GalleryBar from "@/components/GalleryBar";
import HeroSlideshow from "@/components/HeroSlideshow";
import NewsCard from "@/components/NewsCard";
import Reveal from "@/components/Reveal";
import Visual from "@/components/Visual";

export default function Home() {
  return (
    <>
      {/* Full-screen hero */}
      <section className="relative flex h-svh min-h-[560px] items-end overflow-hidden text-white">
        {site.heroScenes.length > 0 ? (
          <HeroSlideshow scenes={site.heroScenes} />
        ) : site.heroImage ? (
          <Image
            src={site.heroImage}
            alt=""
            fill
            preload
            quality={90}
            sizes="100vw"
            className="hero-zoom object-cover"
          />
        ) : (
          <div className="hero-gradient absolute inset-0" aria-hidden />
        )}
        {site.heroScenes.length === 0 && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" aria-hidden />
        )}

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 md:px-10 md:pb-32">
          <Reveal>
            <p className="eyebrow text-white/80">{site.tagline}</p>
            <h1 className="mt-6 max-w-4xl text-[2.6rem] font-light leading-[1.05] tracking-tight sm:text-6xl md:text-8xl">
              Creating emotions, one drop at a time
            </h1>
            <div className="mt-10">
              <ArrowLink href="/about" light>
                Discover Mobifrag
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-4xl px-5 py-24 text-center md:py-36">
        <Reveal>
          <Image src="/brand/favicon.png" alt="" width={32} height={32} className="mx-auto h-8 w-8 rounded-md" />
          <p className="mt-10 text-2xl font-light leading-relaxed tracking-tight md:text-4xl">
            Mobifrag designs fragrance oils and flavours for brands that want to be felt, noticed and
            remembered.
          </p>
        </Reveal>
      </section>

      {/* Expertises */}
      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-10 md:pb-28">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 md:gap-10">
          {expertises.map((e, i) => (
            <Reveal key={e.href} delay={i * 120}>
              <Link href={e.href} className="group block">
                <div className="overflow-hidden">
                  <Visual
                    src={e.image}
                    alt={e.title}
                    tone={e.tone}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="aspect-[619/800] w-full transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-6 flex items-baseline gap-4">
                  <span className="eyebrow text-stone">{e.eyebrow}</span>
                  <h2 className="text-3xl font-light tracking-tight transition-colors group-hover:text-henna">{e.title}</h2>
                </div>
                <p className="mt-3 max-w-sm font-light leading-relaxed text-ink/70">{e.body}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <GalleryBar
        title="The world of Mobifrag"
        items={[
          { label: "Olive & gold", image: "/media/g-olive-oil.jpg" },
          { label: "The apothecary", image: "/media/g-apothecary.jpg" },
          { label: "Golden fern", image: "/media/g-golden-fern.jpg" },
          { label: "Green glass", image: "/media/g-green-glass.jpg" },
          { label: "Brass & spice", image: "/media/g-brass-spices.jpg" },
          { label: "Golden hour", image: "/media/g-golden-hour.jpg" },
          { label: "Nature, captured", image: "/media/g-moss-sphere.jpg" },
          { label: "Deep green", image: "/media/g-fern-dark.jpg" },
        ]}
      />

      {homeSections.map((s, i) => (
        <ImageText key={s.title} section={s} reverse={i % 2 === 1} />
      ))}

      <FullBleed image="/media/band-home.jpg" video="/media/band-home.mp4" eyebrow="Mobifrag" text="Rooted in nature, refined by craft." />

      {/* Latest news carousel */}
      <section className="bg-henna-mist py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="flex items-end justify-between gap-6">
            <Reveal>
              <p className="eyebrow text-henna-deep">News</p>
              <h2 className="mt-4 text-4xl font-light tracking-tight md:text-5xl">Latest from Mobifrag</h2>
            </Reveal>
            <div className="hidden md:block">
              <ArrowLink href="/news">All news</ArrowLink>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-7xl">
          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 md:px-10 [scrollbar-width:thin]">
            {news.map((n) => (
              <div key={n.slug} className="w-[78vw] shrink-0 snap-start sm:w-[45vw] lg:w-[calc((100%-3rem)/3)]">
                <NewsCard item={n} />
              </div>
            ))}
          </div>
          <div className="mt-8 px-5 md:hidden">
            <ArrowLink href="/news">All news</ArrowLink>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
