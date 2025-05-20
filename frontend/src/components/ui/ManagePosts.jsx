import { useEffect, useState } from 'react';
import API_URL from '../../config/api';
import CreateArticle from '../../pages/CreateArticle';

export default function ManagePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const [editingPost, setEditingPost] = useState(null);

  // Carrega os posts
  const fetchPosts = () => {
    fetch(`${API_URL}/api/blog`)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar posts:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const toggleActive = async (id, currentState) => {
    try {
      const res = await fetch(`${API_URL}/api/blog/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ active: currentState === 'y' ? 'n' : 'y' })
      });

      if (!res.ok) throw new Error('Erro na atualização');

      const updated = await res.json();
      setPosts(posts.map(p => p._id === id ? updated : p));
    } catch (err) {
      console.error("Erro ao atualizar post:", err);
    }
  };

  if (loading) return <p>Carregando posts...</p>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        {editingPost ? 'Editar Artigo' : 'Gerenciar Artigos'}
      </h2>

      {/* Exibir formulário de edição se houver post selecionado */}
      {editingPost ? (
        <CreateArticle
          existingPost={editingPost}
          onFinish={() => {
            setEditingPost(null);
            fetchPosts();
          }}
        />
      ) : (
        <ul className="space-y-4">
          {posts.map(post => (
            <li key={post._id} className="border-b pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{post.title}</h3>
                  <p className="text-sm text-gray-500">Autor: {post.author}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleActive(post._id, post.active)}
                    className={`px-3 py-1 rounded text-white ${post.active === 'y' ? 'bg-yellow-500' : 'bg-green-600'}`}
                  >
                    {post.active === 'y' ? 'Ocultar' : 'Ativar'}
                  </button>
                  <button
                    onClick={() => setEditingPost(post)}
                    className="px-3 py-1 rounded bg-blue-600 text-white"
                  >
                    Editar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}