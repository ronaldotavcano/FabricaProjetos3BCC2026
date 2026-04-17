import { useState } from 'react';

export default function Agente() {
  const [carregando, setCarregando] = useState(false);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setCarregando(true);

    setTimeout(() => {
      setCarregando(false);
    }, 2000);
  }

  return (
    <main className="min-h-[calc(100vh-144px)] bg-[#07090f] flex justify-center px-6 pt-16">
      <div className="flex flex-col items-center gap-14 w-full px-6">
        <h1 className="text-white text-5xl md:text-6xl font-light tracking-[0.1em] text-center">
          C-Level Finder
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-center justify-center gap-8 w-full"
        >
          <input
            type="text"
            placeholder="Digite o nome da empresa"
            className="w-full max-w-[420px] h-13 px-6 text-2xl rounded-[6px] border-[2px] border-white bg-transparent text-white placeholder:text-slate-400 outline-none"
          />

          <button
            type="submit"
            className="w-[110px] h-13 text-2xl rounded-[6px] border-[2px] border-white bg-blue-500 text-white transition hover:bg-white hover:text-black"
          >
            Buscar
          </button>
        </form>

        {carregando && (
          <p className="text-white text-2xl animate-pulse">
            Carregando...
          </p>
        )}
      </div>
    </main>
  );
}