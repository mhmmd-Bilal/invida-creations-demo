import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import SafeImg from "./SafeImg";
const ease = [0.2, 0.8, 0.2, 1];
// Editorial photograph: square-cornered, unveils with a clip + slow zoom, drifts a few px against the scroll.
export default function Photo({ im, className = "", drift = 0, delay = 0 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [drift, -drift]);
  const vp = { once: true, margin: "-8% 0px" };
  return (
    <motion.figure ref={ref} className={"photo " + className} style={{ y }}>
      <motion.div className="photo-clip" initial={{ clipPath: "inset(14% 0 0 0)", opacity: 0 }} whileInView={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
        viewport={vp} transition={{ duration: 1.4, delay, ease }}>
        <motion.div className="photo-zoom" initial={{ scale: 1.14 }} whileInView={{ scale: 1 }} viewport={vp} transition={{ duration: 2, delay, ease }}>
          <SafeImg im={im} loading="lazy" />
        </motion.div>
      </motion.div>
    </motion.figure>
  );
}
