import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../../config/api';

export default function RelatedPosts({ category, currentId }) {
  
  const [related, setRelated] = useState([]);

  useEffect(() => {
    async function fetchRelated() {
      try {
        const res = await fetch(`${API_URL}/api/blog/tags/${category}`);
        const data = await res.json();

        const filtered = data
          .filter((post) => post._id !== currentId) // ← descarta o artigo atual
          .slice(0, 3) // pega até 3 relacionados
          .map((post) => ({
            slug: post._id,
            title: post.title,
            excerpt: post.htmlContent?.slice(0, 120) + '...',
          }));

        setRelated(filtered);
      } catch (err) {
        console.error('Erro ao buscar artigos relacionados:', err);
      }
    }

    if (category) fetchRelated();
  }, [category, currentId]);

  if (related.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-xl font-bold mb-6">artigos relacionados</h2>
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
            <div
              className="text-sm text-gray-600 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
