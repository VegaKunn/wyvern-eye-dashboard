@echo off
title Wyvern Eye Dashboard Launcher
cls

echo ======================================================
echo          WYVERN EYE DASHBOARD LAUNCHER
echo ======================================================
echo.

:: Verifica Node
node -v | findstr "v16." >nul
if %errorlevel% neq 0 (
    echo [ERRO] NodeJS 16 nao detectado.
    echo Baixe em: https://nodejs.org/dist/v16.20.2/
    pause
    exit /b
)

:: Verifica dependencias
if not exist "node_modules\" (
    echo [ERRO] Dependencias nao instaladas.
    echo Execute: npm install
    pause
    exit /b
)

:: Verifica se build existe
if exist ".next\BUILD_ID" (
    echo [INFO] Build ja encontrado. Pulando build...
) else (
    echo [INFO] Build nao encontrado. Gerando build...
    echo.
    call npm run build

    if %errorlevel% neq 0 (
        echo.
        echo [ERRO] Falha no build.
        pause
        exit /b
    )
)

echo.
echo [INFO] Iniciando servidor Next...
echo.

:: Abre navegador em paralelo
start "" http://localhost:3000

:: Roda servidor (fica preso aqui)
npm start

echo.
echo ======================================================
echo O servidor foi encerrado.
echo ======================================================
pause