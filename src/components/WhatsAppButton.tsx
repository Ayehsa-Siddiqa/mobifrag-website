import { site } from "@/lib/content";

/** Floating WhatsApp chat button, fixed to the bottom-right corner on every page. */
export default function WhatsAppButton() {
  const number = site.whatsapp.replace(/\D/g, "");
  // Never show a broken link on the live site; while the number is missing it only appears in development.
  if (!number && process.env.NODE_ENV === "production") return null;

  const href = number
    ? `https://wa.me/${number}?text=${encodeURIComponent(site.whatsappMessage)}`
    : "#set-whatsapp-number-in-content-ts";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Mobifrag on WhatsApp"
      className="group fixed bottom-5 right-5 z-30 flex items-center gap-3 md:bottom-8 md:right-8"
    >
      {/* Label slides in on hover (desktop) */}
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-white px-4 py-2 text-sm font-normal text-ink opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block">
        Chat with us
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-110 md:h-16 md:w-16">
        {/* Soft attention ring (disabled for reduced-motion users) */}
        <span aria-hidden className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 motion-safe:animate-ping [animation-duration:2.5s]" />
        <svg aria-hidden viewBox="0 0 32 32" className="relative h-7 w-7 md:h-8 md:w-8" fill="currentColor">
          <path d="M16.004 3C9.38 3 4 8.38 4 15.004c0 2.117.553 4.183 1.604 6.004L4 29l8.2-1.574a11.94 11.94 0 0 0 3.804.62h.004C22.624 28.046 28 22.666 28 16.04 28 12.85 26.756 9.85 24.5 7.594A11.92 11.92 0 0 0 16.004 3Zm0 22.94h-.003a9.9 9.9 0 0 1-5.05-1.384l-.362-.215-4.866.934.95-4.738-.236-.376a9.87 9.87 0 0 1-1.52-5.257c0-5.468 4.45-9.918 9.92-9.918 2.65 0 5.14 1.033 7.012 2.907a9.85 9.85 0 0 1 2.903 7.013c-.002 5.469-4.452 9.919-9.918 9.919Zm5.44-7.43c-.298-.149-1.763-.87-2.036-.97-.273-.099-.472-.148-.67.15-.199.298-.77.97-.944 1.168-.174.199-.348.224-.646.075-.298-.15-1.258-.464-2.397-1.48-.886-.79-1.484-1.766-1.658-2.064-.174-.298-.018-.459.13-.608.135-.133.299-.348.448-.522.149-.174.198-.298.298-.497.099-.199.05-.373-.025-.522-.075-.149-.67-1.616-.918-2.212-.242-.581-.487-.502-.67-.512l-.57-.01a1.094 1.094 0 0 0-.795.373c-.273.298-1.043 1.019-1.043 2.485 0 1.467 1.068 2.884 1.217 3.083.149.199 2.1 3.207 5.09 4.497.711.307 1.266.49 1.699.628.714.227 1.364.195 1.878.118.573-.085 1.763-.72 2.012-1.417.248-.696.248-1.292.174-1.417-.075-.124-.273-.199-.571-.348Z" />
        </svg>
      </span>
    </a>
  );
}
