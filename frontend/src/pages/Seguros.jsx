import { useEffect, useState } from 'react';
import BlogCard from '../components/ui/BlogCard';
import API_URL from '../config/api';

import DEFAULT_THUMBNAIL from '../assets/images/default-thumbnail.png';

export default function Seguros() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`${API_URL}/api/blog`);
        const data = await res.json();

        const mapped = data
          .filter(post => post.tags?.some(tag => tag === 'seguros'))
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
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, idx) => (
          <BlogCard key={idx} post={post} />
        ))}
      </div>
    </section>
  );
}
