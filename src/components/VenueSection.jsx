import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import SafeImg from "./SafeImg";
import SplitText from "./SplitText";
import Reveal from "./Reveal";
import { pick } from "../data/images";
// The venue as a scene: one photograph, one block of type pushed to the right. No card, no map embed.
export default function VenueSection() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.14, 1.02]);
  return (
    <section className="venue" ref={ref}>
      <motion.div className="venue-media" style={{ scale }}><SafeImg im={pick(7)} loading="lazy" /></motion.div>
      <div className="venue-shade" />
      <div className="venue-text">
        <SplitText as="h2" className="venue-title" text="Grand Wedding Hall" stagger={0.1} />
        <Reveal className="venue-meta cap" delay={0.2}><span>Kochi, Kerala</span><span>20 December 2026</span></Reveal>
        <Reveal as="p" className="venue-quote" delay={0.3}>“Where we begin our next chapter.”</Reveal>
        <Reveal delay={0.4}>
          <a className="arrow-link" target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=Grand+Wedding+Hall+Kochi+Kerala">
            <span>Find the venue</span><span className="ar" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
