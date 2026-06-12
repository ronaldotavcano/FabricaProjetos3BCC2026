import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const location = useLocation();

  const isAtiva = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.includes(path);
  };

  const linkClasses = (path: string) =>
    `text-md font-medium transition-all duration-300 pb-0.5 ${
      isAtiva(path)
        ? 'text-[#38BDF8] border-b-2 border-[#38BDF8]'
        : 'text-slate-400 hover:text-blue-400 hover:-translate-y-0.5 border-b-2 border-transparent'
    }`;

  const fecharMenu = () => setMenuAberto(false);

  return (
    <>
      <header className="bg-[#07090f] h-20 border-b border-slate-800/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto h-full px-8 flex justify-between items-center">

          <Link to="/" className="flex items-center gap-2" onClick={fecharMenu}>
            <span className="text-white font-semibold tracking-tight text-2xl">
              Finder<span className="text-[#38BDF8]">Agent</span>
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex gap-10 items-baseline">
            <a href="/#sobre" className={linkClasses('/')}>Sobre</a>
            <a href="/#contexto" className={linkClasses('/')}>Contexto</a>
            <Link to="/Agente" className={linkClasses('Agente')}>Agente de Busca</Link>
          </nav>

          {/* Botão hamburger mobile */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="md:hidden text-slate-400 hover:text-white transition-colors text-2xl leading-none p-1"
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuAberto ? '✕' : '☰'}
          </button>

        </div>
      </header>

      {/* Menu mobile dropdown */}
      <div
        className={`md:hidden sticky top-20 z-40 bg-[#0b0f1a] border-b border-slate-800/50
                    transition-all duration-200 overflow-hidden
                    ${menuAberto ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <nav className="flex flex-col px-8 py-4 gap-4">
          <a
            href="/#sobre"
            onClick={fecharMenu}
            className="text-slate-400 hover:text-[#38BDF8] font-medium transition-colors duration-200"
          >
            Sobre
          </a>
          <a
            href="/#contexto"
            onClick={fecharMenu}
            className="text-slate-400 hover:text-[#38BDF8] font-medium transition-colors duration-200"
          >
            Contexto
          </a>
          <Link
            to="/Agente"
            onClick={fecharMenu}
            className="text-slate-400 hover:text-[#38BDF8] font-medium transition-colors duration-200"
          >
            Agente de Busca
          </Link>
        </nav>
      </div>
    </>
  );
}
