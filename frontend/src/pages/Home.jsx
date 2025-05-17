import { Link } from 'react-router-dom';
import { useRef } from 'react';
import logo from '../assets/logo.svg';
import HeroSection from '../components/ui/HeroSection';

export default function Home() {
  const formRef = useRef(null);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      <section ref={formRef} className="bg-white py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6 text-fuerza-azul">Entre em contato agora</h2>
          <form className="bg-gray-100 p-6 rounded-lg space-y-4 shadow">
            <input
              type="text"
              placeholder="Seu nome"
              className="w-full p-2 rounded border"
              required
            />
            <input
              type="email"
              placeholder="Seu e-mail"
              className="w-full p-2 rounded border"
              required
              defaultValue="contato@fuerzaseguros.com.br" // opcional
            />
            <textarea
              rows={4}
              placeholder="Sua mensagem"
              className="w-full p-2 rounded border"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-fuerza-laranja text-white px-4 py-2 rounded hover:bg-orange-500"
            >
              Enviar
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
