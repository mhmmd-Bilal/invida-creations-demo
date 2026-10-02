// Image URLs live here only.
//
// How loading works (per image, in order):
//   1. a local copy in /public/images (if you ran `npm run images`; listed in local-images.json)
//   2. the same photo from the images.unsplash.com CDN
//   3. spare wedding photos from SPARE, one after another
//   4. a quiet tonal placeholder (never a broken-image icon)
// Any failed URL is logged in the browser console as "[WedCraft] image failed: <url>" so dead IDs are easy to find.
// For guaranteed images with no dependency on Unsplash being reachable, run `npm run images` once.
import localMap from "./local-images.json";

const remote = (id, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const local = (id) => localMap[id] || null;
const urlsFor = (id) => [local(id), remote(id)].filter(Boolean);

// Spare photos, used only when an image's own URLs fail. Replace or add IDs freely.
export const SPARE_IDS = [
  "photo-1511795409834-ef04bbd61622",
  "photo-1519741497674-611481863552",
  "photo-1465495976277-4387d4b0b4c6",
  "photo-1583939003579-730e3918a45a",
  "photo-1537633552985-df8429e8048b",
  "photo-1519225421980-715cb0215aed",
  "photo-1511285560929-80b456fea0bc",
  "photo-1469371670807-013ccf25f16a",
  "photo-1532712938310-34cb3982ef74",
  "photo-1519671482749-fd09be7ccebf",
  "photo-1606216794074-735e91aa2c92",
  "photo-1520854221256-17451cc331bf",
  "photo-1583939411023-14783179e581",
  "photo-1587271407850-8d438ca9fdf2",
  "photo-1507504031003-b417219a0fde",
];

const make = (id, alt, pos = "center") => {
  const own = urlsFor(id);
  const spares = SPARE_IDS.filter((s) => s !== id).flatMap(urlsFor);
  return { id, src: own[0], alt, pos, backups: [...own.slice(1), ...spares] };
};

export const galleryImages = [
  make("photo-1583939003579-730e3918a45a", "Indian bride in traditional wedding attire", "center top"),
  make("photo-1519741497674-611481863552", "Newlywed couple embracing"),
  make("photo-1511285560929-80b456fea0bc", "Couple at their wedding"),
  make("photo-1591604466107-ec97de577aff", "Bride in traditional dress", "center top"),
  make("photo-1465495976277-4387d4b0b4c6", "Wedding ceremony"),
  make("photo-1606216794074-735e91aa2c92", "Wedding rings"),
  make("photo-1522673607200-164d1b6ce486", "Groom portrait", "center top"),
  make("photo-1519225421980-715cb0215aed", "Decorated wedding stage"),
  make("photo-1537633552985-df8429e8048b", "Candid wedding moment"),
  make("photo-1460978812857-470ed1c77af0", "Wedding flowers"),
  make("photo-1529636798458-92182e662485", "Reception celebration"),
  make("photo-1511795409834-ef04bbd61622", "Traditional wedding details"),
  make("photo-1469371670807-013ccf25f16a", "Couple walking together"),
  make("photo-1532712938310-34cb3982ef74", "Family blessings"),
];
export const pick = (i) => galleryImages[i % galleryImages.length];
export const EVENTS = [
  { n: "01", date: "18 Dec 2026", name: "Mehndi", time: "05:00 PM" },
  { n: "02", date: "20 Dec 2026", name: "Wedding Ceremony", time: "10:30 AM" },
  { n: "03", date: "20 Dec 2026", name: "Reception", time: "07:00 PM" },
];
