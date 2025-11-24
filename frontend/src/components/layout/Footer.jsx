import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-10 w-full">

      {/* Seção principal azul (mesmo da Navbar) */}
      <div className="bg-[#1A365D] text-white py-10">
        <div className="max-w-7xl mx-auto px-6">

          {/* Título */}
          <h2 className="text-center font-semibold text-lg tracking-wider mb-8">
            NOSSA LOCALIZAÇÃO
          </h2>

          {/* Grid: Mapa à esquerda + Texto à direita */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* Card laranja com o mapa dentro */}
            <div className="flex justify-center md:justify-start">
              <div className="bg-[#F97316] rounded-xl p-3 shadow-xl w-[320px] sm:w-[380px]">
                <div className="rounded-lg overflow-hidden bg-white w-full h-[190px] shadow-md">
                  <iframe
                    title="Localização Fuerza Seguros"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d848.0270675501049!2d-52.33982147145584!3d-31.767532798374564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9511b5bd073bc143%3A0x35f92a0447a22df8!2sFuerza!5e0!3m2!1spt-BR!2sbr!4v1751728714610!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen=""
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <p className="text-center text-white text-xs font-semibold mt-2">
                  Rua General Neto, 772 — Pelotas, RS
                </p>
              </div>
            </div>

            {/* Informações à direita */}
            <div className="text-center md:text-left space-y-3">
              <p className="text-white/90 text-sm leading-relaxed">
                Estamos prontos para te atender presencialmente ou online.<br />
                Entre em contato conosco pelas redes sociais.
              </p>

              <p className="text-sm font-semibold">
                Rua General Neto, 772 — Pelotas, RS
              </p>

              {/* Redes sociais */}
              <div className="flex gap-8 justify-center md:justify-start pt-2">
                <a
                  href="https://www.instagram.com/fuerzaseguros/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm uppercase tracking-widest font-medium hover:text-[#F97316] transition"
                >
                  <Instagram size={18} />
                  Instagram
                </a>

                <a
                  href="https://www.facebook.com/fuerzaseguros"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm uppercase tracking-widest font-medium hover:text-[#F97316] transition"
                >
                  <Facebook size={18} />
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className="bg-[#122746] text-white py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs sm:text-sm">
          &copy; 2025 Fuerza Seguros. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
