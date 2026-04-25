import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import alternativeinvestimentos from "../../assets/images/partners/Alternative investimentos.svg";
import santander from "../../assets/images/partners/logo-santander-1024x576.png";
import cnpconsorcio from "../../assets/images/partners/cnp.png";
import bb from "../../assets/images/partners/Banco-do-Brasil.webp";
import mapfre from "../../assets/images/partners/Mapfre_logo.svg.png";
import alfaseguradora from "../../assets/images/partners/Alfa.webp";

const logos = [
  { src: alternativeinvestimentos, link: "https://alternativeinvestimentos.com.br/" },
  { src: santander, link: "https://www.santander.com.br/" },
  { src: cnpconsorcio, link: "https://www.cnpconsorcio.com.br/" },
  { src: bb, link: "https://www.bb.com.br/site/" },
  { src: mapfre, link: "https://www.mapfre.com.br/para-voce/" },
  { src: alfaseguradora, link: "https://wwws.alfaseguradora.com.br/portal/" },
];

export default function SeguradorasStrip() {
  return (
    <section className="bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-slate-800 font-semibold text-lg tracking-wide">
          NOSSOS PARCEIROS
        </h2>

        <p className="text-center text-slate-500 mt-1 mb-8">
          Trabalhamos com os melhores seguradores do mercado
        </p>

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop
          slidesPerView={2}
          spaceBetween={20}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          className="partners-swiper pb-10"
        >
          {logos.concat(logos).map((logo, index) => (
            <SwiperSlide key={index}>
              <a
                href={logo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-all h-24 flex items-center justify-center p-4"
              >
                <img
                  src={logo.src}
                  alt="logo"
                  loading="lazy"
                  decoding="async"
                  className="h-14 w-auto object-contain"
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
