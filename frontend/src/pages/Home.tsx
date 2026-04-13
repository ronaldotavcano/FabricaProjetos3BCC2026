type HomeProps = {
  onEnter: () => void;
};

export default function Home({ onEnter }: HomeProps) {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-black text-center">
      <h1 className="text-6xl md:text-8xl font-extrabold text-yellow-400 tracking-widest">
        AVIVATEC
      </h1>

      <p className="text-gray-400 mt-4">
        Inteligência para encontrar executivos C-Level
      </p>

      <button
        onClick={onEnter}
        className="mt-10 bg-yellow-400 text-black px-8 py-3 rounded-2xl text-lg font-semibold hover:bg-yellow-300 transition"
      >
        Entrar
      </button>
    </div>
  );
}