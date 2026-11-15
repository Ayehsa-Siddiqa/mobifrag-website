"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Muted looping background video that only starts loading when it scrolls near the screen.
 * Sits on top of the poster image, which stays visible for reduced-motion users.
 */
export default function LazyVideo({ src, poster }: { src: string; poster?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} className="absolute inset-0" aria-hidden>
      {load && (
        <video
          className="h-full w-full object-cover"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
        />
      )}
    </div>
  );
}
