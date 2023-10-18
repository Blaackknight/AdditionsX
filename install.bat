@echo off
color 0E
title AdditionsX [Main]
set /p o=Install (y, n) > 
if /i "%o%"=="y" (
    title AdditionsX [Starting]
    if exist "C:\Users\lolmd\Bureau\AdditionsX" (
        echo AdditionsX folder already exist at C:\Users\lolmd\Bureau\
    ) else (
        mkdir C:\Users\lolmd\Bureau\AdditionsX && echo AdditionsX folder created at C:\Users\lolmd\Bureau\
        timeout /T 1 >nul
        move C:\Users\lolmd\Bureau\AdditionsX-Procedures.bat C:\Users\lolmd\Bureau\AdditionsX
        timeout /T 1 >nul
        mklink C:\Users\lolmd\Bureau\AdditionsX-Procedures C:\Users\lolmd\Bureau\AdditionsX\AdditionsX-Procedures.bat
        timeout /T 1 >nul
        attrib +h C:\Users\lolmd\Bureau\AdditionsX\AdditionsX-Procedures.bat
    )
    timeout /T 1 >nul
    title AdditionsX [Installing]
    echo Installing files...
    color 0A
    curl --progress-bar https://raw.githubusercontent.com/Blaackknight/AdditionsX/main/procedures/GenericFortune.ptpl -o "C:\Users\lolmd\.mcreator\templates\ptpl\GenericFortune.ptpl" && echo "\-> GENERICFORTUNE.PTPL Downloaded."
) else (

)