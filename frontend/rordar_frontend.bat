@echo off
chcp 65001 > nul
title FinderAgent - Frontend

echo ================================
echo   Iniciando Frontend...
echo ================================
echo.

node --version > nul 2>&1 || (
    echo [ERRO] Node.js nao encontrado!
    echo Baixe em: https://nodejs.org/
    pause & exit /b
)

if not exist "node_modules" (
    echo Instalando dependencias, aguarde...
    npm install
)

echo Acesse: http://localhost:5173  ^|  Ctrl+C para encerrar
echo.
npm run dev