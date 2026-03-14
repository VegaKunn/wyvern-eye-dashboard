@echo off
title Wyvern Eye Overlay - Installer

echo.
echo ==========================================
echo     WYVERN EYE OVERLAY INSTALLER
echo ==========================================
echo.

:: Check Node installation
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js nao encontrado.
    echo.
    echo Este projeto precisa do Node.js 16 para funcionar.
    echo.
    echo Baixe aqui:
    echo https://nodejs.org/dist/v16.20.2/
    echo.
    pause
    exit
)

:: Check Node version
for /f "tokens=1 delims=." %%a in ('node -v') do set NODEVER=%%a

if NOT "%NODEVER%"=="v16" (
    echo ERROR: Versao incorreta do Node.js detectada.
    echo.
    echo Versao atual:
    node -v
    echo.
    echo Este projeto funciona SOMENTE com Node.js 16.
    echo Baixe aqui:
    echo https://nodejs.org/dist/v16.20.2/
    echo.
    pause
    exit
)

echo Node.js 16 detectado com sucesso!
echo.

echo Instalando dependencias...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Falha ao instalar dependencias.
    echo Verifique sua conexao com a internet ou permissao do sistema.
    pause
    exit
)

echo.
echo ==========================================
echo     INSTALACAO CONCLUIDA COM SUCESSO
echo ==========================================
echo.
pause