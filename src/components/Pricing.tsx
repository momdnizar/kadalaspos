import { ArrowUpRight, Check } from "lucide-react";
export default function Pricing({ onPricing }: { onPricing: () => void }) {
  return (
    <section id="pricing" className="container pricing-section">
      <div>
        <span className="eyebrow">
          <span /> SMALL BUSINESS. SENSIBLE SPEND.
        </span>
        <h2>
          Powerful POS.
          <br />
          Small-business pricing.
        </h2>
        <p>Tell us your setup. Get a tailored quote.</p>
      </div>
      <div className="pricing-action">
        <span>
          <Check size={16} /> One outlet or a growing business.
        </span>
        <button className="button" onClick={onPricing}>
          Get pricing <ArrowUpRight size={17} />
        </button>
        <small>Plan details from the Kadalas team.</small>
      </div>
    </section>
  );
}
