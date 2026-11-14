import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { Tone } from "@/lib/content";

/** True if a local /public image exists (checked at build time), or the src is remote. */
function exists(src?: string) {
  if (!src) return false;
  if (!src.startsWith("/")) return true;
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

const tones: Record<Tone, string> = {
  teal: "from-[#cfe7e3] via-[#8fc9c0] to-[#2f6f68]",
  sand: "from-[#f6f1e8] via-[#e3d6c1] to-[#b8a585]",
  ink: "from-[#3a3a3a] via-[#232323] to-[#0f0f0f]",
  rose: "from-[#f6e6e1] via-[#e2bfb4] to-[#a8786c]",
  olive: "from-[#e9ecdc] via-[#b9c29a] to-[#5d6b44]",
  amber: "from-[#f8ead2] via-[#e7c58f] to-[#a9763a]",
};

/** Shows an image if `src` is set, otherwise a soft tonal placeholder. Always carries the Mobifrag drop. */
export default function Visual({
  src,
  alt = "",
  tone = "sand",
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  preload = false,
}: {
  src?: string;
  alt?: string;
  tone?: Tone;
  className?: string;
  sizes?: string;
  preload?: boolean;
}) {
  return (
    <div className={`mask-reveal relative overflow-hidden ${className}`}>
      {exists(src) ? (
        <Image src={src!} alt={alt} fill sizes={sizes} preload={preload} className="object-cover" />
      ) : (
        <div aria-hidden className={`absolute inset-0 bg-gradient-to-br ${tones[tone]}`}>
          <div className="absolute -right-1/4 -top-1/4 h-3/4 w-3/4 rounded-full bg-white/25 blur-3xl" />
          <div className="absolute -bottom-1/4 -left-1/4 h-2/3 w-2/3 rounded-full bg-black/10 blur-3xl" />
        </div>
      )}
      <DropMark />
    </div>
  );
}

/** Mobifrag drop in the bottom-right corner. */
function DropMark() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/25 backdrop-blur-sm md:bottom-6 md:right-6"
    >
      <svg viewBox="0 0 24 32" className="h-5 w-4">
        <path fill="#a3a452" d="M12 0C12 0 0 13 0 21a12 12 0 0 0 24 0C24 13 12 0 12 0Z" />
        <path fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" d="M8 19.5a5 5 0 0 0 3 5" />
      </svg>
    </span>
  );
}
