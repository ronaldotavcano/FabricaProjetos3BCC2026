import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <main className="min-h-[calc(100vh-160px)] p-8 flex flex-col justify-start gap-20 mt-5">

        <section className="w-full max-w-800px mx-auto bg-[#111827] rounded-3xl p-10 border border-white/5 shadow-2xl"
        id="sobre"
        >
          <h1 className="text-4xl font-extrabold bg-linear-to-b from-[#FFFFFF] via-[#94A3B8] to-[#CBD5E1] bg-clip-text text-transparent tracking-tight mb-6">
            Sobre
          </h1>

          <p className="text-[#94A3B8] text-lg leading-relaxed">
            O projeto consiste no desenvolvimento de um agente de inteligência
            artificial projetado para otimizar a identificação e o mapeamento de
            lideranças no mercado corporativo. A partir de um único parâmetro,
            o nome de uma empresa, o agente inicia uma varredura avançada na
            web, integrando diversas APIs e ferramentas de busca para
            identificar a estrutura da organização. Em nosso
            ecossistema, focamos na extração inteligente de perfis de C-Level,
            diretoria e gerência, consolidando dados que antes estavam dispersos
            em uma visão clara, estruturada e pronta para a tomada de decisão.
          </p>
        </section>

        <section
          className="w-full max-w-800px mx-auto bg-[#111827] rounded-3xl p-10 border border-white/5 shadow-2xl "
          id="contexto"
        >
          <h1 className="text-4xl font-extrabold bg-linear-to-b from-[#FFFFFF] via-[#94A3B8] to-[#CBD5E1] bg-clip-text text-transparent tracking-tight mb-6">
            Contexto
          </h1>

          <p className="text-[#94A3B8] text-lg leading-relaxed">
            O desafio de entender "quem é quem" em uma empresa costuma envolver
            um trabalho manual exaustivo e propenso a erros. Nossa solução
            automatiza essa jornada: você dá ao agente o nome da empresa, e ele
            percorre a rede para filtrar as pessoas que realmente tomam as
            decisões. Isso serve para que equipes de vendas e RH parem de minerar
            dados brutos e passem a dedicar seu tempo à construção de
            relacionamentos com os líderes certos.
          </p>
        </section>

        <section
          className="w-full max-w-800px mx-auto bg-[#111827] rounded-3xl p-10 border border-white/5 shadow-2xl"
          id="equipe"
        >
          <h1 className="text-4xl font-extrabold bg-linear-to-b from-[#FFFFFF] via-[#94A3B8] to-[#CBD5E1] bg-clip-text text-transparent tracking-tight mb-6">
            Equipe
          </h1>

          <ul className="text-[#94A3B8] text-lg leading-relaxed list-style-type: disc">
            <li> Victor Freire - Frontend</li>
            <li> Sérgio Rodrigues - Frontend</li>
            <li> Matheus - Backend </li>
            <li> Victor Brahim - Backend </li>
            <li> Ronaldo Cano - Full Stack</li>
          </ul>
        </section>

        <button
          className="group relative inline-flex items-center justify-center px-8 py-3 font-bold
         text-[#07090f] transition-all duration-200 bg-[#38BDF8] rounded-xl hover:bg-[#7dd3fc]
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38BDF8] shadow-[0_0_20px_rgba(56,189,248,0.3)]
           hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] active:scale-95 max-w-100 mx-auto"
        >
          <Link to="./Agente">Acessar Agente </Link>
        </button>
      </main>
    </div>
  );
}
