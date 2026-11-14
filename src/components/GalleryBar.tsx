"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type GalleryItem = { image: string; label: string };

/**
 * Full-width gallery bar: tall images edge to edge that can be dragged,
 * scrolled or stepped through with arrows, with a progress line and counter.
 */
export default function GalleryBar({ items, title }: { items: GalleryItem[]; title?: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(1);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    const first = el.children[0] as HTMLElement | undefined;
    const step = first ? first.offsetWidth + 12 : 1;
    setCurrent(Math.min(items.length, Math.round(el.scrollLeft / step) + 1));
  }, [items.length]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (!el || !first) return;
    el.scrollBy({ left: dir * (first.offsetWidth + 12), behavior: "smooth" });
  };

  // Mouse drag to scroll (touch already scrolls natively)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
    track.current.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || !track.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    track.current.scrollLeft = drag.current.left - dx;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!track.current) return;
    if (track.current.hasPointerCapture(e.pointerId)) track.current.releasePointerCapture(e.pointerId);
    drag.current = null;
  };

  return (
    <section id="gallery" className="scroll-mt-20 bg-gradient-to-br from-[#8a8a44] via-henna to-henna-deep py-16 text-cream md:py-24" aria-label={title ?? "Gallery"}>
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-5 md:px-10">
        {title && <h2 className="text-3xl font-light uppercase leading-tight tracking-[0.06em] md:text-[2.6rem]">{title}</h2>}
        <div className="flex shrink-0 items-center gap-3">
          <span className="eyebrow mr-2 hidden text-cream/60 sm:inline">
            {String(current).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => step(dir)}
              aria-label={dir < 0 ? "Previous image" : "Next image"}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/30 transition-colors hover:border-cream hover:bg-cream hover:text-henna-night"
            >
              <span aria-hidden>{dir < 0 ? "←" : "→"}</span>
            </button>
          ))}
        </div>
      </div>

      <ul
        ref={track}
        onScroll={measure}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="mt-10 flex cursor-grab snap-x snap-mandatory scroll-pl-5 gap-3 overflow-x-auto scroll-smooth px-5 md:scroll-pl-10 [scrollbar-width:none] active:cursor-grabbing md:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((it, i) => (
          <li
            key={it.image + i}
            className="group relative h-[62svh] min-h-[380px] w-[78vw] shrink-0 snap-start overflow-hidden sm:w-[46vw] lg:w-[30vw]"
          >
            <Image
              src={it.image}
              alt={it.label}
              fill
              draggable={false}
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 78vw"
              className="select-none object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-henna-deep/70 to-transparent" aria-hidden />
            <p className="eyebrow absolute bottom-5 left-5 text-white">{it.label}</p>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-8 max-w-7xl px-5 md:px-10">
        <div className="h-px w-full bg-cream/20">
          <div className="h-px bg-cream transition-[width] duration-200" style={{ width: `${Math.max(8, progress * 100)}%` }} />
        </div>
      </div>
    </section>
  );
}
