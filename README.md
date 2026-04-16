#  C-Level Finder — Agente de IA

> Agente inteligente que busca automaticamente os executivos C-Level de qualquer empresa, retornando nome, cargo, LinkedIn e email corporativo.

---

##  Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Arquitetura](#-arquitetura)
- [Fluxo de Dados](#-fluxo-de-dados)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Tecnologias](#-tecnologias)
- [Como Rodar](#-como-rodar)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Git Flow](#-git-flow)
- [Time](#-time)

---

##  Sobre o Projeto

O **C-Level Finder** é um agente de IA desenvolvido como trabalho escolar. O usuário digita o nome de uma empresa e o agente retorna uma lista com todos os executivos C-Level (CEO, CFO, CTO, COO etc.) com seus contatos disponíveis publicamente.

**Limitação importante:** Telefone pessoal e email pessoal de executivos são protegidos pela LGPD e raramente disponíveis publicamente. O agente foca em: LinkedIn, emails no formato corporativo padrão e telefone geral da empresa.

---

##  Arquitetura

```
[React Frontend]
      ↕  POST /api/search  (JSON)
[FastAPI Backend]
      ↕  chama agente
[Agente LangChain]
      ↓  usa ferramentas
┌─────────────┬──────────────┬──────────────┐
│  OpenAI API │  Tavily API  │ Hunter.io API│
│  (GPT-4o)   │ (Web Search) │(Email Finder)│
└─────────────┴──────────────┴──────────────┘
```

### Responsabilidade de cada camada

(Todos os nomes de ferramenta, exceto o React são opcionais, não necessariamente são as tecnologias que vamos usar, é só um exemplo)

| Camada | Tecnologia | Função |
|--------|------------|--------|
| Frontend | React + Vite + TailwindCSS | Interface: campo de busca e tabela de resultados |
| Backend | FastAPI (Python) + Uvicorn | API REST que recebe requisições e aciona o agente |
| Agente | LangChain + OpenAI GPT-4o-mini | Orquestra as ferramentas e processa os resultados |
| Busca web | Tavily API | Pesquisa executivos C-Level no Google |
| Emails | Hunter.io API | Encontra emails corporativos no formato padrão |

---

##  Fluxo de Dados

```
1. Usuário digita "Microsoft" no React
      ↓
2. React envia POST /api/search { "empresa": "Microsoft" }
      ↓
3. FastAPI valida o input e aciona o agent.py
      ↓
4. Agente (OpenAI) decide: "Vou buscar no Tavily primeiro"
      ↓
5. Tavily pesquisa: "Microsoft CEO CFO CTO executives"
      ↓
6. Hunter.io busca emails: satya@microsoft.com (formato padrão)
      ↓
7. Agente formata e retorna lista estruturada
      ↓
8. React exibe tabela com nome, cargo, LinkedIn e email
```

---

##  Estrutura de Pastas

```
meu-agente-ia/
│
├── backend/
│   ├── main.py           # FastAPI — entrada da aplicação e rotas
│   ├── agent.py          # Lógica do agente LangChain
│   ├── tools.py          # Ferramentas do agente (Tavily, Hunter.io)
│   ├── models.py         # Modelos de dados (input/output da API)
│   ├── requirements.txt  # Dependências Python
│   └── .env              # Chaves de API (nunca sobe pro GitHub!)
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── SearchBar.jsx
│   │   │   └── ResultsTable.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

---

## Como Rodar

### Pré-requisitos

Pre-requisito do front:

Baixar o node numa versão lts (long term supported), o meu está na v22.11.0
link --> https://nodejs.org (ou veja qualquer video de baixar o node.js)

### Backend

> **Pré-requisitos:** Tenha instalado antes de começar:
> - [Python 3.10+](https://www.python.org/downloads/) — marque "Add Python to PATH" na instalação
> - [Node.js LTS](https://nodejs.org) — versão recomendada: v22.x

---

### Backend (manual)

```bash
# 1. Entrar na pasta do backend
cd backend

# 2. Criar o ambiente virtual (faz uma "caixa separada" para as dependências do projeto)
python -m venv .venv

# 3. Ativar o ambiente virtual
# Windows:
.venv\Scripts\activate
# Mac/Linux:
source .venv/bin/activate

# 4. Instalar as dependências listadas no requirements.txt
pip install -r requirements.txt

# 5. Criar o arquivo de variáveis de ambiente (veja a seção Variáveis de Ambiente)
# Copie o .env.example ou crie manualmente o arquivo .env

# 6. Subir o servidor
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

> O backend ficará disponível em `http://localhost:8000`
> A documentação interativa da API estará em `http://localhost:8000/docs`

---

### Backend (atalho com .bat)

Se estiver no Windows, pode usar o script automático — ele faz todos os passos acima de uma vez:

```bash
# Na raiz do projeto, basta dar dois cliques no arquivo ou rodar:
.\rodar.bat
```

> O `.bat` já cria o `.venv`, instala as dependências e sobe o servidor automaticamente.

---

### Frontend

```bash
# Entrar na pasta do frontend
cd frontend

# Rodar em modo desenvolvimento
npm run dev
```

O frontend ficará disponível em `http://localhost:5173`

---

##  Variáveis de Ambiente

Crie um arquivo `.env` dentro da pasta `backend/`:

```env
OPENAI_API_KEY=sua_chave_aqui
TAVILY_API_KEY=sua_chave_aqui
HUNTER_API_KEY=sua_chave_aqui
```

> **Nunca** faça commit do arquivo `.env`. Ele já está no `.gitignore`.

---

##  Git Flow

### Estrutura de Branches

```
main                  → Versão final do projeto (releases)
  └── develop         → Branch de integração (GitHub remoto)
        └── feature/nome-da-feature
        └── feature/nome-da-feature
```

### Fluxo de trabalho (passo a passo)

```bash
# 1. Atualizar a develop local antes de começar
git checkout develop
git pull

# 2. Criar sua branch a partir da develop atualizada
git checkout -b feature/NomeDaSuaFeature

# 3. Fazer suas alterações e commitar
git add .
git commit -m "feat: descrição do que foi feito"

# 4. Enviar para o GitHub
git push origin feature/NomeDaSuaFeature

# 5. Abrir Pull Request no GitHub
# feature/NomeDaSuaFeature → develop-frontend (ou develop-backend)
# Marcar o Tech Lead como Reviewer
```

### Padrão de commits

| Prefixo | Quando usar |
|---------|-------------|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `docs:` | Documentação |
| `chore:` | Configurações e setup |
| `style:` | Formatação de código |

### Regras

- ❌ Nunca commite direto na `main` ou `develop`
- ✅ Sempre crie sua branch a partir da `develop` atualizada
- ✅ Todo PR precisa de aprovação do Tech Lead antes do merge
- ✅ Descreva claramente o que foi feito no PR

---

## Time

| Pessoa | Papel | Responsabilidades |
|--------|-------|-------------------|
| Ronaldo (Tech Lead) | Docs + Revisão | README, testes end-to-end, slides da apresentação, revisar PRs |
| Vitão | Backend | Criação dos Endpoints + Agente|
| Matheus | Backend | Criação dos Endpoints + Agente |
| Sérgio | Frontend | Criação das Páginas Web |
| Anão | Frontend | Criação das Páginas Web |

(backend) --> Criar o agente, configurar apis, criar as variáves de ambiente do backend, etc...

(frontend) --> Criar as interfaces gráficas, consultar apis (puxar dados e enviar dados para o backend), etc...

---

## Links Úteis

- [LangChain Docs](https://docs.langchain.com)
- [FastAPI Docs](https://fastapi.tiangolo.com)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Tavily API Docs](https://docs.tavily.com)
- [Hunter.io API Docs](https://hunter.io/api-documentation)
- [React Docs](https://react.dev)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

---
