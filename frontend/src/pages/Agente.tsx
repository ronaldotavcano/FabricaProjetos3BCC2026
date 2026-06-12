import { useState } from "react";

interface Executivo {
  nome: string;
  cargo: string;
  email: string | null;
  linkedin: string | null;
  telefone: string | null;
  fonte: string | null;
}

interface ApiResponse {
  empresa: string;
  dados: {
    empresa: string;
    executivos: Executivo[];
  };
}

function getBadgeStyle(cargo: string): string {
  const upper = cargo.toUpperCase();
  if (upper === "CEO")  return "bg-[#38BDF8] text-[#07090f]";
  if (upper === "CFO")  return "bg-green-500 text-[#07090f]";
  if (upper === "CTO")  return "bg-purple-500 text-white";
  if (upper === "COO")  return "bg-orange-500 text-white";
  if (upper === "CMO")  return "bg-pink-500 text-white";
  if (upper === "CHRO") return "bg-yellow-400 text-[#07090f]";
  return "bg-slate-600 text-white";
}

function CopyableContact({
  icon,
  value,
  href,
}: {
  icon: string;
  value: string;
  href?: string;
}) {
  const [copiado, setCopiado] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    await navigator.clipboard.writeText(value);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="relative flex items-center gap-2 group">
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-[#94A3B8] hover:text-[#38BDF8] text-sm transition-colors duration-150 truncate flex-1"
      >
        <span>{icon}</span>
        <span className="truncate">{value}</span>
      </a>
      <button
        onClick={handleCopy}
        aria-label="Copiar"
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-150
                   text-[#64748b] hover:text-[#38BDF8] ml-1 text-xs"
        title="Copiar"
      >
        {copiado ? "✓" : "⧉"}
      </button>
    </div>
  );
}

function exportarCSV(execs: Executivo[], empresa: string) {
  const header = "Nome,Cargo,Email,LinkedIn,Telefone,Fonte";
  const rows = execs.map(
    (e) =>
      `"${e.nome}","${e.cargo}","${e.email ?? ""}","${e.linkedin ?? ""}","${e.telefone ?? ""}","${e.fonte ?? ""}"`
  );
  const csvContent = [header, ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `cLevel_${empresa.replace(/\s+/g, "_")}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

async function copiarJSON(execs: Executivo[]) {
  await navigator.clipboard.writeText(JSON.stringify(execs, null, 2));
}


export default function Agente() {
  const [empresa, setEmpresa] = useState("");
  const [executivos, setExecutivos] = useState<Executivo[] | null>(null);
  const [nomeEmpresaResultado, setNomeEmpresaResultado] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [jsonCopiado, setJsonCopiado] = useState(false);


  const [historico, setHistorico] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("finderagent_historico") || "[]");
    } catch {
      return [];
    }
  });

  const handleBuscar = async () => {
    if (!empresa.trim()) return;
    setCarregando(true);
    setErro(null);
    setExecutivos(null);
    try {
      const response = await fetch("/buscar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: empresa.trim() }),
      });
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error((errData as { detail?: string }).detail || response.statusText);
      }
      const data: ApiResponse = await response.json();
      setExecutivos(data.dados.executivos);
      setNomeEmpresaResultado(data.empresa);

      const novoHistorico = [
        empresa.trim(),
        ...historico.filter((h) => h !== empresa.trim()),
      ].slice(0, 5);
      setHistorico(novoHistorico);
      localStorage.setItem("finderagent_historico", JSON.stringify(novoHistorico));
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setCarregando(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleBuscar();
  };

  const handleCopiarJSON = async () => {
    if (!executivos) return;
    await copiarJSON(executivos);
    setJsonCopiado(true);
    setTimeout(() => setJsonCopiado(false), 2000);
  };

  return (
    <div className="min-h-[calc(100vh-160px)] p-8 flex flex-col gap-8 max-w-6xl mx-auto">

      <section className="w-full bg-[#111827] rounded-3xl p-10 border border-white/5 shadow-2xl">
        <h1 className="text-4xl font-extrabold bg-linear-to-b from-[#FFFFFF] via-[#94A3B8] to-[#CBD5E1] bg-clip-text text-transparent tracking-tight mb-3">
          Agente de Busca C-Level
        </h1>
        <p className="text-[#94A3B8] text-lg leading-relaxed mb-4">
          Digite o nome de uma empresa para encontrar seus executivos
        </p>

        {historico.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="text-[#64748b] text-xs self-center">Recentes:</span>
            {historico.map((item) => (
              <button
                key={item}
                onClick={() => setEmpresa(item)}
                className="text-xs text-[#94A3B8] hover:text-[#38BDF8] bg-[#1e293b]
                           border border-[#334155] hover:border-[#38BDF8]/30
                           rounded-lg px-3 py-1 transition-all duration-200"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ex: Microsoft, Nubank, Ambev..."
              disabled={carregando}
              className="w-full bg-[#1e293b] border border-[#334155] text-white placeholder-slate-500
                         rounded-xl px-5 py-3 text-base outline-none pr-10
                         focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/30
                         transition-all duration-200 disabled:opacity-50"
            />
            {empresa && !carregando && (
              <button
                onClick={() => setEmpresa("")}
                aria-label="Limpar campo"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500
                           hover:text-slate-300 transition-colors text-lg leading-none"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={handleBuscar}
            disabled={carregando || !empresa.trim()}
            className="group relative inline-flex items-center justify-center px-8 py-3 font-bold
                       text-[#07090f] transition-all duration-200 bg-[#38BDF8] rounded-xl
                       hover:bg-[#7dd3fc] focus:outline-none focus:ring-2 focus:ring-offset-2
                       focus:ring-[#38BDF8] shadow-[0_0_20px_rgba(56,189,248,0.3)]
                       hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] active:scale-95
                       disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#38BDF8]
                       disabled:active:scale-100 whitespace-nowrap"
          >
            {carregando ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Buscando...
              </span>
            ) : (
              "Buscar"
            )}
          </button>
        </div>
      </section>

      {carregando && (
        <div className="flex flex-col items-center justify-center gap-4 py-16">
          <div className="w-12 h-12 rounded-full border-4 border-[#334155] border-t-[#38BDF8] animate-spin" />
          <p className="text-[#94A3B8] text-lg">Buscando executivos...</p>
          <p className="text-slate-600 text-sm">Isso pode levar alguns segundos</p>
        </div>
      )}


      {erro && !carregando && (
        <div className="w-full bg-red-950/40 border border-red-500/30 rounded-2xl p-6 flex items-start gap-4">
          <div>
            <p className="text-red-400 font-semibold text-lg mb-1">Erro ao buscar executivos</p>
            <p className="text-red-300/80 text-sm">{erro}</p>
          </div>
        </div>
      )}

      {!carregando && !erro && executivos !== null && executivos.length === 0 && (
        <div className="w-full bg-[#111827] border border-white/5 rounded-2xl p-10 flex flex-col items-center gap-3">
          <span className="text-4xl">🔍</span>
          <p className="text-white font-semibold text-lg">Nenhum executivo encontrado</p>
          <p className="text-[#94A3B8] text-sm">
            Não foram encontrados resultados para{" "}
            <span className="text-[#38BDF8] font-medium">"{nomeEmpresaResultado}"</span>.
            Tente outro nome ou verifique a grafia.
          </p>
        </div>
      )}


      {!carregando && !erro && executivos !== null && executivos.length > 0 && (
        <section className="flex flex-col gap-5">

          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl font-semibold text-white">
                Executivos encontrados para:{" "}
                <span className="text-[#38BDF8]">{nomeEmpresaResultado}</span>
              </h2>
              <span className="bg-[#1e293b] text-[#94A3B8] text-sm px-3 py-1 rounded-full border border-[#334155]">
                {executivos.length} {executivos.length === 1 ? "executivo" : "executivos"}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => exportarCSV(executivos, nomeEmpresaResultado)}
                className="flex items-center gap-1.5 text-sm text-[#94A3B8] hover:text-[#38BDF8]
                           border border-slate-700 hover:border-[#38BDF8]/40 rounded-lg px-3 py-1.5
                           transition-all duration-200"
              >
                Exportar CSV
              </button>
              <button
                onClick={handleCopiarJSON}
                className="flex items-center gap-1.5 text-sm text-[#94A3B8] hover:text-[#38BDF8]
                           border border-slate-700 hover:border-[#38BDF8]/40 rounded-lg px-3 py-1.5
                           transition-all duration-200"
              >
                {jsonCopiado ? " Copiado!" : " Copiar JSON"}
              </button>
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {executivos.map((exec, index) => (
              <div
                key={index}
                style={{
                  animationDelay: `${index * 60}ms`,
                  animationFillMode: "both",
                }}
                className="bg-[#111827] border border-white/5 rounded-2xl p-6 shadow-lg
                           hover:border-[#38BDF8]/20 hover:shadow-[0_0_20px_rgba(56,189,248,0.05)]
                           transition-all duration-200 flex flex-col gap-3
                           animate-[fadeSlideUp_0.35s_ease-out]"
              >

                <div className="flex flex-col gap-2">
                  <p className="text-white font-semibold text-lg leading-tight">{exec.nome}</p>
                  <span
                    className={`inline-block self-start px-3 py-0.5 rounded-full text-xs font-bold tracking-wide ${getBadgeStyle(exec.cargo)}`}
                  >
                    {exec.cargo}
                  </span>
                </div>

                <div className="flex flex-col gap-2 mt-1">
                  {exec.email && (
                    <CopyableContact icon="📧" value={exec.email} href={`mailto:${exec.email}`} />
                  )}
                  {exec.linkedin && (
                    <CopyableContact icon="🔗" value="LinkedIn" href={exec.linkedin} />
                  )}
                  {exec.telefone && (
                    <CopyableContact icon="📞" value={exec.telefone} />
                  )}
                </div>

                {exec.fonte && (
                  <p className="text-[#64748b] text-xs mt-auto pt-3 border-t border-white/5 truncate">
                    Fonte: {exec.fonte}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
