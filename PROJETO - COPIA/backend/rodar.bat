@echo off
chcp 65001 > nul
title API C-Level

echo ================================
echo   Iniciando API C-Level...
echo ================================
echo.

:: ── 1. Python instalado? ─────────────────────────────────────
python --version > nul 2>&1 || (
    echo [ERRO] Python nao encontrado!
    echo Baixe em: https://www.python.org/downloads/
    pause & exit /b
)

:: ── 2. Ambiente virtual ───────────────────────────────────────
if not exist ".venv" python -m venv .venv
call .venv\Scripts\activate.bat

:: ── 3. Dependencias ───────────────────────────────────────────
pip install -r requirements.txt -q --disable-pip-version-check

:: ── 4. Servidor ───────────────────────────────────────────────
echo Acesse: http://localhost:8000  ^|  Ctrl+C para encerrar
echo.
uvicorn main:app --host 0.0.0.0 --port 8000 --reload