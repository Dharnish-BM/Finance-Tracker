@echo off
echo Starting Finance Tracker Project...
echo.

echo Installing client dependencies...
cd client
call npm install

echo.

echo Installing server dependencies...
cd ../server
call npm install
echo.

echo Starting server...
start "Finance Tracker Server" cmd /k "npm run dev"
echo.

echo Waiting 3 seconds before starting client...
timeout /t 3 /nobreak >nul

echo Starting client...
cd ../client
start "Finance Tracker Client" cmd /k "npm run dev"
echo.

echo Both server and client are starting...
echo Server will be available at: http://localhost:5000
echo Client will be available at: http://localhost:5173
echo.
pause
