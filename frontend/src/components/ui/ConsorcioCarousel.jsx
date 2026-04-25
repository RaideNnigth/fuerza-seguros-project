import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import BlogCard from './BlogCard';
import API_URL from '../../config/api';
import DEFAULT_THUMBNAIL from '../../assets/images/default-thumbnail.png';
import { optimizedAttachmentUrl } from '../../utils/attachmentUrls';

export default function ConsorcioCarousel() {
  const [consorcios, setConsorcios] = useState([]);

  useEffect(() => {
    const fetchConsorciosOrdenados = async () => {
      const tag = 'home page';
      try {
        const postsRes = await fetch(`${API_URL}/api/blog`);
        const postsData = await postsRes.json();

        const postsById = {};
        postsData.forEach(p => {
          postsById[p._id] = p;
        });

        const orderRes = await fetch(`${API_URL}/api/post-order/${tag}`);
        let orderedPostIds = [];

        if (orderRes.ok) {
          const orderData = await orderRes.json();
          orderedPostIds = Array.isArray(orderData.orderedPostIds)
            ? orderData.orderedPostIds
            : [];
        }

        const ordered = orderedPostIds
          .map(id => postsById[id])
          .filter(
            p =>
              p &&
              p.active === 'y' &&
              Array.isArray(p.tags) &&
              p.tags.map(t => t.toLowerCase()).includes(tag)
          );

        const fallback = postsData.filter(
          p =>
            p.active === 'y' &&
            Array.isArray(p.tags) &&
            p.tags.map(t => t.toLowerCase()).includes(tag)
        );

        const finalList = ordered.length > 0 ? ordered : fallback;

        const mapped = finalList.map(post => ({
          ...post,
          image: post.cover
            ? optimizedAttachmentUrl(post.cover, { width: 640, quality: 70 })
            : DEFAULT_THUMBNAIL,
          category: post.tags?.[0]?.toLowerCase() || 'blog',
          title: post.title || 'sem título',
          excerpt: post.htmlContent
            ? post.htmlContent.replace(/<[^>]+>/g, '').slice(0, 120) + '...'
            : '',
          author: post.author || 'Equipe Fuerza',
          date: post.createdAt
            ? new Date(post.createdAt).toLocaleDateString('pt-BR')
            : '',
        }));

        setConsorcios(mapped);
      } catch (err) {
        console.error('Erro ao carregar consórcios:', err);
      }
    };

    fetchConsorciosOrdenados();
  }, []);

  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">

        {/* Título + texto adicional */}
        <div className="text-center mb-10">
          <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-gray-400">
            Conheça alguns dos nossos
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            principais <span className="text-fuerza-laranja">produtos</span>
          </h2>

          <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Oferecemos serviços especializados nas mais diversas áreas de Seguros,
            Consórcios, Financiamentos, Investimentos e Previdência Privada
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          speed={900}
          grabCursor
          threshold={6}
          preventClicks
          preventClicksPropagation
          modules={[Autoplay]}
          autoplay={{
            delay: 1500,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
            waitForTransition: true,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="pb-2"
        >
          {consorcios.map((post) => (
            <SwiperSlide key={post._id} className="h-auto select-none">
              <BlogCard post={post} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
