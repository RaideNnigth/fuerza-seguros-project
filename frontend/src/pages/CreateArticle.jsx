import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config/api';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';

import EditorToolbar from '../components/ui/EditorToolbar';
import ImageAttachmentPicker from '../components/ui/ImageAttachmentPicker';
import './tiptap.css';

export default function CreateArticle() {
  const token = localStorage.getItem('token');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [cover, setCover] = useState(null);
  const [preview, setPreview] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const coverInputRef = useRef();
  const [showImagePicker, setShowImagePicker] = useState(false);
  const navigate = useNavigate();

  function handleCoverChange(e) {
    const file = e.target.files[0];
    setCover(file);
    if (file && file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  }
  function handleRemoveCover() {
    setCover(null);
    setPreview(null);
    if (coverInputRef.current) coverInputRef.current.value = '';
  }

  // O segredo para imagens renderizarem corretamente está AQUI:
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link,
      TextStyle,
      Color,
    ],
    content: '',
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  // Inserir imagem do anexo no editor
  function handleInsertImageFromAttachments(att) {
    if (editor) {
      editor.commands.insertContent(
        `<img src="${API_URL}/api/attachments/${att._id}" alt="${att.filename}" style="max-width:100%" />`
      );
    }
    setShowImagePicker(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editor) return;
    if (!cover) {
      alert('Por favor, selecione uma imagem de capa antes de publicar.');
      return;
    }

    setLoading(true);
    try {
      let coverId = null;
      if (cover) {
        const formData = new FormData();
        formData.append('file', cover);
        const uploadRes = await fetch(`${API_URL}/api/attachments`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData,
        });
        const uploadData = await uploadRes.json();
        coverId = uploadData.id || uploadData._id;
      }

      const payload = {
        title,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        htmlContent: content,
        cover: coverId,
        author: 'Gustavo',
      };

      const res = await fetch(`${API_URL}/api/blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Erro ao criar artigo');
      const created = await res.json();
      navigate(`/blog/${created._id}`);
    } catch (err) {
      alert('Erro ao salvar: ' + err.message);
    }
    setLoading(false);
  };

  function handleChooseCover() {
    coverInputRef.current?.click();
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Criar Novo Artigo</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white rounded-lg shadow p-6">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Tags (separadas por vírgula)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="border p-2 rounded"
        />

        {/* Escolher capa */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex flex-col items-center gap-2">
            {preview ? (
              <img
                src={preview}
                alt="Capa"
                className="w-32 h-32 object-cover rounded-lg border"
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center rounded-lg border bg-gray-100 text-gray-400 text-xs">
                Sem capa
              </div>
            )}
            <button
              type="button"
              onClick={handleChooseCover}
              className="w-full px-3 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Escolher capa
            </button>
            <input
              type="file"
              ref={coverInputRef}
              style={{ display: 'none' }}
              onChange={handleCoverChange}
              accept="image/*"
            />
            <span className="text-xs text-gray-500 break-all">{cover ? cover.name : "Nenhuma imagem selecionada"}</span>
            {cover && (
              <button
                type="button"
                onClick={handleRemoveCover}
                className="w-full px-3 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Remover capa
              </button>
            )}
          </div>
        </div>

        {/* Editor com toolbar */}
        <div className="border p-2 rounded bg-white min-h-[200px]">
          {editor && (
            <>
              <EditorToolbar
                editor={editor}
                onInsertImageFromAttachments={() => setShowImagePicker(true)}
              />
              <EditorContent editor={editor} />
            </>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 rounded font-semibold transition bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Publicando...' : 'Publicar'}
        </button>
      </form>

      {/* MODAL para escolher imagem dos anexos */}
      <ImageAttachmentPicker
        open={showImagePicker}
        onClose={() => setShowImagePicker(false)}
        onSelect={handleInsertImageFromAttachments}
      />
    </div>
  );
}
