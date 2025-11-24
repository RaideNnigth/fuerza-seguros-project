import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/images/logo.svg';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItemClass = ({ isActive }) =>
    `uppercase tracking-wide text-sm transition-colors duration-200 ${
      isActive ? "text-[#f97316]" : "text-white/90 hover:text-[#f97316]"
    }`;

  return (
    <header className="absolute top-0 left-0 w-full z-30 bg-[#1A365D]">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={Logo}
            alt="Logo Fuerza Seguros"
            className="w-8 transition-transform group-hover:scale-110"
          />
          <span className="font-semibold text-white tracking-wide text-lg">
            FUERZA
          </span>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navItemClass}>Home</NavLink>
          <NavLink to="/consorcios" className={navItemClass}>Consórcios</NavLink>
          <NavLink to="/seguros" className={navItemClass}>Seguros</NavLink>
          <NavLink to="/blog" className={navItemClass}>Blog</NavLink>
        </nav>

        {/* Hamburguer Mobile */}
        <button
          className="md:hidden text-3xl text-white"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
        >
          ☰
        </button>
      </div>

      {/* Drawer Mobile */}
      <div
        className={`
          fixed top-0 right-0 h-full w-64 bg-[#1A365D]
          transform transition-transform duration-300 ease-in-out z-50
          ${open ? "translate-x-0" : "translate-x-full"}
          shadow-2xl rounded-l-2xl
        `}
      >
        <button
          className="text-white text-3xl absolute top-4 right-4"
          onClick={() => setOpen(false)}
          aria-label="Fechar menu"
        >
          ×
        </button>

        <nav className="flex flex-col mt-20 gap-6 px-6 text-white text-lg uppercase tracking-wide">
          <NavLink to="/" onClick={() => setOpen(false)} className={navItemClass}>
            Home
          </NavLink>
          <NavLink to="/consorcios" onClick={() => setOpen(false)} className={navItemClass}>
            Consórcios
          </NavLink>
          <NavLink to="/seguros" onClick={() => setOpen(false)} className={navItemClass}>
            Seguros
          </NavLink>
          <NavLink to="/blog" onClick={() => setOpen(false)} className={navItemClass}>
            Blog
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
