import { UserPlus, Rocket, Wallet, ArrowRight } from "lucide-react";
import { Button } from "./ui";
const steps = [
  {
    icon: UserPlus,
    title: "Refer a business",
    description: "Introduce a business to Kadalas.",
  },
  {
    icon: Rocket,
    title: "Business gets started",
    description: "We help them get set up.",
  },
  {
    icon: Wallet,
    title: "You earn",
    description: "Earn for successful referrals.",
  },
];
export default function EarnWithUs({ onPartner }: { onPartner: () => void }) {
  return (
    <section id="partners" className="section container partners">
      <div className="partner-intro">
        <span className="eyebrow">
          <span /> GOOD CONNECTIONS. GREAT OPPORTUNITIES.
        </span>
        <h2>
          Help businesses grow.
          <br />
          <span>Grow with them.</span>
        </h2>
        <p>Simple referrals. Shared success.</p>
        <Button onClick={onPartner}>Become a Partner</Button>
        <small>We’ll walk you through the programme and reward terms.</small>
      </div>
      <div className="partner-steps">
        {steps.map(({ icon: Icon, title, description }, i) => (
          <div className="partner-step" key={title}>
            <span className="step-icon">
              <Icon size={23} />
            </span>
            <div>
              <span className="step-number">STEP 0{i + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            {i < 2 && <ArrowRight className="step-arrow" size={17} />}
          </div>
        ))}
      </div>
    </section>
  );
}
