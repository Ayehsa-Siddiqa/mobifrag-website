import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/content";
import { MailIcon, PhoneIcon, PinIcon } from "./ContactIcons";

export default function Footer() {
  return (
    <footer className="bg-henna-night text-cream">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-10">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image src="/brand/logo-light.png" alt="Mobifrag" width={538} height={162} className="h-14 w-auto" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/70">{site.description}</p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow mb-5 text-cream/50">Explore</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-cream/80 transition-colors hover:text-henna">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-5 text-cream/50">Contact</p>
            <address className="space-y-3 text-sm not-italic text-cream/80">
              <p className="flex gap-3">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-henna" />
                <span>{site.address.join(", ")}</span>
              </p>
              <p className="flex items-center gap-3">
                <MailIcon className="h-4 w-4 shrink-0 text-henna" />
                <a href={`mailto:${site.email}`} className="hover:text-henna">
                  {site.email}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <PhoneIcon className="h-4 w-4 shrink-0 text-henna" />
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-henna">
                  {site.phone}
                </a>
              </p>
            </address>
            <div className="mt-6 flex gap-5">
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="eyebrow text-cream/70 hover:text-henna">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-cream/15 pt-8 text-xs text-cream/50 md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-henna">Privacy policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
