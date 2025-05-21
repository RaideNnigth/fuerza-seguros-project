import { useState } from 'react';
import { Bold, Italic, Link as LinkIcon, Heading1, Heading2, Heading3, Table, Palette, Paperclip } from 'lucide-react';

export default function EditorToolbar({ editor, onInsertImageFromAttachments }) {
  const [showHeading, setShowHeading] = useState(false);

  if (!editor) return null;

  // Heading Ativo
  let currentHeading = "Normal";
  if (editor.isActive('heading', { level: 1 })) currentHeading = "h1";
  else if (editor.isActive('heading', { level: 2 })) currentHeading = "h2";
  else if (editor.isActive('heading', { level: 3 })) currentHeading = "h3";

  // Dropdown items para headings
  const headings = [
    { label: "Normal", icon: null, action: () => editor.chain().focus().setParagraph().run() },
    { label: "h1", icon: <Heading1 className="w-4 h-4 mr-2" />, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
    { label: "h2", icon: <Heading2 className="w-4 h-4 mr-2" />, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { label: "h3", icon: <Heading3 className="w-4 h-4 mr-2" />, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
  ];

  return (
    <div className="flex flex-wrap gap-1 border rounded-2xl shadow-sm bg-white mb-4 px-4 py-2 items-center sticky top-0 z-20 min-h-[48px]">
      {/* Dropdown Heading */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowHeading(!showHeading)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold shadow-none transition"
        >
          {currentHeading === "h1" && <Heading1 className="w-4 h-4" />}
          {currentHeading === "h2" && <Heading2 className="w-4 h-4" />}
          {currentHeading === "h3" && <Heading3 className="w-4 h-4" />}
          {currentHeading === "Normal" && <span className="text-xs">Normal</span>}
          <span className="ml-1 text-gray-400">▼</span>
        </button>
        {showHeading && (
          <div className="absolute left-0 mt-2 bg-white shadow-xl rounded-xl border z-30 min-w-[120px] animate-fade-in">
            {headings.map(({ label, icon, action }) => (
              <button
                key={label}
                className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 rounded-xl transition"
                onClick={() => {
                  action();
                  setShowHeading(false);
                }}
              >
                {icon}
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Botão Negrito */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded-full hover:bg-orange-100 transition ${editor.isActive('bold') ? 'text-orange-600 bg-orange-50 shadow font-bold' : 'text-gray-700'}`}
        title="Negrito"
      >
        <Bold className="w-4 h-4" />
      </button>

      {/* Botão Itálico */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded-full hover:bg-orange-100 transition ${editor.isActive('italic') ? 'text-orange-600 bg-orange-50 shadow font-bold' : 'text-gray-700'}`}
        title="Itálico"
      >
        <Italic className="w-4 h-4" />
      </button>

      {/* Botão Link */}
      <button
        type="button"
        onClick={() => {
          const url = prompt("Insira a URL do link:");
          if (url) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
          }
        }}
        className={`p-2 rounded-full hover:bg-orange-100 transition ${editor.isActive('link') ? 'text-orange-600 bg-orange-50 shadow underline' : 'text-gray-700'}`}
        title="Adicionar link"
      >
        <LinkIcon className="w-4 h-4" />
      </button>

      {/* Botão de cor */}
      <label className="flex items-center gap-1 px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-full transition">
        <Palette className="w-4 h-4 text-gray-400" />
        <input
          type="color"
          onChange={e => editor.chain().focus().setColor(e.target.value).run()}
          value={editor.getAttributes('textStyle').color || '#000000'}
          className="w-6 h-6 p-0 border-none cursor-pointer bg-transparent"
          title="Cor do texto"
        />
      </label>

      {/* Botão para anexos (se existir) */}
      {onInsertImageFromAttachments && (
        <button
          type="button"
          className="p-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow transition"
          onClick={onInsertImageFromAttachments}
          title="Inserir imagem dos anexos"
        >
          <Paperclip className="w-4 h-4" />
        </button>
      )}

      <style>{`
        .animate-fade-in {
          animation: fadeIn .15s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}
