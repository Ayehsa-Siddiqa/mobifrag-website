"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type HeroScene = { video: string; poster: string; label: string };

const SCENE_MS = 7000;

/**
 * Full-screen video hero that cross-fades between several clips ("view after view"),
 * with a mehandi-green tint. Only the active and next clips are loaded.
 */
export default function HeroSlideshow({ scenes }: { scenes: HeroScene[] }) {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const next = useCallback(() => setActive((i) => (i + 1) % scenes.length), [scenes.length]);

  // Advance on a timer
  useEffect(() => {
    if (reduced || scenes.length < 2) return;
    const t = setTimeout(next, SCENE_MS);
    return () => clearTimeout(t);
  }, [active, reduced, next, scenes.length]);

  // Play the active clip from the start, pause the others
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (i === active && !reduced) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active, reduced]);

  const nextIndex = (active + 1) % scenes.length;

  return (
    <>
      <div className="absolute inset-0" aria-hidden>
        {scenes.map((s, i) => {
          const load = i === active || i === nextIndex;
          return (
            <video
              key={s.video}
              ref={(el) => {
                videos.current[i] = el;
              }}
              className={`absolute inset-0 h-full w-full scale-105 object-cover transition-[opacity,transform] duration-[1600ms] ease-out ${
                i === active ? "scale-100 opacity-100" : "opacity-0"
              }`}
              src={load && !reduced ? s.video : undefined}
              poster={s.poster}
              muted
              loop
              playsInline
              preload={load ? "auto" : "none"}
            />
          );
        })}
      </div>

      {/* Mehandi-green tint */}
      <div className="absolute inset-0 bg-henna-night/45 mix-blend-multiply" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-t from-henna-night/85 via-henna-night/15 to-henna-night/40"
        aria-hidden
      />

      {/* Scene indicator */}
      {scenes.length > 1 && (
        <div className="absolute inset-x-0 bottom-6 z-10 mx-auto flex max-w-7xl justify-center px-5 md:justify-end md:bottom-10 md:px-10">
          {/* Equal-width columns, each as wide as the longest label */}
          <div className="grid grid-flow-col auto-cols-fr gap-3 md:gap-8">
          {scenes.map((s, i) => (
            <button
              key={s.label}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${s.label}`}
              aria-current={i === active}
              className="group w-16 text-left md:w-auto md:min-w-28"
            >
              <span className="block h-px w-full overflow-hidden bg-white/30">
                <span
                  key={`${i}-${active}`}
                  className={`block h-full bg-henna-mist ${i === active && !reduced ? "animate-[hero-progress_7s_linear_forwards]" : i === active ? "w-full" : "w-0"}`}
                />
              </span>
              <span
                className={`eyebrow mt-3 hidden whitespace-nowrap text-[0.6rem] transition-opacity md:block ${
                  i === active ? "opacity-100" : "opacity-50 group-hover:opacity-80"
                }`}
              >
                {s.label}
              </span>
            </button>
          ))}
          </div>
        </div>
      )}
    </>
  );
}
