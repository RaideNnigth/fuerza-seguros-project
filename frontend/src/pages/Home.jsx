import HeroSection from '../components/ui/HeroSection';
import CotacaoSection from "../components/ui/CotacaoSection";
import ConsorcioCarousel from '../components/ui/ConsorcioCarousel';
import About from '../components/ui/About';
import SeguradorasStrip from '../components/ui/SeguradorasStrip';
import SegurosHomeSection from "../components/ui/SegurosHomeSection";

export default function Home() {
  return (
    <div className="w-full">
      {/* Seção Hero */}
      <HeroSection />

      {/* Carousel de consórcios */}
      <ConsorcioCarousel />
      
      {/* Seguros */}
      <SegurosHomeSection />

      {/* Faixa de seguradoras */}
      <SeguradorasStrip />

      {/* Sobre nós */}
      <div className="my-8">
        <About />
      </div>

      {/* Formulários */}
      <CotacaoSection />
    </div>
  );
}
