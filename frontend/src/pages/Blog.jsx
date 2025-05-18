import { useEffect, useState } from 'react';
import BlogCard from '../components/ui/BlogCard';
import API_URL from '../config/api';

import DEFAULT_THUMBNAIL from '../assets/images/default-thumbnail.png'

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`${API_URL}/api/blog`);
        const data = await res.json();

        const mapped = data.map((post) => ({
          _id: post._id,
          image: post.image || DEFAULT_THUMBNAIL,
          category: post.tags?.[0] || 'Blog',
          title: post.title,
          excerpt: post.htmlContent?.slice(0, 120) + '...',
          author: post.author || 'Equipe Fuerza',
          date: new Date(post.createdAt).toLocaleDateString('pt-BR'),
        }));
        setPosts(mapped);
      } catch (err) {
        console.error('Erro ao buscar posts:', err);
      }
    }

    fetchPosts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Últimos Artigos</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, idx) => (
          <BlogCard key={idx} post={post} />
        ))}
      </div>
    </section>
  );
}
