export default function HeroSection({ scrollToForm }) {
  return (
    <section className="relative bg-[#0f172a] text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          protegendo o seu presente<br /> e o seu futuro
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-white/90">
          soluções inteligentes em seguros e consórcios sob medida para empresas e pessoas em todo o brasil.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <input
            type="email"
            placeholder="Digite seu e-mail"
            className="w-full sm:w-auto px-4 py-2 rounded border text-black"
          />
          <button
            onClick={scrollToForm}
            className="bg-fuerza-laranja text-white px-6 py-2 rounded hover:bg-orange-500 transition"
          >
            fale com um especialista
          </button>
        </div>
      </div>

      {/* 🌊 Ondas animadas */}
      <div className="absolute bottom-0 left-0 w-full z-0">
        <svg viewBox="0 0 1320 500" className="w-full h-[120px] wave-animated" preserveAspectRatio="none">
          <path
            fill="#0f172a"
            d="M0,192 C220,100,440,100,660,192 C880,290,1100,290,1320,192 L1320 500 L0 500"
          />
          <path
            fill="#f97316"
            d="M0,192 C220,100,440,100,660,192 C880,290,1100,290,1320,192 L1320 500 L0 500"
          />
          <path
            fill="#f97316"
            fillOpacity="0.8"
            d="M0,192 C220,100,440,100,660,192 C880,290,1100,290,1320,192 L1320 500 L0 500"
          />
          <path
            fill="#fff"
            d="M0,192 C220,100,440,100,660,192 C880,290,1100,290,1320,192 L1320 500 L0 500"
          />
        </svg>
      </div>
    </section>
  );
}
