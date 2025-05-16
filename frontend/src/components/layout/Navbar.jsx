import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="text-2xl font-bold">
          Fuerza
        </Link>

        {/* Links visíveis no desktop */}
        <nav className="hidden md:flex gap-6 font-medium">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/consorcios" className="hover:text-gray-200">Consórcios</Link>
          <Link to="/blog" className="hover:text-gray-200">Blog</Link>
          <Link to="/landing" className="hover:text-gray-200">Landing</Link>
        </nav>

        {/* Menu hambúrguer */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
        >
          ☰
        </button>
      </div>

      {/* Menu lateral (mobile) */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-blue-700 z-50 transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <button
          className="text-white text-2xl absolute top-4 right-4"
          onClick={() => setOpen(false)}
          aria-label="Fechar menu"
        >
          ×
        </button>
        <nav className="flex flex-col mt-20 gap-4 px-6 text-lg">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/consorcios" onClick={() => setOpen(false)}>Consórcios</Link>
          <Link to="/blog" onClick={() => setOpen(false)}>Blog</Link>
          <Link to="/landing" onClick={() => setOpen(false)}>Landing</Link>
        </nav>
      </div>
    </header>
  );
}
