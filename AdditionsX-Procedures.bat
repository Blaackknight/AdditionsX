@echo off
chcp 65001 > nul
color 0E
title AdditionsX [Selection]

set /p o=Select an option (1, 2, 3) = 
if "%o%"=="1" (
    title AdditionsXP [Idle]
    set /p user_input=Do you want download files ? (Yes/No)
  
    if /i "%user_input%"=="Yes" (
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
        echo Downloading files...
        title AdditionsXP [Downloading]

        color 0E
        echo Download finish !
        title AdditionsXP [Finish]
        timeout /T 3 >nul
        title AdditionsXP [Closing..]
        timeout /T 2 >nul
        exit
    ) else if /i "%user_input%"=="No" (
        echo Cancelled.
        title AdditionsXP [Cancelled]
        timeout /T 3 >nul
        title AdditionsXP [Closing..]
        timeout /T 2 >nul
        exit
    )
) else if "%o%"=="2" (
    title AdditionsXU [Idle]
    Pause
)