import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import BlogCard from './BlogCard';

import car_img from '../../assets/carro.png'

export default function ConsorcioCarousel() {
  const [consorcios, setConsorcios] = useState([]);

  // Mock data
  useEffect(() => {
    setConsorcios([
      {
        id: 1,
        image: car_img,
        title: 'Consórcio de Carro',
        category: 'Veículo',
        excerpt: 'Adquira seu carro novo ou seminovo com parcelas acessíveis e sem juros.',
        author: 'Equipe Fuerza',
        date: '17/05/2025',
      },
      {
        id: 2,
        image: car_img,
        title: 'Consórcio Imobiliário',
        category: 'Imóvel',
        excerpt: 'Compre sua casa ou apartamento com tranquilidade e planejamento.',
        author: 'Equipe Fuerza',
        date: '17/05/2025',
      },
      {
        id: 3,
        image: car_img,
        title: 'Consórcio Empresarial',
        category: 'Negócio',
        excerpt: 'Invista no crescimento da sua empresa com um consórcio estratégico.',
        author: 'Equipe Fuerza',
        date: '17/05/2025',
      },
      {
        id: 4,
        image: car_img,
        title: 'Consórcio de Serviços',
        category: 'Serviços',
        excerpt: 'Utilize o consórcio para reformas, viagens ou procedimentos médicos.',
        author: 'Equipe Fuerza',
        date: '17/05/2025',
      },
    ]);
  }, []);

  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-fuerza-azul mb-8">Conheça nossos Consórcios</h2>
        <Swiper
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {consorcios.map((post) => (
            <SwiperSlide key={post.id}>
              <BlogCard post={post} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
