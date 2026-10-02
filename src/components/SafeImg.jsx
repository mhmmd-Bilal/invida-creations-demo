import { useState } from "react";
// Tries the image's own src, then each backup in turn. Only if every URL fails does it show a quiet placeholder.
export default function SafeImg({ im, className, loading, style }) {
  const urls = [im.src, ...(im.backups || [])];
  const [i, setI] = useState(0);
  if (i >= urls.length) return <div className={"img-fallback " + (className || "")} role="img" aria-label={im.alt} />;
  return <img className={className} src={urls[i]} alt={im.alt} loading={loading} referrerPolicy="no-referrer" decoding="async"
    style={{ objectPosition: im.pos, ...style }} onError={() => { console.warn("[WedCraft] image failed:", urls[i]); setI((n) => n + 1); }} />;
}
