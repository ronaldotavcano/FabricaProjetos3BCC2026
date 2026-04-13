// Tipo exportado — usado em App.tsx e Results.tsx
export type Executive = {
  id: number;
  name: string;
  role: string;
  company: string;
  email?: string;
  linkedin?: string;
  avatar?: string;
};

// Mock de dados — substitua pela chamada real ao backend depois
export const mockExecutives: Executive[] = [
  {
    id: 1,
    name: "Ana Souza",
    role: "CEO",
    company: "TechCorp Brasil",
    email: "ana.souza@techcorp.com",
    linkedin: "https://linkedin.com/in/anasouza",
  },
  {
    id: 2,
    name: "Carlos Lima",
    role: "CFO",
    company: "Innova S/A",
    email: "carlos.lima@innova.com",
    linkedin: "https://linkedin.com/in/carloslima",
  },
  {
    id: 3,
    name: "Beatriz Mendes",
    role: "CTO",
    company: "DataBridge",
    email: "bmendes@databridge.io",
    linkedin: "https://linkedin.com/in/beatrizmendes",
  },
];

// Componente de card individual
type ExecutiveCardProps = {
  executive: Executive;
};

export function ExecutiveCard({ executive }: ExecutiveCardProps) {
  const initials = executive.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-gray-800 border border-gray-700 hover:border-yellow-400 transition-all duration-300 rounded-2xl p-6 flex flex-col gap-4 shadow-lg hover:shadow-yellow-400/10">
      {/* Avatar + Info */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-black font-extrabold text-xl shrink-0">
          {initials}
        </div>
        <div>
          <h2 className="text-white font-bold text-lg leading-tight">
            {executive.name}
          </h2>
          <span className="text-yellow-400 text-sm font-semibold">
            {executive.role}
          </span>
          <p className="text-gray-400 text-sm">{executive.company}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700" />

      {/* Contatos */}
      <div className="flex flex-col gap-2 text-sm">
        {executive.email && (
          <a
            href={`mailto:${executive.email}`}
            className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2"
          >
            <span>✉</span>
            {executive.email}
          </a>
        )}
        {executive.linkedin && (
          <a
            href={executive.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2"
          >
            <span>🔗</span>
            Ver LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}

// Página principal com lista de cards
export default function ExecutivePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h1 className="text-3xl font-extrabold text-yellow-400 mb-2 tracking-widest text-center">
        AVIVATEC
      </h1>
      <p className="text-gray-400 text-center mb-10 text-sm">
        Executivos C-Level encontrados
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {mockExecutives.map((exec) => (
          <ExecutiveCard key={exec.id} executive={exec} />
        ))}
      </div>
    </div>
  );
}
