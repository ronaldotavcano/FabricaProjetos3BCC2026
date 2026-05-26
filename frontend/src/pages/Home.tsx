import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <main className="min-h-[calc(100vh-160px)] p-8 flex flex-col justify-start gap-20 mt-5">

        {/* ── Hero Section ── */}
        <section className="w-full max-w-4xl mx-auto text-center py-16 flex flex-col items-center gap-6">

          {/* Pill badge */}
          <span className="inline-flex items-center gap-2 bg-[#38BDF8]/10 border border-[#38BDF8]/20
                           text-[#38BDF8] text-sm font-medium px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
            Powered by Llama 3.3 70B + Tavily
          </span>

          {/* Título principal */}
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Encontre os{" "}
            <span className="text-[#38BDF8]">C-Levels</span>
            <br />de qualquer empresa
          </h1>

          {/* Subtítulo */}
          <p className="text-[#94A3B8] text-xl max-w-2xl leading-relaxed">
            Insira o nome de uma empresa e nossa IA mapeia a liderança executiva em segundos —
            CEO, CFO, CTO e mais, com dados de contato quando disponíveis.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link
              to="/Agente"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 font-bold
                         text-[#07090f] bg-[#38BDF8] rounded-xl hover:bg-[#7dd3fc]
                         transition-all duration-200 shadow-[0_0_20px_rgba(56,189,248,0.3)]
                         hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] active:scale-95"
            >
              Acessar o Agente →
            </Link>
            <a
              href="#sobre"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 font-medium
                         text-[#94A3B8] border border-slate-700 rounded-xl hover:border-[#38BDF8]/40
                         hover:text-white transition-all duration-200"
            >
              Saiba mais
            </a>
          </div>

          {/* Stats visuais */}
          <div className="flex flex-wrap justify-center gap-8 mt-4 text-center">
            {[
              { label: "C-Levels mapeados", value: "CEO, CFO, CTO..." },
              { label: "Fonte de dados", value: "Web + LinkedIn" },
              { label: "Tempo médio", value: "~15 segundos" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-white font-semibold text-lg">{stat.value}</span>
                <span className="text-[#64748b] text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Sobre ── */}
        <section
          className="w-full max-w-800px mx-auto bg-[#111827] rounded-3xl p-10 border border-white/5 shadow-2xl"
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

        {/* ── Contexto ── */}
        <section
          className="w-full max-w-800px mx-auto bg-[#111827] rounded-3xl p-10 border border-white/5 shadow-2xl"
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

        {/* ── Equipe ── */}
        <section
          className="w-full max-w-800px mx-auto bg-[#111827] rounded-3xl p-10 border border-white/5 shadow-2xl"
          id="equipe"
        >
          <h1 className="text-4xl font-extrabold bg-linear-to-b from-[#FFFFFF] via-[#94A3B8] to-[#CBD5E1] bg-clip-text text-transparent tracking-tight mb-6">
            Equipe
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {[
              { nome: "Victor Freire",    papel: "Frontend",   iniciais: "VF" },
              { nome: "Sérgio Rodrigues", papel: "Frontend",   iniciais: "SR" },
              { nome: "Matheus",          papel: "Backend",    iniciais: "MA" },
              { nome: "Victor Brahim",    papel: "Backend",    iniciais: "VB" },
              { nome: "Ronaldo Cano",     papel: "Full Stack", iniciais: "RC" },
            ].map((membro) => (
              <div
                key={membro.nome}
                className="flex items-center gap-3 bg-[#1e293b] rounded-xl p-4
                           border border-white/5 hover:border-[#38BDF8]/20 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-full bg-[#38BDF8]/15 border border-[#38BDF8]/30
                                flex items-center justify-center text-[#38BDF8] font-bold text-sm flex-shrink-0">
                  {membro.iniciais}
                </div>
                <div>
                  <p className="text-white font-medium text-sm leading-tight">{membro.nome}</p>
                  <p className="text-[#64748b] text-xs">{membro.papel}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA final ── */}
        <Link
          to="/Agente"
          className="group relative inline-flex items-center justify-center px-8 py-3 font-bold
                     text-[#07090f] transition-all duration-200 bg-[#38BDF8] rounded-xl hover:bg-[#7dd3fc]
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38BDF8]
                     shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_35px_rgba(56,189,248,0.5)]
                     active:scale-95 max-w-100 mx-auto"
        >
          Acessar Agente
        </Link>

      </main>
    </div>
  );
}
