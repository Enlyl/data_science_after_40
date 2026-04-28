#!/bin/bash
# Скрипт для автоматического запуска на новом ПК (Linux/Mac)

echo "--- Инициализация научной станции... ---"

# Проверка Node.js
if ! command -v node &> /dev/null
then
    echo "Ошибка: Node.js не установлен. Пожалуйста, установите Node.js с сайта https://nodejs.org/"
    exit
fi

# Установка зависимостей, если их нет
if [ ! -d "node_modules" ]; then
    echo "Установка необходимых модулей (в первый раз это может занять время)..."
    npm install
fi

# Сборка и запуск
echo "Запуск локального сервера..."
npm run dev
