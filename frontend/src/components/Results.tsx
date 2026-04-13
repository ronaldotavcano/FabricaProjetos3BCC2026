import type { SearchResponse } from "../pages/Executive";

type Props = {
  results: SearchResponse | null;
};

export default function Results({ results }: Props) {
  if (!results) {
    return (
      <div className="mt-8 text-center">
        <p className="text-gray-400">
          🔍 Digite o nome de uma empresa para buscar executivos C-Level
        </p>
      </div>
    );
  }

  // Função para formatar o texto com markdown simples
  const formatText = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('*')) {
        return (
          <li key={index} className="ml-4 mb-2 text-gray-200">
            {line.substring(1).trim()}
          </li>
        );
      }
      return (
        <p key={index} className="mb-2 text-gray-300">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="mt-8 w-full max-w-4xl">
      {/* Card da empresa */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-t-2xl p-4">
        <h2 className="text-2xl font-bold text-black text-center">
          {results.empresa}
        </h2>
      </div>

      {/* Card dos resultados */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-yellow-500/10 rounded-b-2xl p-6">
        <div className="prose prose-invert max-w-none">
          <div className="text-gray-200 leading-relaxed">
            {formatText(results.dados)}
          </div>
        </div>
      </div>
    </div>
  );
}