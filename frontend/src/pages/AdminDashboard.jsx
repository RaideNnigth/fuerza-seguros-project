import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AttachmentManager from "../components/ui/AttachmentManager";

function AdminDashboard() {
  const navigate = useNavigate();
  const [section, setSection] = useState('attachments');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar para telas grandes */}
      <aside className="bg-gray-900 text-white w-60 flex-col p-6 hidden md:flex">
        <h2 className="text-lg font-bold mb-8 tracking-wider uppercase text-center">Painel Admin</h2>
        <button
          className={`mb-4 px-4 py-2 rounded w-full ${section === 'attachments' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
          onClick={() => setSection('attachments')}
        >
          Gerenciar Attachments
        </button>
        <div className="flex-grow"></div>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-4 w-full"
        >
          Sair
        </button>
      </aside>

      {/* Sidebar para mobile (hamburger) */}
      <div className="md:hidden flex flex-col">
        <button
          className="m-4 p-2 rounded-full bg-gray-900 text-white self-start"
          onClick={() => setSidebarOpen(true)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Overlay sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex">
            {/* Overlay background */}
            <div
              className="fixed inset-0 bg-black bg-opacity-40"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Sidebar modal */}
            <aside className="relative bg-gray-900 text-white w-60 flex-col p-6 h-full z-50 animate-slide-in-left">
              <button
                className="absolute right-4 top-4 text-white"
                onClick={() => setSidebarOpen(false)}
                aria-label="Fechar menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-lg font-bold mb-8 tracking-wider uppercase text-center">Painel Admin</h2>
              <button
                className={`mb-4 px-4 py-2 rounded w-full ${section === 'attachments' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
                onClick={() => { setSection('attachments'); setSidebarOpen(false); }}
              >
                Gerenciar Attachments
              </button>
              <div className="flex-grow"></div>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-4 w-full"
              >
                Sair
              </button>
            </aside>
          </div>
        )}
      </div>

      {/* Conteúdo principal */}
      <main className="flex-1 p-2 md:p-8">
        {section === 'attachments' && <AttachmentManager />}
        {/* Adicione mais módulos depois */}
      </main>

      {/* Tailwind animation keyframes */}
      <style>
        {`
          @keyframes slide-in-left {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(0); }
          }
          .animate-slide-in-left {
            animation: slide-in-left 0.2s ease;
          }
        `}
      </style>
    </div>
  );
}

export default AdminDashboard;
