@echo off
echo ======================================
echo   Starting local server for CV site
echo ======================================
echo.
echo Your CV website will be available at:
echo http://localhost:8000
echo.
echo Press Ctrl+C to stop the server when done.
echo.

:: Try Python 3 first
python -m http.server 2>nul
if %errorlevel% equ 0 goto :end

:: If Python 3 fails, try Python 2
python -m SimpleHTTPServer 2>nul
if %errorlevel% equ 0 goto :end

:: If both Python options fail, try with Node.js http-server
npx http-server 2>nul
if %errorlevel% equ 0 goto :end

:: If all else fails, just open the file directly
echo Unable to start a local server. Opening the file directly in browser...
start index.html

:end
pause
