import {
  ReceiptText,
  Grid2X2,
  Package,
  ChartNoAxesCombined,
  ClipboardList,
  Store,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeading } from "./ui";
export const features = [
  {
    icon: ReceiptText,
    title: "Quick Billing",
    description:
      "Take orders, split bills and check out in seconds. Keep the queue moving and your customers smiling.",
  },
  {
    icon: Grid2X2,
    title: "Table Management",
    description:
      "Know what’s happening at every table. Manage seating, open orders and service in one clear view.",
  },
  {
    icon: Package,
    title: "Inventory Management",
    description:
      "Keep an eye on your stock. Know what’s running low before your kitchen runs out.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Sales & Reports",
    description:
      "Turn everyday sales into useful insights. See what’s selling and make better business decisions.",
  },
  {
    icon: ClipboardList,
    title: "Order Management",
    description:
      "Dine-in, takeaway or delivery. Keep every order organised, from the counter to the kitchen.",
  },
  {
    icon: Store,
    title: "Multi-Outlet Support",
    description:
      "One outlet today. More tomorrow. Stay in control of every location from one place.",
  },
];
export default function ProductFeatures() {
  return (
    <section id="product" className="section container">
      <SectionHeading
        eyebrow="LESS JUGGLING. MORE DOING."
        title="Everything you need to run your F&B business."
        description="Your day is busy enough. Let one simple system handle the details."
      />
      <div className="features-grid">
        {features.map(({ icon: Icon, title, description }, i) => (
          <a href={`#showcase`} className="feature-card" key={title}>
            <div className="feature-top">
              <span className="feature-icon">
                <Icon size={23} />
              </span>
              <span className="feature-number">0{i + 1}</span>
            </div>
            <h3>
              {title}
              <ArrowUpRight size={17} />
            </h3>
            <p>{description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
