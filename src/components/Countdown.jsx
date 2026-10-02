import { useEffect, useState } from "react";
import SplitText from "./SplitText";
import Reveal from "./Reveal";
const T = new Date("2026-12-20T10:30:00+05:30").getTime();
const calc = () => {
  const d = Math.max(0, T - Date.now());
  return { days: Math.floor(d / 864e5), hours: Math.floor(d / 36e5) % 24, minutes: Math.floor(d / 6e4) % 60, seconds: Math.floor(d / 1e3) % 60 };
};
const pad = (n) => String(n).padStart(2, "0");
// The countdown is set as type on a dark page: numerals are the picture, hairlines are the only structure.
export default function Countdown() {
  const [t, setT] = useState(calc);
  useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id); }, []);
  const units = [["Days", t.days], ["Hours", t.hours], ["Minutes", t.minutes]];
  return (
    <section className="count" aria-label="Countdown to the wedding">
      <SplitText as="h2" className="count-title" text="The day is almost here." stagger={0.09} />
      <Reveal className="count-row">
        {units.map(([l, n]) => (
          <div className="count-unit" key={l}>
            <span className="count-num">{pad(n)}</span>
            <span className="count-label cap">{l}</span>
          </div>
        ))}
      </Reveal>
      <p className="count-sec" aria-hidden="true">and {pad(t.seconds)} seconds</p>
    </section>
  );
}
