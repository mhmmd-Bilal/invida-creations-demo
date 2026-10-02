import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import SafeImg from "./SafeImg";
import Reveal from "./Reveal";
// A full-screen photographic pause between content areas.
export default function FullBleed({ im, caption }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.16, 1.03]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-5%", "5%"]);
  return (
    <section className="bleed" ref={ref}>
      <motion.div className="bleed-inner" style={{ scale, y }}><SafeImg im={im} loading="lazy" /></motion.div>
      <div className="bleed-shade" />
      {caption && <Reveal className="bleed-cap cap">{caption}</Reveal>}
    </section>
  );
}
