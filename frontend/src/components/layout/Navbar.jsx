import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.svg';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const linkClass = "text-shadow hover:text-[#de7b08] hover:scale-105 transition-transform duration-300 ease-in-out";

  return (
    <header className="bg-[#00214d] text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
      <Link to="/" className="text-2xl font-bold h-auto hover:scale-110 transition-transform duration-300 ease-in-out">
        <div className="flex items-center gap-2">
          <img
            src={Logo}
            alt="Logo Fuerza Seguros"
            className="w-12 h-auto hover:scale-110 transition-transform duration-300 ease-in-out"
          />
          <span className="text-white text-xl font-semibold">FUERZA</span>
        </div>
      </Link>

        {/* Links visíveis no desktop */}
        <nav className="hidden md:flex gap-6 font-medium">
          <Link to="/" className={linkClass}>home</Link>
          <Link to="/consorcios" className={linkClass}>consórcios</Link>
          <Link to="/seguros" className={linkClass}>seguros</Link>
          <Link to="/blog" className={linkClass}>blog</Link>
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
      <div   className={`
        fixed top-0 right-0 h-full w-64
        bg-blue-700 z-50 transform
        transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : 'translate-x-full'}
        rounded-l-2xl shadow-lg overflow-hidden
      `}>
        <button
          className="text-white text-2xl absolute top-4 right-4"
          onClick={() => setOpen(false)}
          aria-label="Fechar menu"
        >
          ×
        </button>
        <nav className="flex flex-col mt-20 gap-4 px-6 text-lg">
          <Link to="/" onClick={() => setOpen(false)} className={linkClass}>&nbsp;🏠︎ home</Link>
          <Link to="/consorcios" onClick={() => setOpen(false)} className={linkClass}>🤝 consórcios</Link>
          <Link to="/blog" onClick={() => setOpen(false)} className={linkClass} >📃 blog</Link>
        </nav>
      </div>
    </header>
  );
}
