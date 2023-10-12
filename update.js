const fs = require('fs');
const { osLocale } = require('os-locale');
const owner = "Blaackknight";
const repo = "AdditionsX";
let w = `Bureau`
let j = null
osLocale().then((e) => {
    j = e
})
if (j === "en") w = "Desktop"
const desktopPath = path.join(process.env.USERPROFILE, w)
const apiURL = `https://api.github.com/repos/${owner}/${repo}/contents/procedures`;
const response = await fetch(apiURL);
fs.unlink(`${desktopPath}\\AdditionsX-Procedures.symlink`, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Fichier supprimé avec succès');
});
fs.unlink(`${desktopPath}\\AdditionsX\\AdditionsX-Procedures.bat`, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Fichier principal supprimé avec succès');
});
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
}