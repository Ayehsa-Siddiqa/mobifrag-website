"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Full-window image (or video) band with a slow parallax drift and a short statement.
 * Used between content blocks to give pages an editorial rhythm.
 * A video only loads once the band is near the screen; the image is its poster.
 */
export default function FullBleed({
  image,
  video,
  eyebrow,
  text,
}: {
  image: string;
  video?: string;
  eyebrow?: string;
  text: string;
}) {
  const section = useRef<HTMLElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);

  // Start loading the video when the band approaches the viewport
  useEffect(() => {
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadVideo(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [video]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = section.current;
      const img = layer.current;
      if (!el || !img) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 when the band enters from below, +1 when it leaves at the top
      const p = Math.max(-1, Math.min(1, (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2)));
      img.style.transform = `translate3d(0, ${p * 8}%, 0) scale(1.12)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={section} id="band" className="relative flex h-[85svh] min-h-[480px] items-end overflow-hidden text-white">
      <div ref={layer} className="absolute inset-0 scale-[1.12] will-change-transform" aria-hidden>
        <Image src={image} alt="" fill sizes="100vw" quality={90} className="object-cover" />
        {video && loadVideo && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={video}
            poster={image}
            autoPlay
            muted
            loop
            playsInline
          />
        )}
      </div>
      {/* Mehandi-green brand gradient: rich behind the text, clear on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-henna-deep/85 via-henna/40 to-henna/5" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-henna-night/55 via-transparent to-transparent" aria-hidden />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 md:px-10 md:pb-24">
        {eyebrow && <p className="eyebrow text-white/75">{eyebrow}</p>}
        <p className="mt-5 max-w-3xl text-3xl font-light leading-tight tracking-tight md:text-6xl">{text}</p>
      </div>
    </section>
  );
}
