import {
  Check,
  CheckCheck,
  Sparkles,
  UtensilsCrossed,
  Coffee,
  Sandwich,
  Store,
} from "lucide-react";
import Dashboard from "./Dashboard";
import { Button } from "./ui";
export default function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow">
            <span /> SMALL BUSINESS. BIG POSSIBILITIES.
          </span>
          <h1>
            An all-in-one tech solution for <span>small and growing</span>{" "}
            F&amp;Bs.
          </h1>
          <p className="hero-subtitle">
            Simple and affordable — as easy as using pen and paper.
          </p>
          <p className="hero-description">
            Manage billing, tables, inventory, reports and more from one simple
            system built for the way small and growing F&amp;B businesses work.
          </p>
          <div className="hero-buttons">
            <Button onClick={onStart}>Get Started</Button>
            <Button href="#product" secondary>
              Explore Product
            </Button>
          </div>
          <div className="hero-checks">
            <span>
              <Check /> Easy to learn
            </span>
            <span>
              <Check /> Built for your business
            </span>
            <span>
              <Check /> Real human support
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-note">
            <Sparkles size={15} /> Less busywork. More happy customers.
          </div>
          <div className="hero-device">
            <Dashboard compact />
          </div>
          <div className="floating-receipt">
            <span className="receipt-icon">
              <CheckCheck size={22} />
            </span>
            <div>
              <strong>Another order. Sorted.</strong>
              <span>From first tap to final bill.</span>
            </div>
            <span className="receipt-check">✓</span>
          </div>
          <span className="visual-caption">
            YOUR WHOLE BUSINESS. ONE SIMPLE SCREEN.
          </span>
        </div>
      </div>
      <div className="container business-strip">
        <span>
          Made for the places
          <br />
          <strong>that bring people together.</strong>
        </span>
        <div>
          <UtensilsCrossed /> Restaurants
        </div>
        <div>
          <Coffee /> Cafés
        </div>
        <div>
          <Sandwich /> Quick-service outlets
        </div>
        <div>
          <Store /> Bakeries &amp; more
        </div>
      </div>
    </section>
  );
}
