"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNav, secondaryNav } from "@/lib/content";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the menu when navigating
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const transparent = isHome && !scrolled && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          transparent
            ? "bg-transparent text-white"
            : "bg-white/95 text-ink shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
          <nav className="hidden flex-1 gap-8 lg:flex" aria-label="Expertise">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`eyebrow transition-opacity hover:opacity-60 ${
                  pathname.startsWith(item.href) ? "underline underline-offset-8" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/" aria-label="Mobifrag home" className="shrink-0 outline-none">
            <Image
              src={transparent ? "/brand/logo-light.png" : "/brand/logo-dark.png"}
              alt="Mobifrag"
              width={538}
              height={162}
              preload
              className="h-11 w-auto md:h-12"
            />
          </Link>

          <div className="flex flex-1 items-center justify-end gap-6">
            <Link href="/contact" className="eyebrow hidden transition-opacity hover:opacity-60 lg:inline">
              Contact
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            >
              <span className={`h-px w-7 bg-current transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`h-px w-7 bg-current transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-white pt-20 transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="mx-auto grid h-full max-w-7xl content-start gap-10 overflow-y-auto px-5 py-10 md:grid-cols-2 md:px-10">
          <ul className="space-y-3">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-4xl font-light tracking-tight transition-colors hover:text-henna md:text-6xl">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-4 md:pt-3">
            {secondaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="eyebrow transition-colors hover:text-henna">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
