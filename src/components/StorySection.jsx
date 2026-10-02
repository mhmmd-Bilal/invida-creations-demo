import Reveal from "./Reveal";
import SplitText from "./SplitText";
import Photo from "./Photo";
import { pick } from "../data/images";

// The story as typography first, photography second. Three compositions, no containers.
export default function StorySection() {
  return (
    <>
      <section className="story-open">
        <SplitText as="p" className="story-big" text="It started with a simple conversation." stagger={0.1} />
      </section>

      <section className="story-pair">
        <SplitText as="p" className="sp-text" text="Friendship slowly became something more." stagger={0.08} />
        <Photo im={pick(0)} className="sp-big" drift={26} />
        <Photo im={pick(8)} className="sp-small" drift={-34} delay={0.15} />
      </section>

      <section className="story-quiet">
        <Reveal as="p" className="quiet-text">Somewhere between ordinary days and unforgettable moments, we found something worth holding onto.</Reveal>
      </section>
    </>
  );
}
