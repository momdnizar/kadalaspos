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
    description: "Tap. Bill. Done.",
  },
  {
    icon: Grid2X2,
    title: "Table Management",
    description: "Your whole floor, in view.",
  },
  {
    icon: Package,
    title: "Inventory Management",
    description: "Know what’s low. Stay ready.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Sales & Reports",
    description: "Clear numbers. Better decisions.",
  },
  {
    icon: ClipboardList,
    title: "Order Management",
    description: "Every order. Nothing missed.",
  },
  {
    icon: Store,
    title: "Multi-Outlet Support",
    description: "More outlets. One place.",
  },
];
export default function ProductFeatures() {
  return (
    <section id="product" className="section container">
      <SectionHeading
        eyebrow="THAT SIMPLE. THIS CAPABLE."
        title="Small effort. Full control."
      />
      <div className="features-grid">
        {features.map(({ icon: Icon, title, description }, i) => (
          <a href="#demo" className="feature-card" key={title}>
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
