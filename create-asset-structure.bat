@echo off
echo Creating asset directory structure for your CV website...

:: Create main asset directories
mkdir asset
mkdir asset\projects
mkdir asset\profile
mkdir asset\certs

echo.
echo Directory structure created!
echo Please place your app icons in the asset\projects folder
echo Example folder structure:
echo.
echo asset\
echo |-- projects\
echo |   |-- bizidigi.webp
echo |   |-- mantra-sukses.webp
echo |   |-- zawia.webp
echo |   |-- ide-usaha.webp
echo |   |-- mimpi.webp
echo |-- profile\
echo |   |-- profile.jpg
echo |-- certs\
echo     |-- cert1.jpg
echo     |-- cert2.jpg
echo.

echo You can now deploy your website using the instructions in deploy-online.md
pause
