import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API_URL from '../../config/api';

import Carousel from './Carousel';
import RelatedPosts from './RelatedPosts';
import ConsorcioForm from './ConsorcioForm';

export default function ArticleView() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`${API_URL}/api/blog/${slug}`);
        const data = await res.json();

        setArticle({
          _id: data._id,
          title: data.title,
          html: data.htmlContent,
          category: data.tags?.[0] || 'Blog',
          date: new Date(data.createdAt).toLocaleDateString('pt-BR'),
          author: data.author || 'Equipe Fuerza',
          headings: [],
          images: [],
        });
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar artigo:', err);
        setLoading(false);
      }
    }

    fetchArticle();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return <div className="text-center py-20">Carregando...</div>;
  }

  if (!article) {
    return (
      <div className="max-w-2xl mx-auto p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Artigo não encontrado</h1>
        <p className="text-gray-600">
          Verifique a URL ou retorne ao <a className="text-blue-500 underline" href="/blog">blog</a>.
        </p>
      </div>
    );
  }

  return (
    <article className="
      max-w-3xl w-full 
      bg-white rounded-2xl shadow-xl 
      p-6 md:p-10 my-10 
      mx-auto
    ">
      <header className="mb-6">
        <h1 className="text-4xl font-serif font-bold mb-2 text-center text-gray-900">
          {article.title}
        </h1>
        <div className="text-center text-sm text-gray-600">
          <span className="italic">Por {article.author}</span>
          <span className="mx-2">•</span>
          <span>{article.date}</span>
          <span className="mx-2">•</span>
          <span className="uppercase font-semibold tracking-widest text-blue-700">{article.category}</span>
        </div>
      </header>

      {article.headings.length > 0 && (
        <nav className="mb-8 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-sm font-bold mb-2">Índice</h2>
          <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
            {article.headings.map(h => (
              <li key={h.id}><a href={`#${h.id}`}>{h.title}</a></li>
            ))}
          </ul>
        </nav>
      )}

      {article.images.length > 0 && <Carousel images={article.images} />}

      <section
        className="prose prose-lg max-w-none prose-blue"
        style={{
          fontFamily: '"Times New Roman", Times, serif',
          textAlign: 'justify',
          lineHeight: '1.7',
          letterSpacing: '0.03em',
          fontSize: '1.16rem',
          marginBottom: '3rem',
        }}
      >
        <div
          className="article-html"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />
      </section>

      <RelatedPosts category={article.category} currentId={article._id} />
      <ConsorcioForm />
    </article>
  );
}
