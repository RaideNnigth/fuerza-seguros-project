import { Link } from 'react-router-dom';
import articles from '../../mocks/mockArticles';

export default function RelatedPosts({ category }) {
  // Exibe os primeiros 3 artigos da mesma categoria (excluindo o atual)
  const related = articles.filter(a => a.category === category).slice(0, 3);

  return (
    <section className="mt-16">
      <h2 className="text-xl font-bold mb-6">Artigos Relacionados</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((post, idx) => (
          <Link
            key={idx}
            to={`/blog/${post.slug}`}
            className="block bg-white rounded-lg shadow hover:shadow-md transition-all p-4"
          >
            <h3 className="text-md font-semibold text-gray-800 mb-2">
              {post.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
