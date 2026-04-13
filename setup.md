# teste

<aside>
💡

Guia rápido para configurar **Backend (FastAPI)** e **Frontend (Vite/React)**.

</aside>

## 1) Backend (Python + FastAPI)

### 1.1 Entrar na pasta do backend

```bash
cd backend
```

### 1.2 Criar ambiente virtual

```bash
python -m venv venv
```

### 1.3 Ativar o ambiente

- **Windows**
    
    ```bash
    venv\Scripts\activate
    ```
    
- **Linux/Mac**
    
    ```bash
    source venv/bin/activate
    ```
    

> Se aparecer **(venv)** no terminal, o ambiente foi ativado com sucesso.
> 

### 1.4 Instalar dependências

```bash
pip install -r requirements.txt
```

> Se você ainda não tiver um `requirements.txt`, instale o básico e depois gere um:
> 

> `bash
> 

> pip install fastapi uvicorn python-dotenv
> 

> pip freeze > requirements.txt
> 

> `
> 

### 1.5 Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz da pasta `backend`:

```
GROQ_API_KEY=sua_api_key_aqui
TAVILY_API_KEY=sua_api_key_aqui
```

### 1.6 Executar o servidor

```bash
uvicorn main:app --reload
```

---

## 2) Frontend (Node.js + React/Vite)

### 2.1 Entrar na pasta do frontend

```bash
cd frontend
```

### 2.2 Instalar dependências

```bash
npm ci
```

### 2.3 Executar o projeto

```bash
npm run dev
```

---

## (Opcional) Gerar o arquivo `.md` via script

Se quiser gerar esse conteúdo em um arquivo Markdown automaticamente:

```python
content = """# 🚀 Guia de Configuração do Projeto

Guia rápido para configurar Backend (FastAPI) e Frontend (Vite/React).

## 1) Backend (Python + FastAPI)

### 1.1 Entrar na pasta do backend
```

cd backend

```

### 1.2 Criar ambiente virtual
```

python -m venv venv

```

### 1.3 Ativar o ambiente
- Windows
```

venv\Scripts\activate

```
- Linux/Mac
```

source venv/bin/activate

```

### 1.4 Instalar dependências
```

pip install -r requirements.txt

```

### 1.5 Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz da pasta `backend`:
```

GROQ_API_KEY=sua_api_key_aqui

TAVILY_API_KEY=sua_api_key_aqui

```

### 1.6 Executar o servidor
```

uvicorn main:app --reload

```

## 2) Frontend (Node.js + React/Vite)

### 2.1 Entrar na pasta do frontend
```

cd frontend

```

### 2.2 Instalar dependências
```

npm ci

```

### 2.3 Executar o projeto
```

npm run dev

```
"""

with open("guia-configuracao-projeto.md", "w", encoding="utf-8") as f:
	f.write(content)
```