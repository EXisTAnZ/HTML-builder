const fs = require('fs');
const path = require('path');
const fromFolder = path.join(__dirname, 'files');
const toFolder = path.join(__dirname, 'files-copy');

fs.promises.rm(toFolder, { recursive: true, force: true })
  .then(() => {
    fs.promises.mkdir(toFolder, { recursive: true })
      .then(() => {
        fs.promises.readdir(fromFolder)
          .then((files) => {
            files.forEach(file => {
              fs.promises.copyFile(
                path.join(fromFolder, file),
                path.join(toFolder, file));
            });
          });
      });
  });