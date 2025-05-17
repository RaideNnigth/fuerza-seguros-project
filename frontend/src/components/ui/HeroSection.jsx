import banner_img from '../../assets/handshake-homepage.jpg'

export default function HeroSection() {
  return (
    <section className="relative bg-[#0f172a] text-white overflow-hidden">
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 pb-48 grid md:grid-cols-2 items-center gap-10 h-full">
        
        {/* Imagem do banner */}
        <div className="flex justify-center md:justify-center items-center">
          <img
            src={banner_img}
            alt="Handshake Banner"
            className="rounded-2xl w-[350px] h-[350px] object-cover shadow-xl"
          />
        </div>
        
        {/* Conteúdo do texto */}
        <div className="text-center md:text-left flex flex-col justify-center h-full">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            protegendo o seu presente<br /> e o seu futuro
          </h1>
          <p className="mt-6 text-lg text-white/90 max-w-md md:max-w-lg">
            soluções inteligentes em seguros e consórcios sob medida para empresas e pessoas em todo o brasil.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:justify-start justify-center">
            <input
              type="email"
              placeholder="digite seu e-mail"
              className="w-full sm:w-auto px-4 py-2 rounded border text-black"
            />
            <button
              className="bg-fuerza-laranja text-white px-6 py-2 rounded hover:bg-orange-500 transition"
            >
              fale com um especialista
            </button>
          </div>
        </div>
      </div>

      {/* 🌊 Ondas animadas */}
      <div className="absolute bottom-0 left-0 w-full z-10">
        <svg viewBox="0 0 1320 500" className="w-full h-[150px] wave-animated" preserveAspectRatio="none">
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
