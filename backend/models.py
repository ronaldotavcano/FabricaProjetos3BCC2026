from pydantic import BaseModel
from typing import Optional, List


class EmpresaRequest(BaseModel):
    nome: str


class Executivo(BaseModel):
    nome: str
    cargo: str
    email: Optional[str] = None
    linkedin: Optional[str] = None
    telefone: Optional[str] = None
    fonte: Optional[str] = None


class ResultadoEmpresa(BaseModel):
    empresa: str
    executivos: List[Executivo]


class BuscarResponse(BaseModel):
    empresa: str
    dados: ResultadoEmpresa


class ErroResponse(BaseModel):
    detail: str
