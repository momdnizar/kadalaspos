import { Headphones, Wrench, Bug, Lightbulb, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./ui";
const items = [
  {
    icon: Wrench,
    title: "Setup Assistance",
    description:
      "A helping hand from day one. We’ll help you get up and running.",
  },
  {
    icon: Headphones,
    title: "Product Support",
    description: "A question in the middle of your day? We’re here to help.",
  },
  {
    icon: Bug,
    title: "Bug Fixes",
    description: "Something not working right? Let’s get it sorted together.",
  },
  {
    icon: Lightbulb,
    title: "Feature Assistance",
    description:
      "Get more from your POS with guidance on the features you need.",
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
            description="You take care of your customers. We’ll take care of you."
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
