import banner_img from '../../assets/images/fuerza/FamiliaSofa4por3-1080x1080.png';

export default function HeroSection() {
  return (
    <section className="relative bg-[#1A365D] text-white overflow-hidden">
      
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-28 pb-20 flex flex-col items-center text-center md:grid md:grid-cols-2 md:text-left md:items-center gap-10">
        
        {/* TEXTO */}
        <div className="flex flex-col justify-center items-center md:items-start max-w-lg">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight tracking-wide">
            INVESTINDO NO FUTURO <br />
            CUIDANDO DO SEU <br />
            <span className="text-fuerza-laranja font-bold">PRESENTE</span>
          </h1>

          <p className="mt-4 text-sm md:text-base text-white/80 max-w-md">
            Garanta um futuro próspero e organizado para conquistar seus objetivos
            através dos nossos produtos e serviços de qualidade e excelência.
          </p>

          {/* FORM */}
          <div className="mt-6 w-full flex flex-col sm:flex-row gap-3 sm:justify-start justify-center">
            <input
              type="email"
              placeholder="Digite seu melhor e-mail"
              className="w-full sm:w-[260px] px-4 py-2 rounded-md border border-white/30 bg-white text-gray-900 outline-none focus:ring-2 focus:ring-fuerza-laranja"
            />
            <button
              className="bg-fuerza-laranja text-white px-6 py-2 rounded-md font-semibold hover:bg-orange-500 transition"
            >
              QUERO SABER MAIS
            </button>
          </div>
        </div>

        {/* IMAGEM */}
        <div className="flex justify-center md:justify-end">
          <div className="bg-white p-2 rounded-2xl shadow-xl">
            <img
              src={banner_img}
              alt="Família no sofá"
              className="rounded-xl w-[260px] h-[190px] md:w-[520px] md:h-[320px] object-cover"
            />
          </div>
        </div>
      </div>

    </section>
  );
}
