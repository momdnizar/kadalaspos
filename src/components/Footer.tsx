import { Instagram, Linkedin, Facebook, ArrowUpRight } from "lucide-react";
import { Logo, Button } from "./ui";
export default function Footer({
  onStart,
  onRead,
  onContact,
}: {
  onStart: () => void;
  onRead: (i: number) => void;
  onContact: (type: "partner" | "support") => void;
}) {
  return (
    <>
      <section className="container final-cta">
        <div>
          <span className="eyebrow">LESS COMPLEXITY. MORE POSSIBILITY.</span>
          <h2>Less thinking. More doing.</h2>
          <p>Your POS is ready to try.</p>
        </div>
        <Button href="#demo">Try Kadalas POS</Button>
      </section>
      <footer>
        <div className="container footer-main">
          <div className="footer-brand">
            <Logo />
            <p>
              Simple tools. Stronger businesses.
              <br />
              Your everyday partner in growing
              <br />
              your F&amp;B business.
            </p>
            <div className="socials">
              {[
                [Instagram, "Instagram", "https://www.instagram.com/"],
                [Linkedin, "LinkedIn", "https://www.linkedin.com/"],
                [Facebook, "Facebook", "https://www.facebook.com/"],
              ].map(([Icon, name, href]) => {
                const SocialIcon = Icon as typeof Instagram;
                return (
                  <a
                    key={name as string}
                    href={href as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name} (platform homepage)`}
                  >
                    <SocialIcon size={17} />
                  </a>
                );
              })}
            </div>
          </div>
          <div>
            <h3>Product</h3>
            <a href="#product">Features</a>
            <a href="#demo">Product tour</a>
            <button onClick={onStart}>
              Get started <ArrowUpRight size={12} />
            </button>
          </div>
          <div>
            <h3>Company</h3>
            <a href="#home">About Kadalas</a>
            <button onClick={() => onContact("partner")}>Earn with us</button>
            <button onClick={() => onContact("support")}>Contact us</button>
          </div>
          <div>
            <h3>Support</h3>
            <button onClick={() => onContact("support")}>
              Help &amp; support
            </button>
            <button onClick={() => onRead(0)}>Setup assistance</button>
            <button onClick={() => onContact("support")}>
              Report an issue
            </button>
          </div>
          <div>
            <h3>Resources</h3>
            {["Getting started", "Product guides", "FAQs", "Business tips"].map(
              (t, i) => (
                <button key={t} onClick={() => onRead(i)}>
                  {t}
                </button>
              ),
            )}
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 Kadalas POS. All rights reserved.</span>
          <span>
            Made for the way you work. <span className="footer-dot" />
          </span>
        </div>
      </footer>
    </>
  );
}
