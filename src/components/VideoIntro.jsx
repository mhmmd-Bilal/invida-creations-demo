import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const reveal = { initial: { opacity: 0, y: 20, filter: "blur(12px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.4, ease: [0.2, 0.8, 0.2, 1] } };

export default function VideoIntro({ videoRef, isVisible, videoFinished, onEnded, onCrossfade, onDone }) {
  const [step, setStep] = useState(0);   // 0 = hold final frame, 1-4 = text lines
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!videoFinished) return;
    const t = [
      setTimeout(() => setStep(1), 700),              // hold final frame ~700ms
      setTimeout(() => setStep(2), 2300),
      setTimeout(() => setStep(3), 3900),
      setTimeout(() => setStep(4), 5100),
      setTimeout(() => { setFading(true); onCrossfade(); }, 7600), // website mounts beneath, video fades out
      setTimeout(onDone, 7600 + 1600),
    ];
    return () => t.forEach(clearTimeout);
  }, [videoFinished]);

  return (
    <motion.div className={`video-intro ${isVisible ? "is-visible" : ""}`} initial={false}
      animate={{ opacity: fading ? 0 : 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}>
      <video ref={videoRef} src="/videos/wedding-opening.mp4" playsInline preload="auto" disablePictureInPicture
        controls={false} onEnded={onEnded} onError={onEnded} />
      {videoFinished && <div className="video-overlay">
        {step >= 1 && <motion.span {...reveal} className="label light big">Together with their families</motion.span>}
        {step >= 2 && <motion.h1 {...reveal} className="outro-names">Aisha Rahman<em>&amp;</em>Rahul Menon</motion.h1>}
        {step >= 3 && <motion.p {...reveal} className="label light big">Are getting married</motion.p>}
        {step >= 4 && <motion.small {...reveal} className="label light big">20 December 2026</motion.small>}
      </div>}
    </motion.div>
  );
}
