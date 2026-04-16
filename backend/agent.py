import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_community.tools.tavily_search import TavilySearchResults

load_dotenv()

def executar_agente_search(nome_empresa: str):
    
    try:
        llm = ChatGroq(model_name="llama-3.3-70b-versatile")
        search = TavilySearchResults(k=5)
        
        query = f"Quem são os atuais executivos C-Level da {nome_empresa}? Liste nomes e cargos."
        resultados_web = search.invoke(query)

        prompt = f"Com base nestes dados: {resultados_web}, liste apenas nomes e cargos C-Level da {nome_empresa}."
        resposta = llm.invoke(prompt)
               
        return {"sucesso": True, "resultado": resposta.content}
    except Exception as e:
        return {"sucesso": False, "erro": str(e)}