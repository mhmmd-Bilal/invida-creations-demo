import { useRef, useState, useEffect, useCallback } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import OpeningScreen from "./components/OpeningScreen";
import VideoIntro from "./components/VideoIntro";
import MusicPlayer from "./components/MusicPlayer";
import HeroSection from "./components/HeroSection";
import StorySection from "./components/StorySection";
import Chapter from "./components/Chapter";
import FullBleed from "./components/FullBleed";
import Countdown from "./components/Countdown";
import EventsSection from "./components/EventsSection";
import Gallery from "./components/Gallery";
import VenueSection from "./components/VenueSection";
import RSVP from "./components/RSVP";
import FinalSection from "./components/FinalSection";
import Footer from "./components/Footer";
import { pick } from "./data/images";

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [videoGone, setVideoGone] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const videoRef = useRef(null), audioRef = useRef(null);

  // Lock scrolling while the fullscreen video experience is active.
  useEffect(() => {
    document.body.classList.toggle("video-active", hasStarted && !videoGone);
    return () => document.body.classList.remove("video-active");
  }, [hasStarted, videoGone]);

  const handleOpenInvitation = async () => {
    if (hasStarted) return;
    setHasStarted(true);
    // Both calls are made synchronously in the same click so iOS/Android treat them as user-initiated.
    const music = audioRef.current?.play();
    const film = videoRef.current?.play();
    try { await music; setMusicPlaying(true); } catch (e) { console.log("Music playback blocked", e); }
    try { await film; } catch (e) { console.error("Video playback failed", e); }
  };

  useEffect(() => { if (showInvitation) window.scrollTo(0, 0); }, [showInvitation]);
  const handleVideoEnded = useCallback(() => setVideoFinished(true), []);
  const toggleMusic = () => {
    const a = audioRef.current;
    if (a.paused) a.play().then(() => setMusicPlaying(true)).catch(() => {});
    else { a.pause(); setMusicPlaying(false); }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/wedding-music.mp3" loop preload="auto" />
      <AnimatePresence>{!hasStarted && <OpeningScreen onOpen={handleOpenInvitation} />}</AnimatePresence>
      <VideoIntro videoRef={videoRef} isVisible={hasStarted && !videoGone} videoFinished={videoFinished}
        onEnded={handleVideoEnded} onCrossfade={() => setShowInvitation(true)} onDone={() => setVideoGone(true)} />
      {showInvitation && (
        <motion.main className="site" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}>
          <MotionConfig reducedMotion="user">
            <HeroSection />
            <StorySection />
            <FullBleed im={pick(2)} caption="Aisha & Rahul" />
            <Chapter />
            <Countdown />
            <EventsSection />
            <FullBleed im={pick(4)} caption="The ceremony, 20 December at 10:30 AM" />
            <Gallery />
            <VenueSection />
            <RSVP />
            <FinalSection />
            <Footer />
          </MotionConfig>
        </motion.main>
      )}
      {showInvitation && <MusicPlayer playing={musicPlaying} onToggle={toggleMusic} />}
    </>
  );
}
