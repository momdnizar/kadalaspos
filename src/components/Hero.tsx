import { ArrowDown, Play } from "lucide-react";
export default function Hero({
  onTry,
  onTour,
}: {
  onTry: () => void;
  onTour: () => void;
}) {
  return (
    <section id="home" className="conversion-hero container">
      <span className="eyebrow">
        <span /> YOUR NEXT POS. ALREADY OPEN.
      </span>
      <h1>
        Best in pricing.
        <br />
        Powerful in functions.
        <br />
        <span>Simple by design.</span>
      </h1>
      <p className="conversion-support">Just experience it below.</p>
      <div className="conversion-actions">
        <button className="button" onClick={onTry}>
          Try Kadalas POS <ArrowDown size={17} />
        </button>
        <button className="demo-tour-link" onClick={onTour}>
          <Play size={15} /> See How It Works
        </button>
      </div>
      <p className="conversion-secondary">
        No rethink. Built for small and growing F&amp;Bs.
      </p>
    </section>
  );
}
