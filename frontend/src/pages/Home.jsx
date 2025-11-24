import { useRef, useState } from "react";
import HeroSection from "../components/ui/HeroSection";
import CotacaoSection from "../components/ui/CotacaoSection";
import ConsorcioCarousel from "../components/ui/ConsorcioCarousel";
import About from "../components/ui/About";
import SeguradorasStrip from "../components/ui/SeguradorasStrip";
import SegurosHomeSection from "../components/ui/SegurosHomeSection";

export default function Home() {
  const cotacaoRef = useRef(null);
  const [cotacaoSelection, setCotacaoSelection] = useState(null);

  const goToCotacao = (type = null) => {
    setCotacaoSelection(type);

    // fallback universal, caso você use em outro lugar
    if (type) localStorage.setItem("cotacao_preselect", type);
    else localStorage.removeItem("cotacao_preselect");

    cotacaoRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="w-full">
      {/* Seção Hero */}
      <HeroSection />

      {/* Carousel de consórcios */}
      <ConsorcioCarousel />

      {/* Seguros (botão desce pra cotação e já seleciona seguro) */}
      <SegurosHomeSection onGoToCotacao={goToCotacao} />

      {/* Faixa de seguradoras */}
      <SeguradorasStrip />

      {/* Sobre nós */}
      <div className="my-8">
        <About />
      </div>

      {/* Formulários (target do scroll) */}
      <section ref={cotacaoRef} id="cotacao">
        <CotacaoSection initialType={cotacaoSelection} />
      </section>
    </div>
  );
}
