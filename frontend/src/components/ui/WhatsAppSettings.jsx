import { useEffect, useMemo, useState } from 'react';
import API_URL from '../../config/api';

const emptyForm = {
  enabled: true,
  phone: '',
  message: 'Olá! Gostaria de falar com a Fuerza Seguros.',
};

export default function WhatsAppSettings() {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch(`${API_URL}/api/site-config/whatsapp`);
        const data = res.ok ? await res.json() : emptyForm;
        setForm({
          enabled: data.enabled !== false,
          phone: data.phone || '',
          message: data.message || emptyForm.message,
        });
      } catch {
        setError('Não foi possível carregar a configuração.');
      } finally {
        setLoading(false);
      }
    }

    loadConfig();
  }, []);

  const previewUrl = useMemo(() => {
    const phone = form.phone.replace(/\D/g, '');
    const message = form.message.trim();

    if (!phone || !message) return '';

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }, [form.phone, form.message]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setStatus('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/site-config/whatsapp`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Erro ao salvar configuração.');
        return;
      }

      setForm({
        enabled: data.enabled !== false,
        phone: data.phone || '',
        message: data.message || emptyForm.message,
      });
      setStatus('Configuração salva com sucesso.');
    } catch {
      setError('Erro ao conectar com o servidor.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="max-w-3xl mx-auto w-full p-4 lowercase">carregando...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto w-full p-4 lowercase">
      <h2 className="text-xl font-bold mb-4">botão do whatsapp</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-5 space-y-5">
        <label className="flex items-center gap-3 text-sm font-semibold text-gray-800">
          <input
            type="checkbox"
            name="enabled"
            checked={form.enabled}
            onChange={handleChange}
            className="h-5 w-5 rounded border-gray-300"
          />
          exibir botão flutuante no site
        </label>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            telefone com ddi e ddd
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="ex: 5511999999999"
            className="w-full p-3 border rounded"
          />
          <p className="text-xs text-gray-500 mt-1">
            use somente números. para brasil, comece com 55.
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            mensagem inicial
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border rounded resize-y"
          />
        </div>

        {previewUrl && (
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-sm font-semibold text-green-700 hover:underline"
          >
            testar conversa no whatsapp
          </a>
        )}

        {status && <p className="text-green-600 text-sm font-medium">{status}</p>}
        {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-full md:w-auto px-5 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-60"
        >
          {saving ? 'salvando...' : 'salvar configuração'}
        </button>
      </form>
    </div>
  );
}
