import { useState, useEffect, useRef } from 'react';
import API_URL from '../../config/api';

export default function AttachmentManager() {
  const [attachments, setAttachments] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [customFilename, setCustomFilename] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const fileInputRef = useRef();

  useEffect(() => {
    if (!file) {
      setPreview(null);
      setCustomFilename('');
      return;
    }
    setCustomFilename(file.name.replace(/\.[^/.]+$/, ''));
    if (file.type.startsWith('image/')) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [file]);

  const fetchAttachments = async (searchValue = search, pageValue = page) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const url = searchValue
      ? `${API_URL}/api/attachments/filename/${encodeURIComponent(searchValue)}/all`
      : `${API_URL}/api/attachments/page/${pageValue}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.ok ? await res.json() : { results: [], totalPages: 1 };
    if (Array.isArray(data)) {
      setAttachments(data);
      setTotalPages(1);
    } else {
      setAttachments(data.results || []);
      setTotalPages(data.totalPages || 1);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAttachments();
    // eslint-disable-next-line
  }, [search, page]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const extension = file.name.substring(file.name.lastIndexOf('.'));
    const finalName = customFilename.trim() ? customFilename.trim() + extension : file.name;
    const renamedFile = new File([file], finalName, { type: file.type });
    const formData = new FormData();
    formData.append('file', renamedFile);
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/api/attachments`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    setFile(null);
    setPreview(null);
    setCustomFilename('');
    setLoading(false);
    if (res.ok) {
      fetchAttachments();
    } else {
      alert('falha ao enviar arquivo');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('tem certeza que deseja deletar?')) return;
    setLoading(true);
    const token = localStorage.getItem('token');
    await fetch(`${API_URL}/api/attachments/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    setSearch('');
    setPage(0);
    setLoading(false);
    fetchAttachments('', 0);
  };

  function isImage(att) {
    return att.mimetype && att.mimetype.startsWith('image/');
  }

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="max-w-3xl mx-auto w-full p-4 lowercase">
      <h2 className="text-xl font-bold mb-4">gerenciador de attachments</h2>
      <form onSubmit={handleUpload} className="flex flex-col md:flex-row items-center gap-4 mb-8 bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col items-center gap-2 w-40">
          {preview ? (
            <img
              src={preview}
              alt="pré-visualização"
              className="w-28 h-28 object-cover rounded-lg border"
            />
          ) : (
            <div className="w-28 h-28 flex items-center justify-center rounded-lg border bg-gray-100 text-gray-400 text-xs">
              sem preview
            </div>
          )}
          <button
            type="button"
            onClick={handleChooseFile}
            className="w-full px-3 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            escolher arquivo
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={e => setFile(e.target.files[0])}
            accept="image/*"
          />
          <span className="text-xs text-gray-500 break-all">
            {file ? file.name.toLowerCase() : "nenhum arquivo selecionado"}
          </span>
        </div>
        <div className="flex flex-col gap-2 flex-1 w-full">
          {file && (
            <input
              type="text"
              value={customFilename.toLowerCase()}
              onChange={e => setCustomFilename(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="nome do arquivo (sem extensão)"
            />
          )}
          <button
            type="submit"
            disabled={loading || !file}
            className="w-full px-4 py-2 rounded font-semibold transition bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
          >
            fazer upload
          </button>
          {file && (
            <button
              type="button"
              onClick={() => { setFile(null); setPreview(null); setCustomFilename(''); }}
              className="w-full px-4 py-2 rounded font-semibold transition bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              cancelar upload
            </button>
          )}
        </div>
      </form>

      <input
        placeholder="pesquisar por nome"
        value={search.toLowerCase()}
        onChange={e => { setSearch(e.target.value); setPage(0); }}
        className="w-full mb-6 p-2 rounded border"
      />
      {loading && <div>carregando...</div>}

      <ul className="space-y-4">
        {attachments.map(att => (
          <li key={att._id} className="bg-white flex flex-col md:flex-row md:items-center gap-2 rounded-lg shadow p-3">
            <div className="flex-shrink-0">
              {isImage(att) && (att.base64 || att._id) ? (
                <a href={`${API_URL}/api/attachments/${att._id}`} target="_blank" rel="noopener noreferrer">
                  <img
                    src={att.base64 ? att.base64 : `${API_URL}/api/attachments/${att._id}`}
                    alt={att.filename?.toLowerCase()}
                    className="w-16 h-16 object-cover rounded border"
                  />
                </a>
              ) : (
                <div className="w-16 h-16 flex items-center justify-center rounded bg-gray-100 border text-xs text-gray-400">
                  arquivo
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col items-start">
              <a
                href={`${API_URL}/api/attachments/${att._id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gray-800 hover:underline break-all"
              >
                {att.filename?.toLowerCase()}
              </a>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleDelete(att._id)}
                  className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700 transition"
                >
                  deletar
                </button>
                <a
                  href={`${API_URL}/api/attachments/${att._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded bg-green-600 text-white text-sm hover:bg-green-700 transition"
                >
                  download
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {!search && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 rounded bg-gray-200 text-gray-600 font-semibold hover:bg-gray-300 disabled:opacity-50"
          >
            anterior
          </button>
          <span className="text-gray-700">
            página {page + 1} de {totalPages}
          </span>
          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 rounded bg-gray-200 text-gray-600 font-semibold hover:bg-gray-300 disabled:opacity-50"
          >
            próxima
          </button>
        </div>
      )}
    </div>
  );
}
