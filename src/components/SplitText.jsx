import { motion } from "framer-motion";
// Word-by-word masked rise. Each word slides up from behind its own line mask.
const ease = [0.2, 0.8, 0.2, 1];
export default function SplitText({ text, as = "p", className = "", delay = 0, stagger = 0.07 }) {
  const M = motion[as];
  const words = text.split(" ");
  return (
    <M className={className} aria-label={text} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="sw">
            <motion.span className="sw-in" variants={{ hidden: { y: "112%" }, show: { y: "0%" } }} transition={{ duration: 1.15, ease }}>{w}</motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </M>
  );
}
