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
      .then(() => copyDir(assetsFolder,toAssets))
      .then(() => createCSS())
      .then(() => createHTML())
      .catch(err => console.log(err));
  });

// Create index.html
const createHTML = () => {
  console.log('TODO need createHTML func');
};



// Create style.css
const createCSS = () => {
  console.log('TODO need createCSS func');
};

// Copy directory
const copyDir = (fromDir, toDir) => {
  fs.promises.rm(toDir, { recursive: true, force: true })
    .then(() => {
      console.log('dir removed');
      fs.promises.mkdir(toDir, { recursive: true })
        .then(() => {
          console.log('maked dir');
          fs.promises.readdir(fromDir,{withFileTypes:true})
            .then((files) => {
              console.log(files);
              files.forEach((file) => {
                if (file.isDirectory()) {
                  console.log(`${file.name} is directory`);
                  copyDir(
                    path.join(fromDir, file.name),
                    path.join(toDir, file.name)
                  );
                } else {
                  fs.promises.copyFile(
                    path.join(fromDir, file.name),
                    path.join(toDir, file.name));
                }
              });
            });
        });
    });
};