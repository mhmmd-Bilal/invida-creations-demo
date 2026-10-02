import SplitText from "./SplitText";
export default function Chapter() {
  return (
    <section className="chapter">
      <SplitText as="p" className="chapter-text" text="And now, we're ready for our next chapter." stagger={0.08} />
    </section>
  );
}
