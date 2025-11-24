import { useEffect, useState } from 'react';
import BlogCard from '../components/ui/BlogCard';
import API_URL from '../config/api';

import DEFAULT_THUMBNAIL from '../assets/images/default-thumbnail.png';
import CotacaoSection from '../components/ui/CotacaoSection';



export default function Consorcios() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`${API_URL}/api/blog`);
        const data = await res.json();

        const mapped = data
          .filter(post =>
            post.active === 'y' &&
            post.tags?.some(tag => tag === 'consórcio')
          )
          .map((post) => ({
            _id: post._id,
            image: post.cover ? `${API_URL}/api/attachments/${post.cover}` : DEFAULT_THUMBNAIL,
            category: (post.tags && post.tags[0] ? post.tags[0] : 'blog'),
            title: (post.title ? post.title : 'sem título'),
            excerpt: (post.htmlContent
              ? post.htmlContent.replace(/<img[^>]*>/gi, '')
                .slice(0, 120)

              : '') + '...',
            author: post.author || 'Equipe Fuerza',
            date: post.createdAt ? new Date(post.createdAt).toLocaleDateString('pt-BR') : '',
          }));

        setPosts(mapped);
      } catch (err) {
        console.error('Erro ao buscar posts de consórcios:', err);
      }
    }

    fetchPosts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-4">
      { /* Sobre nós */}
      <div className="w-full mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4 text-fuerza-azul">Conheça nossos consórcios</h2>
        <p className="text-gray-700 leading-relaxed text-base">
          O consórcio é a forma de poupar em grupo. Um sistema de compra planejada, que reúne pessoas como você,
          que querem adquirir um bem ou um serviço. No consórcio, você paga uma parcela mensal sem cobrança de juros.
        </p>
      </div>
      {/* Imagems Blog Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, idx) => (
          <BlogCard key={idx} post={post} />
        ))}
      </div>
      {/* Outras finalidades */}
      <div className="mt-12 p-3 text-center">
        <h2 className="text-2xl font-bold mb-4 text-fuerza-azul">Outras finalidades</h2>
        <p className="text-gray-700 leading-relaxed text-base">
          Você pode utilizar um consórcio para realizar todo tipo de sonhos. Cirurgias plásticas, procedimentos estéticos, fazer uma festa de casamento ou formatura, pagar a faculdade ou outros cursos técnicos, de especialização ou de idiomas. Até mesmo planejar aquela viagem dos sonhos!
          Se o seu sonho é navegar, você pode optar por comprar barcos, lanchas, jet sky, motores de popa, etc., novos ou usados.
          <br />
          <br />
          Fale com nossos especialistas e consulte possibilidades e planos.
        </p>
      </div>
      {/* Formulário direto */}
      <CotacaoSection />
    </section>
  );
}
