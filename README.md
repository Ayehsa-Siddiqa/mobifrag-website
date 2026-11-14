# Mobifrag website

Next.js 16 (App Router) + Tailwind CSS 4.

## Run

```bash
npm run dev     # http://localhost:3000
npm run build && npm start   # production
```

## Where things live

| What | Where |
| --- | --- |
| All text (pages, news, centres, contact details, nav) | `src/lib/content.ts` |
| Logos & favicon | `public/brand/`, `src/app/icon.png` |
| Your photos & video | `public/media/` |
| Colours & font | `src/app/globals.css`, `src/app/layout.tsx` |
| Header / footer / sections | `src/components/` |

## Adding your own images and video

1. Put files in `public/media/` (e.g. `public/media/fragrances.jpg`).
2. In `src/lib/content.ts`, set `image: "/media/fragrances.jpg"` on any section, expertise or news item,
   or `heroImage` on a page. Until an image is set, a soft colour placeholder is shown.
3. For the homepage film, add `public/media/hero.mp4` and set `heroVideo: "/media/hero.mp4"`.

## Contact form

The form currently opens the visitor's email app. Connect it to a real backend (API route, Formspree, Resend…) in `src/app/contact/ContactForm.tsx`.
