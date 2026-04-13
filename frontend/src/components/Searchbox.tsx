import { useState } from "react";
import type { SearchResponse } from "../types/executive";

type Props = {
  setResults: React.Dispatch<React.SetStateAction<SearchResponse | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchBox({ setResults, setLoading }: Props) {
  const [company, setCompany] = useState<string>("");

  const handleSearch = async () => {
    if (!company) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/buscar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome: company }),
      });

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      const data: SearchResponse = await response.json();
      console.log("Resposta do backend:", data);
      setResults(data);
    } catch (error) {
      console.error("Erro:", error);
      setResults(null);
    }

    setLoading(false);
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Digite uma empresa..."
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="px-4 py-2 rounded-xl text-black w-72"
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />

      <button
        onClick={handleSearch}
        className="bg-yellow-400 text-black px-5 py-2 rounded-xl hover:bg-yellow-300 transition font-semibold"
      >
        Buscar
      </button>
    </div>
  );
}