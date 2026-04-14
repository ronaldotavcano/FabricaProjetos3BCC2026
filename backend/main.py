from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import executar_agente_search  # Importando a lógica do chef

app = FastAPI(title="API de Busca C-Level ")

# 1. Configuração de CORS: Permite que o React (Frontend) fale com você
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Libera para todos os navegadores durante o desenvolvimento
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Modelo de entrada (O que o React envia)
class EmpresaRequest(BaseModel):
    nome: str

@app.get("/")
def status():
    return {"status": "Servidor Backend Operacional", "versao": "1.0"}

# 3. A ROTA PRINCIPAL: Onde a mágica acontece
@app.post("/buscar")
async def buscar_executivos(request: EmpresaRequest):
    """Rota que recebe o nome da empresa e aciona o agente."""
    print(f"Buscando executivos para: {request.nome}")
    
    dados = executar_agente_search(request.nome)
    
    if not dados["sucesso"]:
        raise HTTPException(status_code=500, detail=dados["erro"])
        
    return {
        "empresa": request.nome,
        "dados": dados["resultado"]
    }