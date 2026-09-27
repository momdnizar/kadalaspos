import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import Dashboard from "./Dashboard";
import type { Screen } from "./Dashboard";
import { SectionHeading } from "./ui";
const slides: {
  screen: Screen;
  label: string;
  title: string;
  description: string;
}[] = [
  {
    screen: "billing",
    label: "Simple billing",
    title: "A few taps. And you’re done.",
    description:
      "An intuitive billing experience that keeps up with your busiest hours.",
  },
  {
    screen: "tables",
    label: "Smarter service",
    title: "Every table. All in view.",
    description:
      "Stay on top of your floor and give every guest your best service.",
  },
  {
    screen: "reports",
    label: "Clearer insights",
    title: "Know your numbers. Grow your business.",
    description:
      "Make sense of your sales with reports that are easy to understand.",
  },
];
export default function ProductCarousel() {
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (
      hover ||
      paused ||
      focused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      6500,
    );
    return () => clearInterval(timer);
  }, [hover, paused, focused]);
  const slide = slides[index];
  return (
    <section id="showcase" className="showcase section">
      <div className="container">
        <SectionHeading
          eyebrow="SIMPLE ON THE OUTSIDE. POWERFUL WITHIN."
          title="See Kadalas POS in action."
          description="Thoughtfully designed for your everyday. No complicated learning curves."
        />
        <div
          className="carousel"
          aria-label="Product demonstration"
          aria-roledescription="carousel"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
          }}
        >
          <div className="carousel-tabs">
            {slides.map((s, i) => (
              <button
                key={s.screen}
                aria-pressed={i === index}
                className={i === index ? "active" : ""}
                onClick={() => setIndex(i)}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="showcase-screen" key={slide.screen}>
            <Dashboard screen={slide.screen} />
          </div>
          <div className="carousel-bottom">
            <div>
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
            <div className="carousel-controls">
              <button
                aria-label="Previous slide"
                onClick={() => setIndex((i) => (i + 2) % 3)}
              >
                <ArrowLeft size={18} />
              </button>
              <div className="carousel-dots">
                {slides.map((s, i) => (
                  <button
                    key={s.screen}
                    aria-label={`Show ${s.label}`}
                    aria-pressed={index === i}
                    onClick={() => setIndex(i)}
                    className={index === i ? "active" : ""}
                  />
                ))}
              </div>
              <button
                aria-label="Next slide"
                onClick={() => setIndex((i) => (i + 1) % 3)}
              >
                <ArrowRight size={18} />
              </button>
              <button
                aria-label={paused ? "Resume slideshow" : "Pause slideshow"}
                onClick={() => setPaused(!paused)}
              >
                {paused ? <Play size={14} /> : <Pause size={14} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
