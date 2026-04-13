🚀 Setup do Projeto Fullstack

===========================
📁 BACKEND
===========================

1. Acessar a pasta
cd backend

2. Criar ambiente virtual
python -m venv venv

3. Ativar o ambiente

Windows:
venv\Scripts\activate

Linux/Mac:
source venv/bin/activate

Se aparecer (venv) no terminal → deu certo

---------------------------

4. Instalar dependências
pip install fastapi uvicorn python-dotenv
pip install -r requirements.txt

---------------------------

5. Criar arquivo .env

Crie um arquivo chamado .env dentro da pasta backend e adicione:

GROQ_API_KEY=sua_api_key
TAVILY_API_KEY=sua_api_key

---------------------------

6. Rodar o backend
uvicorn main:app --reload

===========================
🎨 FRONTEND
===========================

1. Acessar a pasta
cd frontend

2. Instalar dependências
npm ci

---------------------------

3. Rodar o frontend
npm run dev

===========================
✅ OBSERVAÇÕES
===========================

- O arquivo .env NÃO deve ser enviado para o Git
- Use .env.example para compartilhar estrutura
- O backend deve estar rodando antes do frontend