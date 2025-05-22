import { useEffect, useState } from 'react';
import API_URL from '../../config/api';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ id, title }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '0.5rem',
    background: '#fff',
    marginBottom: '0.5rem',
    cursor: 'grab'
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {title}
    </div>
  );
}

export default function EditPostOrder() {
  const tag = 'home page'; // Tag fixa
  const [posts, setPosts] = useState([]);
  const [orderedIds, setOrderedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    setLoading(true);

    fetch(`${API_URL}/api/blog`)
      .then(res => res.json())
      .then(all => {
        const filtered = all.filter(p =>
          Array.isArray(p.tags) &&
          p.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
        );
        setPosts(filtered); // salva no estado

        return fetch(`${API_URL}/api/post-order/${tag}`)
          .then(res => res.ok ? res.json() : { orderedPostIds: [] })
          .then(data => {
            if (Array.isArray(data.orderedPostIds) && data.orderedPostIds.length > 0) {
              setOrderedIds(data.orderedPostIds);
            } else {
              // usa diretamente o "filtered" aqui
              setOrderedIds(filtered.map(p => p._id));
            }
          });
      })
      .finally(() => setLoading(false));
  }, []);

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      const oldIndex = orderedIds.indexOf(active.id);
      const newIndex = orderedIds.indexOf(over.id);
      setOrderedIds(arrayMove(orderedIds, oldIndex, newIndex));
    }
  };

  const handleSave = async () => {
    if (!token) {
      alert('Usuário não autenticado!');
      return;
    }

    if (!Array.isArray(orderedIds)) {
      alert('Lista de posts inválida.');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/post-order/${tag}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ orderedPostIds: orderedIds })
      });

      if (res.ok) {
        alert('Ordem salva com sucesso!');
      } else {
        const errorData = await res.json();
        alert(`Erro ao salvar: ${errorData.message}`);
      }
    } catch (err) {
      alert('Erro de rede ou servidor.');
      console.error(err);
    }
  };

  const visiblePosts = orderedIds
    .map(id => posts.find(p => p._id === id))
    .filter(Boolean);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Ordenar Posts da Home Page</h2>

      {loading && <p>Carregando posts...</p>}

      {!loading && visiblePosts.length > 0 && (
        <>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={orderedIds} strategy={verticalListSortingStrategy}>
              {visiblePosts.map(post => (
                <SortableItem key={post._id} id={post._id} title={post.title} />
              ))}
            </SortableContext>
          </DndContext>

          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Salvar ordem
          </button>
        </>
      )}

      {!loading && visiblePosts.length === 0 && (
        <p className="text-center text-gray-500 mt-4">Nenhum post com a tag "Home Page".</p>
      )}
    </div>
  );
}