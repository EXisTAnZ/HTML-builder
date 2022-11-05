const { throws } = require('assert');
const fs = require('fs');
const path = require('path');
const assetsFolder = path.join(__dirname, 'assets');
const stylesFolder = path.join(__dirname, 'styles');
const toFolder = path.join(__dirname, 'project-dist');
const toAssets = path.join(toFolder,'assets');
const toBundle = path.join(toFolder, 'bundle.css');


fs.promises.rm(toFolder, { recursive: true, force: true })
  .then(() => {
    fs.promises.mkdir(toFolder, { recursive: true })
      .then(() => createHTML())
      .then(() => createCSS())
      .then(() => copyDir())
      .catch(err => console.log(err));
  });


const createHTML = () => {
  throws.console.error('TODO need createHTML func');
};



// Create style.css
const createCSS = () => {
  throws.console.error('TODO need createCSS func');
};

// Copy directory
const copyDir = () => {
  fs.promises.rm(toAssets, { recursive: true, force: true })
    .then(() => {
      fs.promises.mkdir(toAssets, { recursive: true })
        .then(() => {
          fs.promises.readdir(assetsFolder)
            .then((files) => {
              files.forEach(file => {
                fs.promises.copyFile(
                  path.join(assetsFolder, file),
                  path.join(toAssets, file));
              });
            });
        });
    });
};