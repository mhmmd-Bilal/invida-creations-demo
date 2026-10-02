import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import SplitText from "./SplitText";
import SafeImg from "./SafeImg";
import Lightbox from "./Lightbox";
import { galleryImages } from "../data/images";
const ease = [0.2, 0.8, 0.2, 1];
const DRIFT = [14, -10, 18, -14, 8, -18, 12, -8, 16, -12, 10, -16, 14, -10];

function useSmall() {
  const [s, setS] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(max-width:759px)");
    const f = () => setS(m.matches); f();
    m.addEventListener("change", f); return () => m.removeEventListener("change", f);
  }, []);
  return s;
}

// Each tile is placed by name in the CSS grid (see .t1 to .t14), so sizes and aspect ratios all differ.
function Tile({ im, i, small, onOpen }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const s = DRIFT[i % DRIFT.length] * (small ? 0.35 : 1);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [s, -s]);
  return (
    <motion.div ref={ref} className={"tile t" + (i + 1)} style={{ y }}>
      <motion.button type="button" className="tile-btn" onClick={() => onOpen(i)} aria-label={"Open photo: " + im.alt}
        initial={{ opacity: 0, y: 36, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-6% 0px" }} transition={{ duration: 1.1, ease }}>
        <SafeImg className="tile-img" im={im} loading="lazy" />
      </motion.button>
    </motion.div>
  );
}

export default function Gallery() {
  const [idx, setIdx] = useState(null);
  const small = useSmall();
  return (
    <section className="gallery">
      <div className="gallery-head">
        <SplitText as="h2" className="gallery-title" text="Moments" />
      </div>
      <div className="gallery-grid">
        {galleryImages.map((im, i) => <Tile key={i} im={im} i={i} small={small} onOpen={setIdx} />)}
      </div>
      <Lightbox images={galleryImages} index={idx} setIndex={setIdx} />
    </section>
  );
}
