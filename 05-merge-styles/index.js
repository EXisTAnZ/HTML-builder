const fs = require('fs');
const path = require('path');
const fromFolder = path.join(__dirname, 'styles');
const toBundle = path.join(__dirname, 'project-dist', 'bundle.css');

fs.rm(toBundle, {force: true, recursive: true}, error => {
  if (error) throw error;
});

fs.readdir(fromFolder, { withFileTypes: true }, (err, files) => {
  files.forEach(file => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      fs.readFile(path.join(fromFolder, file.name), 'utf-8', (err, data) => {
        fs.appendFile(toBundle, data, ()=>{});
      });
    }
  });
});