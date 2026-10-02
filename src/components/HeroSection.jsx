import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import SafeImg from "./SafeImg";
import { pick } from "../data/images";
const ease = [0.2, 0.8, 0.2, 1];
const rise = (delay) => ({ initial: { y: "108%" }, animate: { y: "0%" }, transition: { duration: 1.6, delay, ease } });

// Editorial title page: one photograph, two oversized names set on a diagonal. No buttons, no nav.
export default function HeroSection() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "9%"]);
  const aY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -80]);
  const rY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 56]);
  return (
    <header className="hero" ref={ref}>
      <motion.div className="hero-media" style={{ y: imgY }} initial={{ scale: 1.14 }} animate={{ scale: 1 }} transition={{ duration: 3.2, ease }}>
        <SafeImg im={pick(1)} />
      </motion.div>
      <div className="hero-shade" />
      <h1 className="hero-names" aria-label="Aisha Rahman and Rahul Menon">
        <motion.span className="hero-name hero-name--a" style={{ y: aY }} aria-hidden="true">
          <span className="mask"><motion.span {...rise(0.5)}>Aisha</motion.span></span>
        </motion.span>
        <span className="hero-amp" aria-hidden="true"><span className="mask"><motion.span {...rise(0.85)}>&amp;</motion.span></span></span>
        <motion.span className="hero-name hero-name--r" style={{ y: rY }} aria-hidden="true">
          <span className="mask"><motion.span {...rise(1.05)}>Rahul</motion.span></span>
        </motion.span>
      </h1>
      <motion.p className="hero-date cap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, delay: 1.9 }}>20 December 2026</motion.p>
      <motion.p className="hero-place cap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, delay: 2.1 }}>Kochi, Kerala</motion.p>
    </header>
  );
}
