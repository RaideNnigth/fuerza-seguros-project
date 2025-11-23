import HeroSection from '../components/ui/HeroSection';
import CotacaoSection from "../components/ui/CotacaoSection";
import ConsorcioCarousel from '../components/ui/ConsorcioCarousel';
import About from '../components/ui/About';
import SeguradorasStrip from '../components/ui/SeguradorasStrip';

export default function Home() {
  return (
    <div className="w-full">

      {/* Seção Hero */}
      <HeroSection />

      {/* Carousel de consórcios */}
      <ConsorcioCarousel />

      {/* Faixa de seguradoras */}
      <SeguradorasStrip />

      {/* Sobre nós */}
      <div className="my-8">
        <About />
      </div>

      {/* SEÇÃO CORRETA DOS FORMULÁRIOS */}
      <CotacaoSection />

    </div>
  );
}
