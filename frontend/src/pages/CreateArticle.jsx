import { useState, useRef, useEffect } from 'react';
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

export default function CreateArticle({ existingPost = null, onFinish }) {
  const token = localStorage.getItem('token');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [cover, setCover] = useState(null);
  const [preview, setPreview] = useState(null);
  const [content, setContent] = useState('');
  const [showHtml, setShowHtml] = useState(false);
  const [loading, setLoading] = useState(false);
  const coverInputRef = useRef();
  const [showImagePicker, setShowImagePicker] = useState(false);
  const navigate = useNavigate();

  const editor = useEditor({
    extensions: [StarterKit, Image, Link, TextStyle, Color],
    content: '',
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

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

    setLoading(true);
    try {
      let coverId = existingPost?.cover || null;

      // Faz upload da nova imagem se tiver uma nova selecionada
      if (cover instanceof File) {
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

      const method = existingPost ? 'PUT' : 'POST';
      const url = existingPost
        ? `${API_URL}/api/blog/${existingPost._id}`
        : `${API_URL}/api/blog`;

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Erro ao salvar artigo');

      const saved = await res.json();

      if (onFinish) onFinish(saved);
      else navigate(`/blog/${saved._id}`);
    } catch (err) {
      alert('Erro ao salvar: ' + err.message);
    }
    setLoading(false);
  };

  function handleChooseCover() {
    coverInputRef.current?.click();
  }

  useEffect(() => {
    if (existingPost) {
      setTitle(existingPost.title || '');
      setTags(existingPost.tags?.join(', ') || '');
      setContent(existingPost.htmlContent || '');
      editor?.commands.setContent(existingPost.htmlContent || '');
      setPreview(existingPost.cover ? `${API_URL}/api/attachments/${existingPost.cover}` : null);
    }
  }, [existingPost, editor]);

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

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex flex-col items-center gap-2">
            {preview ? (
              <img src={preview} alt="Capa" className="w-32 h-32 object-cover rounded-lg border" />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center rounded-lg border bg-gray-100 text-gray-400 text-xs">
                Sem capa
              </div>
            )}
            <button type="button" onClick={handleChooseCover} className="w-full px-3 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
              Escolher capa
            </button>
            <input type="file" ref={coverInputRef} style={{ display: 'none' }} onChange={handleCoverChange} accept="image/*" />
            <span className="text-xs text-gray-500 break-all">{cover ? cover.name : "Nenhuma imagem selecionada"}</span>
            {cover && (
              <button type="button" onClick={handleRemoveCover} className="w-full px-3 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">
                Remover capa
              </button>
            )}
          </div>
        </div>

        <div className="border p-2 rounded bg-white min-h-[200px]">
          <div className="flex justify-between items-center mb-2">
            <EditorToolbar editor={editor} onInsertImageFromAttachments={() => setShowImagePicker(true)} />
            <button
              type="button"
              onClick={() => setShowHtml(!showHtml)}
              className="px-3 py-1 rounded text-sm bg-gray-200 hover:bg-gray-300"
            >
              {showHtml ? '👁 Visualizar' : '</> HTML'}
            </button>
          </div>

          {showHtml ? (
            <textarea
              className="w-full h-60 p-2 border rounded text-sm font-mono"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                editor.commands.setContent(e.target.value);
              }}
            />
          ) : (
            <EditorContent editor={editor} />
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

      <ImageAttachmentPicker
        open={showImagePicker}
        onClose={() => setShowImagePicker(false)}
        onSelect={handleInsertImageFromAttachments}
      />
    </div>
  );
}
