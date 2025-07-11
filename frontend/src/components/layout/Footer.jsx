import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-10">
      <div className="bg-[#00214d] text-white flex flex-col items-center py-6 shadow-[0_-4px_16px_rgba(0,0,0,0.20)] relative z-0">
        <div className="font-semibold mb-2 text-lg tracking-wider drop-shadow">
          Nossa Localização
        </div>
      </div>
      {/* Faixa laranja - Localização e Mapa */}
      <div className="bg-[#F7931E] text-white flex flex-col items-center py-8 shadow-[0_4px_16px_rgba(0,0,0,0.15)] relative z-10">
        
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 w-[320px] h-[180px] bg-white">
          <iframe
            title="Localização Fuerza Seguros"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d848.0270675501049!2d-52.33982147145584!3d-31.767532798374564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9511b5bd073bc143%3A0x35f92a0447a22df8!2sFuerza!5e0!3m2!1spt-BR!2sbr!4v1751728714610!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="text-white text-sm mt-2 text-center drop-shadow-lg font-bold">
          Rua General Neto, 772, Pelotas, RS, Brasil
        </div>
      </div>
      {/* Faixa azul - Direitos e Links */}
      <div className="bg-[#00214d] text-white flex flex-col items-center py-6 shadow-[0_-4px_16px_rgba(0,0,0,0.20)] relative z-0">
        <p className="text-sm mb-2 text-center drop-shadow">
          &copy; 2025 Fuerza Seguros. Todos os direitos reservados.
        </p>
        <div className="flex flex-row flex-wrap gap-6 justify-center font-medium text-base uppercase tracking-widest items-center">
          <a href="https://www.instagram.com/fuerzaseguros/" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2">
            <Instagram size={20} />
            Instagram
          </a>
          <a href="https://www.facebook.com/fuerzaseguros" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2">
            <Facebook size={20} />
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}
