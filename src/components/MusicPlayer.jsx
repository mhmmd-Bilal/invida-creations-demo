export default function MusicPlayer({ playing, onToggle }) {
  return <button className="music" onClick={onToggle} aria-label={playing ? "Mute music" : "Play music"}>♪ {playing ? "MUTE" : "PLAY"}</button>;
}
