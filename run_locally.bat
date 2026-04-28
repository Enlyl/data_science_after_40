@echo off
TITLE Научная Станция - Запуск
echo --- Инициализация научной станции... ---

:: Проверка Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Ошибка: Node.js не установлен. Пожалуйста, установите Node.js с сайта https://nodejs.org/
    pause
    exit
)

:: Установка зависимостей, если их нет
if not exist "node_modules" (
    echo Установка необходимых модулей (в первый раз это может занять время)...
    call npm install
)

:: Запуск
echo Запуск локального сервера...
call npm run dev
pause
