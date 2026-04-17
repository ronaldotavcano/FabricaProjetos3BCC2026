from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import executar_agente_search  

app = FastAPI(title="API de Busca C-Level ")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

class EmpresaRequest(BaseModel):
    nome: str

@app.get("/")
def status():
    return {"status": "Servidor Backend Operacional", "versao": "1.0"}


@app.post("/buscar")
async def buscar_executivos(request: EmpresaRequest):
    
    print(f"Buscando executivos para: {request.nome}")
    
    dados = executar_agente_search(request.nome)
    
    if not dados["sucesso"]:
        raise HTTPException(status_code=500, detail=dados["erro"])
        
    return {
        "empresa": request.nome,
        "dados": dados["resultado"]
    }