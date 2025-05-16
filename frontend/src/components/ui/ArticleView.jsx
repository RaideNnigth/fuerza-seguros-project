import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from './Carousel';
import RelatedPosts from './RelatedPosts';
import ContactForm from './ContactForm';
import articles from '../../mocks/mockArticles';

export default function ArticleView() {
  const { slug } = useParams();

  // Busca o artigo correto pelo slug
  const article = articles.find(a => a.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-6">Por {article.author} em {article.date}</p>

      {article.headings?.length > 0 && (
        <nav className="mb-8 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-sm font-bold mb-2">Índice</h2>
          <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
            {article.headings.map(h => (
              <li key={h.id}><a href={`#${h.id}`}>{h.title}</a></li>
            ))}
          </ul>
        </nav>
      )}

      {article.images && article.images.length > 0 && <Carousel images={article.images} />}

      <div
        className="prose prose-blue max-w-none"
        dangerouslySetInnerHTML={{ __html: article.html }}
      />

      <RelatedPosts category={article.category} />
      <ContactForm />
    </article>
  );
}
