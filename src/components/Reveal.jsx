import { motion } from "framer-motion";
export default function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const M = motion[as];
  return <M className={className} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 1, delay, ease: [0.2, 0.8, 0.2, 1] }}>{children}</M>;
}
