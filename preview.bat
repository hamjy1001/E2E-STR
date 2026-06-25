@echo off
echo =============================================
echo  E2E STR - Local Preview Server
echo =============================================
echo.
echo Starting server at http://localhost:8080
echo Press Ctrl+C to stop.
echo.
start "" http://localhost:8080
py -m http.server 8080
