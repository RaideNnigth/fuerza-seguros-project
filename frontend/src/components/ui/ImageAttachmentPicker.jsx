import { useEffect, useState } from 'react';
import API_URL from '../../config/api';

export default function ImageAttachmentPicker({ open, onClose, onSelect }) {
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    const token = localStorage.getItem('token');
    fetch(`${API_URL}/api/attachments/page/0`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setAttachments(
        (data.results || []).filter(att => att.mimetype && att.mimetype.startsWith('image/'))
      ))
      .finally(() => setLoading(false));
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full">
        <h2 className="text-lg font-bold mb-4">Escolha uma imagem dos anexos</h2>
        {loading ? <div>Carregando imagens...</div> : (
          <div className="grid grid-cols-3 gap-4 max-h-80 overflow-y-auto">
            {attachments.map(att => (
              <img
                key={att._id}
                src={att.base64 || `${API_URL}/api/attachments/${att._id}`}
                alt={att.filename}
                title={att.filename}
                className="w-24 h-24 object-cover rounded border cursor-pointer hover:ring-2 ring-blue-500"
                onClick={() => onSelect(att)}
              />
            ))}
            {attachments.length === 0 && (
              <span className="col-span-3 text-center text-gray-400">Nenhuma imagem encontrada</span>
            )}
          </div>
        )}
        <button
          className="mt-6 w-full py-2 rounded bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400"
          onClick={onClose}
        >Fechar</button>
      </div>
    </div>
  );
}
