echo Iniciando esta madre...
call ionic cap sync
call npm install

echo Continuando esta madre...

call ionic build

call ionic cap build

pause
