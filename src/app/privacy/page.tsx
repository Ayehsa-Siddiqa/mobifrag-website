import type { Metadata } from "next";
import { site } from "@/lib/content";

export const metadata: Metadata = { title: "Privacy policy" };

const updated = "11 November 2026";

export default function PrivacyPage() {
  const h2 = "mt-12 text-2xl text-ink";
  const p = "mt-4";

  return (
    <section className="mx-auto max-w-3xl px-5 pb-28 pt-36 font-light leading-relaxed text-ink/75 md:pt-44">
      <h1 className="text-5xl font-light tracking-tight text-ink">Privacy policy</h1>
      <p className="mt-6 text-sm text-ink/50">Last updated: {updated}</p>

      <p className="mt-10">
        This policy explains what information {site.name} collects when you visit this website, how we use it and the
        choices you have. We keep it simple: we only collect what we need to reply to you.
      </p>

      <h2 className={h2}>Who we are</h2>
      <p className={p}>
        {site.name}, {site.address.join(", ")}. For any question about this policy or your data, email us at{" "}
        <a href={`mailto:${site.email}`} className="underline hover:text-henna">
          {site.email}
        </a>
        .
      </p>

      <h2 className={h2}>Information we collect</h2>
      <p className={p}>
        <strong className="font-normal text-ink">When you contact us.</strong> The contact form opens your own email
        app with your message pre-filled. Nothing is stored on this website. When you send the email, we receive your
        name, email address, company (if given) and your message, just like any other email.
      </p>
      <p className={p}>
        <strong className="font-normal text-ink">When you browse.</strong> This website does not use cookies,
        analytics or advertising trackers. Like any website, our hosting provider may keep basic technical logs (such
        as IP address, browser type and pages requested) for security and to keep the site running.
      </p>

      <h2 className={h2}>How we use your information</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5">
        <li>To reply to your enquiry and discuss your project.</li>
        <li>To send quotes, samples or information you have asked for.</li>
        <li>To meet our legal and accounting obligations if we do business together.</li>
      </ul>
      <p className={p}>We do not sell, rent or trade your personal information, and we do not send marketing emails you have not asked for.</p>

      <h2 className={h2}>Sharing</h2>
      <p className={p}>
        We only share your information with service providers that help us run our business (for example our email
        and hosting providers), or when the law requires it.
      </p>

      <h2 className={h2}>How long we keep it</h2>
      <p className={p}>
        We keep enquiry emails for as long as needed to handle your request and any business relationship that
        follows, then delete them when they are no longer needed.
      </p>

      <h2 className={h2}>Your choices</h2>
      <p className={p}>
        You can ask us at any time to see, correct or delete the personal information we hold about you. Just email{" "}
        <a href={`mailto:${site.email}`} className="underline hover:text-henna">
          {site.email}
        </a>{" "}
        and we will respond as soon as possible.
      </p>

      <h2 className={h2}>Links to other websites</h2>
      <p className={p}>
        This site may link to other websites, such as our social media pages. Their own privacy policies apply when you
        visit them.
      </p>

      <h2 className={h2}>Changes to this policy</h2>
      <p className={p}>
        We may update this policy from time to time. The date at the top of this page shows when it was last changed.
      </p>
    </section>
  );
}
