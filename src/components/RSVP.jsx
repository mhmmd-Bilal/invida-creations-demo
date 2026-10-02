import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SplitText from "./SplitText";
import Reveal from "./Reveal";
const ease = [0.2, 0.8, 0.2, 1];
export default function RSVP() {
  const [f, setF] = useState({ name: "", phone: "", guests: "1", note: "", att: "yes" });
  const [done, setDone] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const first = f.name.trim().split(" ")[0];
  return (
    <section className="rsvp">
      <div className="rsvp-wrap">
        <header className="rsvp-head">
          <SplitText as="h2" className="rsvp-title" text="Will you join us?" stagger={0.09} />
          <Reveal as="p" className="rsvp-sub" delay={0.3}>We'd love to celebrate this day with you.</Reveal>
        </header>
        <div className="rsvp-body">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done" className="rsvp-done" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease }}>
                <h3>Thank you{first ? ", " + first : ""}.</h3>
                <p>{f.att === "yes" ? "We can't wait to celebrate with you." : "We'll miss you, and we're grateful you let us know."}</p>
                <button type="button" className="rsvp-edit cap" onClick={() => setDone(false)}>Change my reply</button>
              </motion.div>
            ) : (
              <motion.form key="form" className="rsvp-form" onSubmit={(e) => { e.preventDefault(); setDone(true); }}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }}
                exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.9, ease }}>
                <label className="fld"><span className="cap">Your name</span><input required value={f.name} onChange={set("name")} autoComplete="name" /></label>
                <label className="fld"><span className="cap">Phone</span><input type="tel" required value={f.phone} onChange={set("phone")} autoComplete="tel" /></label>
                <label className="fld"><span className="cap">Number of guests</span><input type="number" inputMode="numeric" min="1" max="10" required value={f.guests} onChange={set("guests")} /></label>
                <fieldset className="attend">
                  <legend className="cap">Attendance</legend>
                  {[["yes", "Joyfully accept"], ["no", "Regretfully decline"]].map(([v, t]) => (
                    <label key={v} className="opt"><input type="radio" name="att" value={v} checked={f.att === v} onChange={set("att")} /><span>{t}</span></label>
                  ))}
                </fieldset>
                <label className="fld"><span className="cap">Message</span><textarea rows="2" value={f.note} onChange={set("note")} /></label>
                <button className="rsvp-submit" type="submit"><span>Confirm attendance</span><span className="ar" aria-hidden="true" /></button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
