const fs = require('fs');
const path = require('path');
const fromFolder = path.join(__dirname, 'files');
const toFolder = path.join(__dirname, 'files-copy');

fs.promises.rm(toFolder, { recursive: true, force: true })
  .then(() => {
    fs.promises.mkdir(toFolder, { recursive: true })
      .then(() => copyDir());
      
  });

function copyDir() {
  fs.promises.readdir(fromFolder)
    .then((files) => {
      files.forEach(file => {
        fs.promises.copyFile(`${fromFolder}/${file}`, `${toFolder}/${file}`);
      });
    });
}
