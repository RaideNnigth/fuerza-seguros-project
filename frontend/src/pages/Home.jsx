import HeroSection from '../components/ui/HeroSection';
import ConsorcioForm from '../components/ui/ConsorcioForm';
import ConsorcioCarousel from '../components/ui/ConsorcioCarousel';


export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Mars style com curva SVG */}
      <HeroSection />

      {/* Carousel que controla os concorcios */}
      <ConsorcioCarousel/>

      {/* Containers em blocos com sombra */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8">
        
        {/* Sobre nós */}
        <section className="bg-gray-100 rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-fuerza-azul">Nossa História</h2>
          <p className="text-gray-700 leading-relaxed">
            A Fuerza nasceu com o propósito de oferecer proteção personalizada e humana. Ao longo dos anos,
            nos consolidamos como referência em seguros empresariais, seguros pessoais e consórcios acessíveis.
          </p>
        </section>

        {/* Formulário direto */}
        <div className="bg-gray-100 rounded-xl shadow-lg p-8 flex flex-col justify-center items-center">
          <ConsorcioForm />
        </div>
      </div>
    </div>
  );
}
