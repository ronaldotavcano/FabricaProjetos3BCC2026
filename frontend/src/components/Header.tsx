import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-[#07090f] h-20 border-b border-slate-800/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-full px-8 flex justify-between items-center">
    
        <div className="flex items-center gap-2">      
          <span className="text-white font-semibold tracking-tight text-2xl">
            Finder<span className="text-blue-500">Agent</span>
          </span>
        </div>

        <nav className="flex gap-10 items-baseline">
          <a href="/#sobre" className="text-slate-400 text-md font-medium transition-all duration-300 hover:text-blue-400 hover:-translate-y-0.5"> Sobre </a>
                 
          <a href="/#contexto" className="text-slate-400 text-md font-medium transition-all duration-300 hover:text-blue-400 hover:-translate-y-0.5"> Contexto </a>

          <Link to="./Agente" className="text-slate-400 text-md font-medium transition-all duration-300 hover:text-blue-400 hover:-translate-y-0.5"> Agente de Busca </Link>
        </nav>

      </div>

    </header>
  );
}