import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductFeatures from "./components/ProductFeatures";
import ProductExperience from "./components/ProductExperience";
import Pricing from "./components/Pricing";
import EarnWithUs from "./components/EarnWithUs";
import Support from "./components/Support";
import Resources from "./components/Resources";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import type { ModalState } from "./components/Modal";
export default function App() {
  const [modal, setModal] = useState<ModalState>(null);
  const [tour, setTour] = useState<number | null>(null);
  function tryDemo(walkthrough = false) {
    setTour(walkthrough ? 0 : null);
    const demo = document.getElementById("demo");
    demo?.focus({ preventScroll: true });
    demo?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar onStart={() => tryDemo()} />
      <main id="main">
        <Hero onTry={() => tryDemo()} onTour={() => tryDemo(true)} />
        <ProductExperience tour={tour} setTour={setTour} />
        <ProductFeatures />
        <Pricing onPricing={() => setModal("start")} />
        <EarnWithUs onPartner={() => setModal("partner")} />
        <Support onSupport={() => setModal("support")} />
        <Resources onRead={setModal} />
      </main>
      <Footer
        onStart={() => setModal("start")}
        onRead={setModal}
        onContact={setModal}
      />
      {modal !== null && <Modal kind={modal} onClose={() => setModal(null)} />}
    </>
  );
}
