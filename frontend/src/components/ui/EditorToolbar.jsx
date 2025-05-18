export default function EditorToolbar({ editor }) {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 border p-2 rounded bg-gray-50 mb-4">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-2 py-1 rounded ${editor.isActive('bold') ? 'text-orange-500 font-bold' : 'text-gray-700'}`}
      >
        negrito
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-2 py-1 rounded ${editor.isActive('italic') ? 'text-orange-500 italic' : 'text-gray-700'}`}
      >
        itálico
      </button>

      <button
        onClick={() => {
          const url = prompt("Insira a URL do link:");
          if (url) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
          }
        }}
        className={`px-2 py-1 rounded ${editor.isActive('link') ? 'text-orange-500 underline' : 'text-gray-700'}`}
      >
        adicionar link
      </button>

      <label className="flex items-center gap-1 px-2 py-1">
        <span className="text-sm">🎨</span>
        <input
          type="color"
          onChange={e => editor.chain().focus().setColor(e.target.value).run()}
          value={editor.getAttributes('textStyle').color || '#000000'}
          className="w-6 h-6 p-0 border-none cursor-pointer"
          title="Cor do texto"
        />
      </label>
    </div>
  );
}
