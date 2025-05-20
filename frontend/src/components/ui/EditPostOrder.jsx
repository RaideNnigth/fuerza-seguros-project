// src/components/ui/EditPostOrder.jsx
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
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const [posts, setPosts] = useState([]);
  const [orderedIds, setOrderedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    fetch(`${API_URL}/api/blog`)
      .then(res => res.json())
      .then(data => {
        const uniqueTags = Array.from(new Set(data.flatMap(post => post.tags || [])));
        setTags(uniqueTags);
      });
  }, []);

  useEffect(() => {
    if (!tag) return;

    setLoading(true);
    fetch(`${API_URL}/api/post-order/${tag}`)
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (Array.isArray(data)) return;
        setOrderedIds(data.orderedPostIds);
      })
      .finally(() => setLoading(false));

    fetch(`${API_URL}/api/blog`)
      .then(res => res.json())
      .then(all => {
        const filtered = all.filter(p => p.tags?.includes(tag));
        setPosts(filtered);
      });
  }, [tag]);

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      const oldIndex = orderedIds.indexOf(active.id);
      const newIndex = orderedIds.indexOf(over.id);
      setOrderedIds(arrayMove(orderedIds, oldIndex, newIndex));
    }
  };

  const handleSave = async () => {
    const res = await fetch(`${API_URL}/api/post-order/${tag}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ orderedPostIds: orderedIds })
    });

    if (res.ok) alert('Ordem salva!');
    else alert('Erro ao salvar.');
  };

  const visiblePosts = orderedIds
    .map(id => posts.find(p => p._id === id))
    .filter(Boolean);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Ordenar Posts por Tag</h2>

      <select value={tag} onChange={e => setTag(e.target.value)} className="mb-4 p-2 border rounded">
        <option value="">Selecione uma tag</option>
        {tags.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      {loading && <p>Carregando posts...</p>}

      {tag && !loading && (
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
    </div>
  );
}
