import { useState } from "react";
import Home from "./pages/Home";
import SearchBox from "./components/Searchbox";
import Results from "./components/Results";
import type { Executive } from "./pages/Executive";

export default function App() {
  const [entered, setEntered] = useState<boolean>(false);
  const [results, setResults] = useState<Executive[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  if (!entered) {
    return <Home onEnter={() => setEntered(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold mb-6">
        🚀 C-Level Finder
      </h1>

      <SearchBox setResults={setResults} setLoading={setLoading} />

      {loading && (
        <p className="mt-4 animate-pulse text-yellow-400">
          Buscando executivos...
        </p>
      )}

      <Results results={results} />
    </div>
  );
}