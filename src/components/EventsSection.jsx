import { motion } from "framer-motion";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import Photo from "./Photo";
import { EVENTS, pick } from "../data/images";
const ease = [0.2, 0.8, 0.2, 1];
const long = (d) => d.replace("Dec", "December");

// A fashion-schedule composition: a held title and photograph on one side, three days set huge on the other.
export default function EventsSection() {
  return (
    <section className="events">
      <div className="events-grid">
        <aside className="events-aside">
          <SplitText as="h2" className="events-title" text="The Celebration" />
          <Reveal className="events-venue cap" delay={0.2}>
            <span>Grand Wedding Hall</span><span>Kochi, Kerala</span>
          </Reveal>
          <Photo im={pick(3)} className="events-photo" drift={18} delay={0.2} />
        </aside>
        <ol className="events-list">
          {EVENTS.map((e) => (
            <Reveal as="li" className="ev" key={e.n}>
              <motion.span className="ev-n" aria-hidden="true" initial={{ x: -70, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 1.5, ease }}>{e.n}</motion.span>
              <h3 className="ev-title">{e.name}</h3>
              <p className="ev-meta cap"><span>{long(e.date)}</span><span>{e.time}</span></p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
