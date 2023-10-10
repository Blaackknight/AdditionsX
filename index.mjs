
import fs from 'fs';
import path from 'path';
import os from 'os';
import fetch from 'node-fetch';
import { osLocale } from 'os-locale';

async function downloadFilesFromGitHub(owner, repo) {
  let list = []
  let txt = ``
  const filePath = './AdditionsX-Procedures.bat';
  let w = `Bureau`
  let j = null
  osLocale().then((e) => {
    j = e
  })
  if (j === "en") w = "Desktop"
  const desktopPath = path.join(process.env.USERPROFILE, w)
  const apiURL = `https://api.github.com/repos/${owner}/${repo}/contents/procedures`;
  const response = await fetch(apiURL);
  if (response.ok) {
    const files = await response.json();
    const userFolder = path.join(os.homedir(), '.mcreator');
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder);
    }
    const destinationFolder = path.join(userFolder, 'templates', 'ptpl');
    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder, { recursive: true });
    }
    for (const file of files) {
      if (file.type === 'file') {
        const downloadURL = file.download_url;
        const filename = file.name;
        if(!filename.includes("ptpl")) return;
        const fileResponse = await fetch(downloadURL);
        let rr = `${filename}`
        list.push(`        curl --progress-bar ${downloadURL} -o "${destinationFolder}\\${filename}" && echo "\\-> ${rr.toUpperCase()} Downloaded."\n        color 0A\n        timeout /T 1 >nul\n        color 0C`)
        if (fileResponse.ok) {
          const fileData = await fileResponse.buffer();
          const filePath = path.join(destinationFolder, filename);
          //fs.writeFileSync(filePath, fileData);
          //console.log(`Le fichier ${filename} a été téléchargé avec succès dans le dossier ${destinationFolder}.`);
        } else {
          //console.log(`Impossible de télécharger le fichier ${filename}.`);
        }
      }
    }
  } else {
    console.log("Impossible de récupérer la liste des fichiers du dépôt.");
  }
  list.forEach((e) => {
    txt += `${e}\n`
  })
  fs.truncate(filePath, 0, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Fichier réinitialisé avec succès !');
  });
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // Ajout de la ligne "test" après les lignes existantes
    const modifiedData = `@echo off
chcp 65001 > nul
color 0E
title AdditionsX [Selection]\n
set /p o=Select an option (1, 2, 3) = 
if "%o%"=="1" (
    title AdditionsXP [Idle]
    set /p user_input=Do you want download files ? (Yes/No)\n  
    if /i "%user_input%"=="Yes" (\n        if exist "${desktopPath}\\AdditionsX" (\n           echo AdditionsX folder already exist at ${desktopPath}\\\n        ) else (\n           mkdir ${desktopPath}\\AdditionsX && echo AdditionsX folder created at ${desktopPath}\\\n           timeout /T 1 >nul\n           move ${desktopPath}\\AdditionsX-Procedures.bat ${desktopPath}\\AdditionsX\n           timeout /T 1 >nul\n           mklink ${desktopPath}\\AdditionsX-Procedures ${desktopPath}\\AdditionsX\\AdditionsX-Procedures.bat\n           timeout /T 1 >nul\n           attrib +h ${desktopPath}\\AdditionsX\\AdditionsX-Procedures.bat\n        )\n        echo Downloading files...\n        title AdditionsXP [Downloading]\n${txt}\n        color 0E\n        echo Download finish !\n        title AdditionsXP [Finish]\n        timeout /T 3 >nul\n        title AdditionsXP [Closing..]\n        timeout /T 2 >nul\n        exit\n    ) else if /i "%user_input%"=="No" (
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
)`;

    // Réécriture du fichier avec la ligne ajoutée
    fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Ligne ajoutée avec succès !');
    });
  });
}

// Utilisation de la fonction pour télécharger les fichiers
const owner = "Blaackknight";
const repo = "AdditionsX";
downloadFilesFromGitHub(owner, repo);