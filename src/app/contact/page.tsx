import type { Metadata } from "next";
import { site } from "@/lib/content";
import ContactForm from "./ContactForm";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/ContactIcons";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-16 px-5 pb-28 pt-36 md:grid-cols-[1fr_1.3fr] md:px-10 md:pt-44">
      <div>
        <p className="eyebrow text-henna-deep">Get in touch</p>
        <h1 className="mt-5 text-5xl font-light tracking-tight md:text-7xl">Contact</h1>
        <p className="mt-8 max-w-md text-lg font-light leading-relaxed text-ink/70">
          Tell us about your project and the right team will get back to you.
        </p>
        <address className="mt-12 space-y-5 font-light not-italic text-ink/70">
          <p className="flex gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-henna-mist text-henna-deep">
              <PinIcon className="h-5 w-5" />
            </span>
            <span className="pt-2">{site.address.join(", ")}</span>
          </p>
          <p className="flex items-center gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-henna-mist text-henna-deep">
              <MailIcon className="h-5 w-5" />
            </span>
            <a href={`mailto:${site.email}`} className="text-ink hover:text-henna">
              {site.email}
            </a>
          </p>
          <p className="flex items-center gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-henna-mist text-henna-deep">
              <PhoneIcon className="h-5 w-5" />
            </span>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-ink hover:text-henna">
              {site.phone}
            </a>
          </p>
        </address>
      </div>
      <ContactForm />
    </section>
  );
}
