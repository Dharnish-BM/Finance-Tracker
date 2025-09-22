@echo off
echo ===============================
echo 🚀 Starting Full Project Setup
echo ===============================

:: Start Frontend
echo Starting Frontend (Vite React)...
start cmd /k "cd client && npm run dev"

:: Start Backend (Node.js)
echo Starting Backend (Node)...
start cmd /k "cd node && node index.js"

:: Start Python Service
echo Starting Python Script...
start cmd /k "cd python && python main.py"

echo ===============================
echo ✅ All services launched!
echo ===============================
pause
