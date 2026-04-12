import type { Executive } from "../pages/Executive";

type Props = {
  results: Executive[];
};

export default function Results({ results }: Props) {
  if (!results || results.length === 0) {
    return <p className="mt-6 text-gray-400">Nenhum resultado encontrado</p>;
  }

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
      {results.map((person, index) => (
        <div
          key={index}
          className="bg-gray-800 p-5 rounded-2xl shadow-lg hover:scale-105 transition"
        >
          <h2 className="text-xl font-semibold">{person.name}</h2>

          <p className="text-gray-400">{person.role}</p>

          <div className="mt-3 space-y-1">
            <a
              href={person.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-yellow-400 hover:underline block"
            >
              🔗 LinkedIn
            </a>

            <p className="text-sm">{person.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
}