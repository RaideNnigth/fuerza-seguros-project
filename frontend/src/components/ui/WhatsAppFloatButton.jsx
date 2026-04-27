import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import API_URL from '../../config/api';

export default function WhatsAppFloatButton() {
  const location = useLocation();
  const [config, setConfig] = useState(null);

  useEffect(() => {
    let alive = true;

    async function loadConfig() {
      try {
        const res = await fetch(`${API_URL}/api/site-config/whatsapp`);
        if (!res.ok) return;
        const data = await res.json();
        if (alive) setConfig(data);
      } catch {
        if (alive) setConfig(null);
      }
    }

    loadConfig();

    return () => {
      alive = false;
    };
  }, []);

  const href = useMemo(() => {
    const phone = config?.phone?.replace(/\D/g, '');
    const message = config?.message?.trim();

    if (!config?.enabled || !phone || !message) return '';

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }, [config]);

  if (location.pathname.startsWith('/admin') || !href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir conversa no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition hover:-translate-y-0.5 hover:bg-[#1ebe5d] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 md:bottom-7 md:right-7"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}
