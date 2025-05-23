import { Instagram, Linkedin } from "lucide-react";

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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3458.551545072477!2d-52.34352678488185!3d-31.76564818125485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95104920265d80e9%3A0x21d25b203f6b6a86!2sR.%20Gon%C3%A7alves%20Chaves%2C%20762%20-%20Centro%2C%20Pelotas%20-%20RS%2C%2096020-230%2C%20Brazil!5e0!3m2!1spt-BR!2sbr!4v1716498230177!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="text-white text-xs mt-2 text-center drop-shadow">
          Rua Gonçalves Chaves, 762, Pelotas, RS, Brazil
        </div>
      </div>
      {/* Faixa azul - Direitos e Links */}
      <div className="bg-[#00214d] text-white flex flex-col items-center py-6 shadow-[0_-4px_16px_rgba(0,0,0,0.20)] relative z-0">
        <p className="text-sm mb-2 text-center drop-shadow">
          &copy; 2025 Fuerza Seguros. Todos os direitos reservados.
        </p>
        <div className="flex flex-row flex-wrap gap-6 justify-center font-medium text-base uppercase tracking-widest items-center">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2">
            <Instagram size={20} />
            Instagram
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2">
            <Linkedin size={20} />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
