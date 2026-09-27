import { Headphones, Wrench, Bug, Lightbulb, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./ui";
const items = [
  {
    icon: Wrench,
    title: "Setup Assistance",
    description: "Get up and running.",
  },
  {
    icon: Headphones,
    title: "Product Support",
    description: "Ask. We’ll help.",
  },
  {
    icon: Bug,
    title: "Bug Fixes",
    description: "Report it. Let’s sort it.",
  },
  {
    icon: Lightbulb,
    title: "Feature Assistance",
    description: "Make every feature count.",
  },
];
export default function Support({ onSupport }: { onSupport: () => void }) {
  return (
    <section id="support" className="support section">
      <div className="container">
        <div className="support-heading">
          <SectionHeading
            eyebrow="REAL PEOPLE. REAL HELP."
            title="Support when you need it."
          />
          <button className="text-link" onClick={onSupport}>
            Contact Support <ArrowUpRight size={18} />
          </button>
        </div>
        <div className="support-grid">
          {items.map(({ icon: Icon, title, description }) => (
            <div key={title}>
              <Icon size={25} />
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
