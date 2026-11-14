"use client";

import { useState } from "react";
import { site } from "@/lib/content";

const field =
  "w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 font-light outline-none transition-colors placeholder:text-ink/40 focus:border-henna";

/**
 * Opens the visitor's email app with the message pre-filled.
 * Replace with a real endpoint (API route, Formspree, etc.) when ready.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `[${data.get("topic")}] Message from ${data.get("name")}`;
    const body = `${data.get("message")}\n\n${data.get("name")}\n${data.get("company")}\n${data.get("email")}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2">
      <input name="name" required placeholder="Full name *" className={field} />
      <input name="company" placeholder="Company" className={field} />
      <input name="email" type="email" required placeholder="Email *" className={field} />
      <select name="topic" className={field} defaultValue="Fragrances">
        <option>Fragrances</option>
        <option>Flavours</option>
        <option>Ingredients</option>
        <option>Careers</option>
        <option>Other</option>
      </select>
      <textarea name="message" required rows={6} placeholder="Your message *" className={`${field} sm:col-span-2`} />
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="eyebrow bg-henna-deep px-10 py-4 text-white transition-colors hover:bg-henna-night"
        >
          Send message
        </button>
        {sent && <p className="mt-4 text-sm text-henna-deep">Your email app should open with your message ready to send.</p>}
      </div>
    </form>
  );
}
