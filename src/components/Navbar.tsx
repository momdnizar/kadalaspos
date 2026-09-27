import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo, Button } from "./ui";
export const navigation = [
  ["Product", "#demo"],
  ["Pricing", "#pricing"],
  ["Support", "#support"],
  ["Resources", "#resources"],
];
export default function Navbar({ onStart }: { onStart: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Logo />
        <nav aria-label="Main navigation" className="desktop-nav">
          {navigation.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <Button
            onClick={() => {
              setOpen(false);
              onStart();
            }}
          >
            Try Kadalas POS
          </Button>
          <button
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {navigation.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
              <ArrowUpRight size={16} />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
