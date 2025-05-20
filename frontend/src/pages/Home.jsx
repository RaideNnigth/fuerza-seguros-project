import HeroSection from '../components/ui/HeroSection';
import ConsorcioForm from '../components/ui/ConsorcioForm';
import ConsorcioCarousel from '../components/ui/ConsorcioCarousel';
import About from '../components/ui/About'


export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Mars style com curva SVG */}
      <HeroSection />

      {/* Carousel que controla os concorcios */}
      <ConsorcioCarousel />

      {/* Sobre nós */}
      <About />

      {/* Formulário direto */}
      <div className="bg-gray-100 rounded-xl shadow-lg p-8 flex flex-col justify-center items-center">
        <ConsorcioForm />
      </div>
    </div>
  );
}
