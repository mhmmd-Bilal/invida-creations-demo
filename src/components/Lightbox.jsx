import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
export default function Lightbox({ images, index, setIndex }) {
  const x0 = useRef(0), n = images.length, open = index !== null;
  const [tries, setTries] = useState({});            // per-image failed-URL count
  const urlsOf = (im) => [im.src, ...(im.backups || [])];
  const go = (d) => setIndex((i) => (i + d + n) % n);
  useEffect(() => {
    if (!open) return;
    const k = (e) => { if (e.key === "Escape") setIndex(null); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", k); document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open]);
  return (
    <AnimatePresence>{open && (
      <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        onTouchStart={(e) => (x0.current = e.touches[0].clientX)}
        onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - x0.current; if (Math.abs(d) > 50) go(d < 0 ? 1 : -1); }}>
        <button className="lb-btn lb-close" onClick={() => setIndex(null)} aria-label="Close"><X /></button>
        <button className="lb-btn lb-prev" onClick={() => go(-1)} aria-label="Previous"><ChevronLeft /></button>
        <AnimatePresence mode="wait"><motion.img key={index} className="lb-img" src={urlsOf(images[index])[Math.min(tries[index] || 0, urlsOf(images[index]).length - 1)]} referrerPolicy="no-referrer" onError={() => { console.warn("[WedCraft] image failed:", urlsOf(images[index])[tries[index] || 0]); setTries((t) => ({ ...t, [index]: (t[index] || 0) + 1 })); }} alt={images[index].alt}
          initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }} /></AnimatePresence>
        <button className="lb-btn lb-next" onClick={() => go(1)} aria-label="Next"><ChevronRight /></button>
        <p className="lb-count">{String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</p>
      </motion.div>)}</AnimatePresence>
  );
}
