import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API_URL from '../../config/api'; // ou ajuste o caminho conforme sua organização

import Carousel from './Carousel';
import RelatedPosts from './RelatedPosts';
import ContactForm from './ContactForm';

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
          _id : data._id,
          title: data.title,
          html: data.htmlContent,
          category: data.tags?.[0] || 'Blog',
          date: new Date(data.createdAt).toLocaleDateString('pt-BR'),
          author: data.author || 'Equipe Fuerza',
          headings: [], // se quiser extrair do HTML, precisa parsear
          images: [],   // idem
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
        <p className="text-gray-600">Verifique a URL ou retorne ao <a className="text-blue-500 underline" href="/blog">blog</a>.</p>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <h1 style={{ fontFamily: '"Times New Roman", Times, serif' }} className="text-3xl font-bold mb-4">{article.title}</h1>
      <p style={{ fontFamily: '"Times New Roman", Times, serif' }} className="text-sm text-gray-500 mb-6">Por {article.author} em {article.date}</p>

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

      <div
        className="prose prose-blue max-w-none"
        style={{ fontFamily: '"Times New Roman", Times, serif' }}
        dangerouslySetInnerHTML={{ __html: article.html }}
      />

      <RelatedPosts category={article.category} currentId={article._id} />

      <ContactForm />
    </article>
  );
}
