import os
import json
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_community.tools.tavily_search import TavilySearchResults

load_dotenv()

def executar_agente_search(nome_empresa: str):
    """Função que o Backend (Victor) vai chamar para obter os dados."""
    try:
        llm = ChatGroq(model_name="llama-3.3-70b-versatile")
        search = TavilySearchResults(k=5)

        # 1. Busca na Web
        query = (
            f'"{nome_empresa}" '
            f'("CEO" OR "CFO" OR "COO" OR "CTO" OR "CMO" OR "CHRO" OR "CPO" '
            f'OR "Diretor Executivo" OR "Diretor Financeiro" OR "Diretor de Operações") '
            f'("equipe executiva" OR "liderança" OR "diretoria" OR "sobre nós" OR "time executivo" OR "board") '
            f'(site:linkedin.com OR site:*.com OR site:*.com.br) '
            f'(2024 OR 2025)'
        )

        resultados_web = search.invoke(query)

        # 2. Processamento da IA
        prompt = f"""
Você é um assistente especializado em identificar executivos C-Level de empresas.

Analise os resultados de busca abaixo e extraia APENAS executivos de alto nível da empresa "{nome_empresa}".

RESULTADOS DA BUSCA:
{resultados_web}

OBJETIVO:
Identificar SOMENTE executivos C-Level ou equivalentes.

---

REGRAS CRÍTICAS:

1. MAPEAMENTO DE CARGOS (MUITO IMPORTANTE):
Converta automaticamente variações para o padrão C-Level:

- Chief Executive Officer → CEO
- Presidente → CEO
- Diretor Executivo → CEO ou equivalente

- Chief Financial Officer → CFO
- Diretor Financeiro → CFO

- Chief Operating Officer → COO
- Diretor de Operações → COO

- Chief Technology Officer → CTO
- Diretor de Tecnologia → CTO

- Chief Marketing Officer → CMO
- Diretor de Marketing → CMO

- Chief Human Resources Officer → CHRO
- Diretor de RH → CHRO

- Chief Information Officer → CIO
- Chief Data Officer → CDO
- Chief Compliance Officer → CCO
- Chief Information Security Officer → CISO

2. FILTRO DE QUALIDADE:
- IGNORE cargos como: analista, coordenador, especialista, HRBP, gerente
- IGNORE pessoas sem cargo claro
- NÃO inclua cargos médios ou operacionais

3. VALIDAÇÃO:
- Só inclua se houver evidência clara no texto
- Se houver dúvida → NÃO incluir

4. EXTRAÇÃO:
- Nome completo
- Cargo padronizado (ex: CEO, CFO, CTO…)
- LinkedIn, email ou telefone (se existir)
- Caso não exista → null

5. LIMPEZA:
- Remover duplicados
- Manter apenas executivos únicos

---

FORMATO DE SAÍDA:

- Retorne APENAS JSON válido
- NÃO use ```json``` ou qualquer texto adicional

{{
  "empresa": "{nome_empresa}",
  "executivos": [
    {{
      "nome": "Nome Completo",
      "cargo": "CEO",
      "email": null,
      "linkedin": null,
      "telefone": null,
      "fonte": "URL ou domínio"
    }}
  ]
}}
"""

        resposta = llm.invoke(prompt)

        conteudo = resposta.content.strip()

        # Remove ```json se vier
        if conteudo.startswith("```"):
            conteudo = conteudo.replace("```json", "").replace("```", "").strip()

        # Converte para JSON
        resultado_json = json.loads(conteudo)

        return {"sucesso": True, "resultado": resultado_json}

    except Exception as e:
        return {"sucesso": False, "erro": str(e)}