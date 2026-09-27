import {
  ArrowUpRight,
  BookOpen,
  FileText,
  MessagesSquare,
  TrendingUp,
} from "lucide-react";
import { SectionHeading } from "./ui";
export const resources = [
  {
    icon: BookOpen,
    title: "Getting Started",
    label: "THE FIRST STEPS",
    description: "Your first day, made simple.",
    content: [
      "Start with your menu: collect item names, prices and categories, and check your applicable taxes with your accountant.",
      "Map your tables and service types, then add the people who will use your POS.",
      "Before opening, practise taking an order, changing quantities and finishing a bill. Contact our team for a guided setup.",
    ],
  },
  {
    icon: FileText,
    title: "Product Guides",
    label: "KNOW YOUR POS",
    description: "A little guidance goes a long way.",
    content: [
      "Billing: explore the live demo above. Pick a category or search for an item, tap it to add it to the order, and adjust quantities before payment.",
      "Tables: open the Smarter service tab to see a sample floor plan. Select a table to view its availability.",
      "Reports: use the Clearer insights tab to explore example sales totals, order counts and daily trends. All figures on this website are demonstration data.",
    ],
  },
  {
    icon: MessagesSquare,
    title: "FAQs",
    label: "ANSWERS, WITHOUT THE WAIT",
    description: "Good questions. Clear answers.",
    content: [
      "Who is Kadalas POS for? Small and growing cafés, restaurants, bakeries and quick-service businesses.",
      "How much does it cost? Contact our team with your business requirements to discuss pricing and availability.",
      "Can you help with setup? Yes. Ask about setup assistance and product support when you get started.",
      "Can I use this demo for real orders? No. The website demo uses sample data and does not process real payments.",
    ],
  },
  {
    icon: TrendingUp,
    title: "Business Tips",
    label: "ROOM TO GROW",
    description: "Small ideas. Everyday improvements.",
    content: [
      "Keep your menu easy to navigate. Group related items and use names your staff and customers recognise.",
      "Review your bestsellers and quieter hours regularly to understand where to focus your attention.",
      "Make stock checks part of your daily routine. Catching a shortage before service can save a lot of stress.",
      "Keep a short end-of-day checklist for billing, stock and handover notes. Consistent routines make growth easier.",
    ],
  },
];
export default function Resources({
  onRead,
}: {
  onRead: (index: number) => void;
}) {
  return (
    <section id="resources" className="section container resources">
      <SectionHeading
        eyebrow="A LITTLE KNOW-HOW GOES A LONG WAY."
        title="Built to help you move forward."
        description="Useful guides, quick answers and ideas for your next chapter."
      />
      <div className="resources-grid">
        {resources.map(({ icon: Icon, title, label, description }, i) => (
          <button
            className="resource-card"
            key={title}
            onClick={() => onRead(i)}
          >
            <div className={`resource-art art-${i}`}>
              <Icon size={45} strokeWidth={1.3} />
              <span className="art-line" />
              <span className="art-dot" />
            </div>
            <div className="resource-copy">
              <span>{label}</span>
              <h3>
                {title}
                <ArrowUpRight size={18} />
              </h3>
              <p>{description}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
