import { Link } from 'react-router-dom';

import logo from '../assets/logo.svg';
import HeroSection from '../components/ui/HeroSection';
import ConsorcioForm from '../components/ui/ConsorcioForm';

export default function Home() {
  return (
    <div className="w-full">

      {/* Hero Mars style com curva SVG */}
      <HeroSection />

      {/* Sobre nós */}
      <section className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4 text-fuerza-azul">Nossa História</h2>
        <p className="text-gray-700 leading-relaxed">
          A Fuerza nasceu com o propósito de oferecer proteção personalizada e humana. Ao longo dos anos,
          nos consolidamos como referência em seguros empresariais, seguros pessoais e consórcios acessíveis.
        </p>
      </section>

      {/* Painéis informativos */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto grid gap-8 px-4 sm:grid-cols-2 md:grid-cols-3">
          <Link to="/blog" className="group bg-white border rounded-lg shadow hover:shadow-md p-6 text-center transition">
            <h3 className="text-xl font-semibold text-fuerza-azul group-hover:underline">Blog</h3>
            <p className="text-sm text-gray-600 mt-2">Artigos sobre seguros, consórcios e proteção financeira.</p>
          </Link>

          <Link to="/consorcios" className="group bg-white border rounded-lg shadow hover:shadow-md p-6 text-center transition">
            <h3 className="text-xl font-semibold text-fuerza-azul group-hover:underline">Consórcios</h3>
            <p className="text-sm text-gray-600 mt-2">Imóveis, veículos e serviços com taxas acessíveis.</p>
          </Link>

          <Link to="/landing" className="group bg-white border rounded-lg shadow hover:shadow-md p-6 text-center transition">
            <h3 className="text-xl font-semibold text-fuerza-azul group-hover:underline">Contato</h3>
            <p className="text-sm text-gray-600 mt-2">Fale conosco e tire dúvidas sem compromisso.</p>
          </Link>
        </div>
      </section>

      {/* Formulário direto */}
      <ConsorcioForm/>
    </div>
  );
}
