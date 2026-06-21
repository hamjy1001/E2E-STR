@echo off
echo =============================================
echo  E2E STR - Local Preview Server
echo =============================================
echo.
where python >nul 2>nul
if %ERRORLEVEL% == 0 (
  echo Starting server at http://localhost:8080
  echo Press Ctrl+C to stop.
  echo.
  start "" http://localhost:8080
  python -m http.server 8080
  goto :eof
)
where python3 >nul 2>nul
if %ERRORLEVEL% == 0 (
  echo Starting server at http://localhost:8080
  echo Press Ctrl+C to stop.
  echo.
  start "" http://localhost:8080
  python3 -m http.server 8080
  goto :eof
)
where node >nul 2>nul
if %ERRORLEVEL% == 0 (
  echo Python not found. Trying Node http-server...
  npx --yes http-server -p 8080 -o
  goto :eof
)
echo Neither Python nor Node found.
echo Opening index.html directly in browser instead.
echo Note: some features may behave differently without a server.
echo.
start "" index.html
