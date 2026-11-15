// Fetches Pixabay photos for image slots that are still empty.
// Usage:  node scripts/fetch-pixabay.mjs              (fill all empty slots)
//         node scripts/fetch-pixabay.mjs slot-name    (one slot, picks a different photo)
//         node scripts/fetch-pixabay.mjs --videos "query"   (list hero video candidates)
//         node scripts/fetch-pixabay.mjs --video <id>       (download a video as /media/hero.mp4)
// Needs PIXABAY_API_KEY in .env.local
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
const KEY = process.env.PIXABAY_API_KEY;
if (!KEY) {
  console.error("Missing PIXABAY_API_KEY in .env.local");
  process.exit(1);
}

// slot -> search query + orientation (vertical | horizontal | all)
const slots = {
  "home-knowhow": { q: "essential oil bottles", o: "vertical" },
  "home-responsibility": { q: "flower harvest", o: "vertical" },
  "home-worldwide": { q: "spices market", o: "vertical" },
  "frag-fine": { q: "perfume bottle flowers", o: "vertical" },
  "frag-care": { q: "candle soap spa", o: "vertical" },
  "frag-insight": { q: "woman smelling flower", o: "vertical" },
  "flav-beverages": { q: "lemonade glass citrus", o: "vertical" },
  "flav-lab": { q: "chef plating food", o: "vertical" },
  "ingr-sourcing": { q: "jasmine flowers", o: "vertical" },
  "ingr-quality": { q: "dropper bottle essential oil", o: "vertical" },
  "about-hero": { q: "distillation copper still", o: "horizontal" },
  "about-mission": { q: "white flower dark background", o: "vertical" },
  "about-teams": { q: "laboratory pipette", o: "vertical" },
  "about-values": { q: "sage leaves", o: "vertical" },
  "story-hero": { q: "lavender field", o: "horizontal" },
  "story-beginning": { q: "vintage perfume bottle", o: "vertical" },
  "story-growth": { q: "vanilla beans", o: "vertical" },
  "story-today": { q: "modern laboratory", o: "vertical" },
  "csr-hero": { q: "green leaves sunlight", o: "horizontal" },
  "csr-planet": { q: "tree bark texture", o: "vertical" },
  "csr-people": { q: "team meeting office", o: "vertical" },
  "csr-communities": { q: "farmer field harvest", o: "vertical" },
  "careers-hero": { q: "scientists laboratory team", o: "horizontal" },
  "careers-why": { q: "scientist woman laboratory", o: "vertical" },
  "centre-europe": { q: "provence village", o: "all" },
  "centre-middleeast": { q: "dubai skyline", o: "all" },
  "centre-asia": { q: "lahore badshahi mosque", o: "all" },
  "centres-hero": { q: "dubai skyline", o: "horizontal" },
  "centre-americas": { q: "new york street", o: "all" },
  "news-centre": { q: "modern interior design", o: "horizontal" },
  "news-tradeshow": { q: "exhibition hall", o: "horizontal" },
  "news-sourcing": { q: "mimosa flowers", o: "horizontal" },
  "news-csr": { q: "wood chips", o: "horizontal" },
};

const mediaDir = path.join(root, "public", "media");
const creditsFile = path.join(root, "src", "lib", "photo-credits.json");
fs.mkdirSync(mediaDir, { recursive: true });
const credits = fs.existsSync(creditsFile) ? JSON.parse(fs.readFileSync(creditsFile, "utf8")) : {};
const used = new Set(Object.values(credits).map((c) => c.id));

async function api(endpoint, params) {
  const url = `https://pixabay.com/api/${endpoint}?key=${KEY}&safesearch=true&${new URLSearchParams(params)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json();
}

async function download(url, file) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status}`);
  fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
}

const args = process.argv.slice(2);

if (args[0] === "--videos") {
  const data = await api("videos/", { q: args[1] ?? "flowers", per_page: 12, order: "popular" });
  for (const v of data.hits) {
    console.log(`${v.id}\t${v.duration}s\t${v.videos.large.width}x${v.videos.large.height}\t${v.tags}\t${v.videos.large.thumbnail}`);
  }
  process.exit(0);
}

if (args[0] === "--video") {
  const data = await api("videos/", { id: args[1] });
  const v = data.hits[0];
  const src = v.videos.large.url || v.videos.medium.url;
  await download(src, path.join(mediaDir, "hero.mp4"));
  credits["hero-video"] = { id: `pixabay-video-${v.id}`, source: "Pixabay", author: v.user, authorUrl: `https://pixabay.com/users/${v.user}-${v.user_id}/`, photoUrl: v.pageURL };
  fs.writeFileSync(creditsFile, JSON.stringify(credits, null, 2) + "\n");
  console.log(`✓ hero.mp4 (${v.videos.large.width}x${v.videos.large.height}, ${v.duration}s) by ${v.user}`);
  process.exit(0);
}

// Args may be "slot" or "slot=custom search query"
const only = [];
for (const a of args.filter((x) => !x.startsWith("--"))) {
  const [slot, query] = a.split("=");
  if (!slots[slot]) {
    console.warn(`Unknown slot: ${slot}`);
    continue;
  }
  if (query) slots[slot].q = query;
  only.push(slot);
}

for (const [slot, { q, o }] of Object.entries(slots)) {
  if (only.length && !only.includes(slot)) continue;
  const file = path.join(mediaDir, `${slot}.jpg`);
  if (!only.length && fs.existsSync(file)) continue;
  try {
    const params = { q, image_type: "photo", orientation: o, per_page: 20, order: "popular" };
    let data = await api("", { ...params, editors_choice: "true" });
    if (data.hits.length < 3) data = await api("", params);
    const photo = data.hits.find((p) => !used.has(`pixabay-${p.id}`));
    if (!photo) {
      console.warn(`✗ ${slot}: no results for "${q}"`);
      continue;
    }
    used.add(`pixabay-${photo.id}`);
    await download(photo.largeImageURL, file);
    credits[slot] = {
      id: `pixabay-${photo.id}`,
      source: "Pixabay",
      author: photo.user,
      authorUrl: `https://pixabay.com/users/${photo.user}-${photo.user_id}/`,
      photoUrl: photo.pageURL,
    };
    console.log(`✓ ${slot}: ${photo.user}`);
  } catch (e) {
    console.warn(`✗ ${slot}: ${e.message}`);
  }
}

fs.writeFileSync(creditsFile, JSON.stringify(credits, null, 2) + "\n");
console.log(`Saved credits to ${path.relative(root, creditsFile)}`);
