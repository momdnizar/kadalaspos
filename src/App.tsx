import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductFeatures from "./components/ProductFeatures";
import ProductCarousel from "./components/ProductCarousel";
import EarnWithUs from "./components/EarnWithUs";
import Support from "./components/Support";
import Resources from "./components/Resources";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import type { ModalState } from "./components/Modal";
export default function App() {
  const [modal, setModal] = useState<ModalState>(null);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar onStart={() => setModal("start")} />
      <main id="main">
        <Hero onStart={() => setModal("start")} />
        <ProductFeatures />
        <ProductCarousel />
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
