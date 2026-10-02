import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import SafeImg from "./SafeImg";
import Reveal from "./Reveal";
import { pick } from "../data/images";
// Last scene: the photograph does the talking.
export default function FinalSection() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.2, 1]);
  return (
    <section className="final" ref={ref}>
      <motion.div className="final-media" style={{ scale }}><SafeImg im={pick(12)} loading="lazy" /></motion.div>
      <div className="final-shade" />
      <div className="final-text">
        <Reveal as="h2" className="final-names">Aisha &amp; Rahul</Reveal>
        <Reveal className="final-line" delay={0.15}>
          <span className="cap">20 · 12 · 2026</span>
          <span className="final-note">Until we meet at the wedding.</span>
        </Reveal>
      </div>
    </section>
  );
}
