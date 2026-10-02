import { motion } from "framer-motion";
export default function OpeningScreen({ onOpen, disabled }) {
  return (
    <motion.section className="opening" exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
      <p className="label">A Wedding Invitation</p>
      <h1 className="opening-names"><span>Aisha Rahman</span><i>&amp;</i><span>Rahul Menon</span></h1>
      <p className="opening-date">20 · 12 · 2026</p>
      <button className="open-invitation" onClick={onOpen} disabled={disabled}>
        <span>Open Invitation</span><span className="button-arrow">↗</span>
      </button>
    </motion.section>
  );
}
