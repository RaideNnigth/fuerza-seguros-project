import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config/api';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import EditorToolbar from '../components/ui/EditorToolbar';
import './tiptap.css';

export default function CreateArticle() {
    const token = localStorage.getItem('token');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [cover, setCover] = useState(null);
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link,
            TextStyle,
            Color,
        ],
        content: '',
        onUpdate({ editor }) {
            setContent(editor.getHTML());
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!editor) return;
        if (!cover) {
            alert('Por favor, selecione uma imagem de capa antes de publicar.');
            return;
        }

        try {
            let coverId = null;
            if (cover) {
                const formData = new FormData();
                formData.append('file', cover);
                const uploadRes = await fetch(`${API_URL}/api/attachments`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
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

            console.log('🔍 Payload enviado:', payload);

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
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Criar Novo Artigo</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCover(e.target.files[0])}
                    className="border p-2 rounded"
                />

                <div className="border p-2 rounded bg-white min-h-[200px]">
                    {editor && (
                        <>
                            <EditorToolbar editor={editor} />
                            <EditorContent editor={editor} />
                        </>
                    )}
                </div>

                <button type="submit" className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800">
                    Publicar
                </button>
            </form>
        </div>
    );
}
