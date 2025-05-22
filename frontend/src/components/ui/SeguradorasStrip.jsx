import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import alternativeinvestimentos from '../../assets/images/partners/Alternative investimentos.svg';
import santander from '../../assets/images/partners/logo-santander-1024x576.png';
import cnpconsorcio from '../../assets/images/partners/cnp.png';
import bb from '../../assets/images/partners/Banco-do-Brasil.webp';
import mapfre from '../../assets/images/partners/Mapfre_logo.svg.png';
import alfaseguradora from '../../assets/images/partners/Alfa.webp';

const logos = [
    { src: alternativeinvestimentos, link: 'https://alternativeinvestimentos.com.br/' },
    { src: santander, link: 'https://www.santander.com.br/' },
    { src: cnpconsorcio, link: 'https://www.cnpconsorcio.com.br/' },
    { src: bb, link: 'https://www.bb.com.br/site/' },
    { src: mapfre, link: 'https://www.mapfre.com.br/para-voce/' },
    { src: alfaseguradora, link: 'https://wwws.alfaseguradora.com.br/portal/' },
];

export default function SeguradorasStrip() {
    return (
        <section className="bg-white py-6">
            <div className="max-w-6xl mx-auto px-4 justify-between">
                <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    loop={true}
                    slidesPerView={2}
                    spaceBetween={24}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 6 },
                    }}
                >
                    {logos.concat(logos).map((logo, i) => (
                        <SwiperSlide key={i}>
                            <a
                                href={logo.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center h-full transition-transform duration-300 hover:scale-110"
                            >
                                <img
                                    src={logo.src}
                                    alt="logo"
                                    className="h-20 w-auto object-contain"
                                />
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
