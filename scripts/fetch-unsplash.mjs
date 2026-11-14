// Fetches Unsplash photos for every image slot on the site.
// Usage:  node scripts/fetch-unsplash.mjs            (all slots without an image yet)
//         node scripts/fetch-unsplash.mjs --force    (re-fetch everything)
//         node scripts/fetch-unsplash.mjs slot-name  (one slot, picks a different photo)
// Needs UNSPLASH_ACCESS_KEY in .env.local
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const envFile = path.join(root, ".env.local");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m) process.env[m[1]] ??= m[2].replace(/^["']|["']$/g, "");
  }
}
const KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!KEY) {
  console.error("Missing UNSPLASH_ACCESS_KEY in .env.local");
  process.exit(1);
}

// slot -> search query + orientation
const slots = {
  "home-knowhow": { q: "essential oil bottles collection", o: "portrait" },
  "home-responsibility": { q: "flower harvest field hands", o: "portrait" },
  "home-worldwide": { q: "spice market aromatic", o: "portrait" },
  "frag-fine": { q: "glass perfume bottle flowers", o: "portrait" },
  "frag-care": { q: "candle soap natural minimal", o: "portrait" },
  "frag-insight": { q: "smelling flower close up", o: "portrait" },
  "flav-beverages": { q: "citrus drink glass minimal", o: "portrait" },
  "flav-lab": { q: "chef plating gourmet dish", o: "portrait" },
  "ingr-sourcing": { q: "jasmine flowers basket", o: "portrait" },
  "ingr-quality": { q: "amber glass dropper bottles", o: "portrait" },
  "about-hero": { q: "essential oil distillation", o: "landscape" },
  "about-mission": { q: "white flower macro dark", o: "portrait" },
  "about-teams": { q: "laboratory scientist pipette", o: "portrait" },
  "about-values": { q: "sage leaf macro", o: "portrait" },
  "story-hero": { q: "lavender field sunset", o: "landscape" },
  "story-beginning": { q: "vintage perfume bottles", o: "portrait" },
  "story-growth": { q: "vanilla beans", o: "portrait" },
  "story-today": { q: "modern laboratory bright", o: "portrait" },
  "csr-hero": { q: "green leaves sunlight forest", o: "landscape" },
  "csr-planet": { q: "tree bark texture", o: "portrait" },
  "csr-people": { q: "team working together office", o: "portrait" },
  "csr-communities": { q: "farmer harvest rural", o: "portrait" },
  "careers-hero": { q: "scientists working laboratory modern", o: "landscape" },
  "careers-why": { q: "young scientist laboratory smiling", o: "portrait" },
  "centre-europe": { q: "provence village", o: "squarish" },
  "centre-middleeast": { q: "dubai architecture", o: "squarish" },
  "centre-asia": { q: "singapore city", o: "squarish" },
  "centre-americas": { q: "new york city street", o: "squarish" },
  "news-centre": { q: "modern interior showroom minimal", o: "landscape" },
  "news-tradeshow": { q: "exhibition booth event", o: "landscape" },
  "news-sourcing": { q: "mimosa yellow flowers", o: "landscape" },
  "news-csr": { q: "sandalwood chips", o: "landscape" },
};

const mediaDir = path.join(root, "public", "media");
const creditsFile = path.join(root, "src", "lib", "photo-credits.json");
fs.mkdirSync(mediaDir, { recursive: true });
const credits = fs.existsSync(creditsFile) ? JSON.parse(fs.readFileSync(creditsFile, "utf8")) : {};

const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((a) => !a.startsWith("--"));
const used = new Set(Object.values(credits).map((c) => c.id));

async function api(url) {
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${KEY}`, "Accept-Version": "v1" } });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json();
}

for (const [slot, { q, o }] of Object.entries(slots)) {
  if (only.length && !only.includes(slot)) continue;
  const file = path.join(mediaDir, `${slot}.jpg`);
  if (!force && !only.length && fs.existsSync(file)) continue;
  try {
    const data = await api(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&orientation=${o}&per_page=10&content_filter=high`,
    );
    const photo = data.results.find((p) => !used.has(p.id));
    if (!photo) {
      console.warn(`✗ ${slot}: no results for "${q}"`);
      continue;
    }
    used.add(photo.id);
    const img = await fetch(`${photo.urls.raw}&w=1800&q=80&fm=jpg&fit=max`);
    fs.writeFileSync(file, Buffer.from(await img.arrayBuffer()));
    // Required by the Unsplash API guidelines: register the download
    await api(photo.links.download_location).catch(() => {});
    credits[slot] = {
      id: photo.id,
      author: photo.user.name,
      authorUrl: `${photo.user.links.html}?utm_source=mobifrag&utm_medium=referral`,
      photoUrl: `${photo.links.html}?utm_source=mobifrag&utm_medium=referral`,
    };
    console.log(`✓ ${slot}: ${photo.user.name}`);
  } catch (e) {
    console.warn(`✗ ${slot}: ${e.message}`);
    if (String(e.message).startsWith("403")) break; // rate limited (50 req/hour on demo apps)
  }
}

fs.writeFileSync(creditsFile, JSON.stringify(credits, null, 2) + "\n");
console.log(`Saved credits to ${path.relative(root, creditsFile)}`);
