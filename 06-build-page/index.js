const fs = require('fs');
const path = require('path');
const assetsFolder = path.join(__dirname, 'assets');
const stylesFolder = path.join(__dirname, 'styles');
const toFolder = path.join(__dirname, 'project-dist');
const toAssets = path.join(toFolder,'assets');
const toBundle = path.join(toFolder, 'style.css');


fs.promises.rm(toFolder, { recursive: true, force: true })
  .then(() => {
    fs.promises.mkdir(toFolder, { recursive: true })
      .then(() => copyDir(assetsFolder,toAssets))
      .then(() => createCSS())
      .then(() => createHTML())
      .catch(err => console.log(err));
  });

// Create index.html
async function createHTML() {
  console.log('first');
  const template = await fs.promises.readFile(path.join(__dirname, 'template.html'), 'utf-8');
  let indexHTML = template;
  const tags = template.match(/\{\{+[a-w]+}}/g);
  for (let tag of tags) {
    let component = await fs.promises.readFile(path.join(__dirname, 'components', `${tag.slice(2, -2)}.html`), 'utf-8');
    indexHTML = indexHTML.replace(`${tag}`, `${component}`);
    await fs.promises.writeFile(path.join(toFolder, 'index.html'), indexHTML);
  }
}



// Create style.css
const createCSS = () => {
  fs.readdir(stylesFolder, { withFileTypes: true }, (err, files) => {
    files.forEach(file => {
      if (file.isFile() && path.extname(file.name) === '.css') {
        fs.readFile(path.join(stylesFolder, file.name), 'utf-8', (err, data) => {
          fs.appendFile(toBundle, data, ()=>{});
        });
      }
    });
  });
};

// Copy directory
const copyDir = (fromDir, toDir) => {
  fs.promises.rm(toDir, { recursive: true, force: true })
    .then(() => {
      fs.promises.mkdir(toDir, { recursive: true })
        .then(() => {
          fs.promises.readdir(fromDir,{withFileTypes:true})
            .then((files) => {
              files.forEach((file) => {
                if (file.isDirectory()) {
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