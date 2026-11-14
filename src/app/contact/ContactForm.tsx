"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContact, type ContactState } from "./actions";

const field =
  "w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 font-light outline-none transition-colors placeholder:text-ink/40 focus:border-henna";

const initialState: ContactState = { status: "idle", message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="grid gap-8 sm:grid-cols-2">
      <input name="name" required maxLength={120} placeholder="Full name *" className={field} />
      <input name="company" maxLength={160} placeholder="Company" className={field} />
      <input name="email" type="email" required maxLength={200} placeholder="Email *" className={field} />
      <select name="topic" className={field} defaultValue="Fragrances">
        <option>Fragrances</option>
        <option>Flavours</option>
        <option>Ingredients</option>
        <option>Careers</option>
        <option>Other</option>
      </select>
      <textarea name="message" required maxLength={5000} rows={6} placeholder="Your message *" className={`${field} sm:col-span-2`} />
      {/* Honeypot field for bots — hidden from people and screen readers */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="eyebrow bg-henna-deep px-10 py-4 text-white transition-colors hover:bg-henna-night disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        <p
          aria-live="polite"
          className={`mt-4 text-sm ${state.status === "error" ? "text-red-700" : "text-henna-deep"}`}
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}
