from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import EmpresaRequest
from agent import executar_agente_search

app = FastAPI(
    title="C-Level Finder API",
    description="API que busca executivos C-Level de empresas usando IA",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def status():
    return {"status": "Servidor Backend Operacional", "versao": "1.0.0"}


@app.post("/buscar")
async def buscar_executivos(request: EmpresaRequest):
    if not request.nome.strip():
        raise HTTPException(status_code=400, detail="Nome da empresa não pode ser vazio.")

    print(f"[API] Buscando executivos para: {request.nome}")

    dados = executar_agente_search(request.nome.strip())

    if not dados["sucesso"]:
        raise HTTPException(status_code=500, detail=dados["erro"])

    return {
        "empresa": request.nome,
        "dados": dados["resultado"]
    }
