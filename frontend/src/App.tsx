import { useState } from "react";
import Home from "./pages/Home";
import SearchBox from "./components/Searchbox";
import Results from "./components/Results";
import type { SearchResponse } from "./pages/Executive";

export default function App() {
  const [entered, setEntered] = useState<boolean>(false);
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  if (!entered) {
    return <Home onEnter={() => setEntered(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="flex flex-col items-center p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            🚀 C-Level Finder
          </h1>
          <p className="text-gray-400">
            Encontre informações de executivos C-Level de qualquer empresa
          </p>
        </div>

        {/* Search Box */}
        <SearchBox setResults={setResults} setLoading={setLoading} />

        {/* Loading */}
        {loading && (
          <div className="mt-8 flex flex-col items-center">
            <div className="loading-spinner"></div>
            <p className="mt-4 text-yellow-400 animate-pulse">
              🔍 Buscando executivos...
            </p>
          </div>
        )}

        {/* Results */}
        {!loading && <Results results={results} />}
      </div>
    </div>
  );
}