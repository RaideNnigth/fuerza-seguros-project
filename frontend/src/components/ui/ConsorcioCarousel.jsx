import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import BlogCard from './BlogCard';
import API_URL from '../../config/api';

import DEFAULT_THUMBNAIL from '../../assets/images/default-thumbnail.png'

export default function ConsorcioCarousel() {
  const [consorcios, setConsorcios] = useState([]);

  useEffect(() => {
    const fetchConsorciosOrdenados = async () => {
      const tag = 'home page';
      try {
        // 1. Buscar todos os posts
        const postsRes = await fetch(`${API_URL}/api/blog`);
        const postsData = await postsRes.json();

        // 2. Criar dicionário de posts por ID para acesso rápido
        const postsById = {};
        postsData.forEach(p => {
          postsById[p._id] = p;
        });

        // 3. Buscar ordem salva da tag
        const orderRes = await fetch(`${API_URL}/api/post-order/${tag}`);
        let orderedPostIds = [];

        if (orderRes.ok) {
          const orderData = await orderRes.json();
          orderedPostIds = Array.isArray(orderData.orderedPostIds) ? orderData.orderedPostIds : [];
        }

        // 4. Montar lista ordenada com base em todos os posts do banco
        const ordered = orderedPostIds
          .map(id => postsById[id])
          .filter(
            p =>
              p &&
              Array.isArray(p.tags) &&
              p.tags.map(t => t.toLowerCase()).includes(tag)
          );

        // 5. Caso não haja ordem salva, usar todos os posts com a tag
        const fallback = postsData.filter(
          p => Array.isArray(p.tags) && p.tags.map(t => t.toLowerCase()).includes(tag)
        );

        const finalList = ordered.length > 0 ? ordered : fallback;

        const mapped = finalList.map(post => ({
          ...post,
          image: post.cover ? `${API_URL}/api/attachments/${post.cover}` : DEFAULT_THUMBNAIL,
          category: post.tags && post.tags[0] ? post.tags[0].toLowerCase() : 'blog',
          title: post.title || 'sem título',
          excerpt: post.htmlContent ? post.htmlContent.slice(0, 120) + '...' : '',
          author: post.author || 'Equipe Fuerza',
          date: post.createdAt ? new Date(post.createdAt).toLocaleDateString('pt-BR') : '',
        }));

        setConsorcios(mapped);
      } catch (err) {
        console.error('Erro ao carregar consórcios:', err);
      }
    };

    fetchConsorciosOrdenados();
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
            <SwiperSlide key={post._id}>
              <BlogCard post={post} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
