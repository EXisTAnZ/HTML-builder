const fs = require('fs');
const path = require('path');
const foldername = path.join(__dirname, 'secret-folder');

fs.readdir(foldername, { withFileTypes: true }, (err, files) => {
  console.log('\nFiles in secret-folder\n');
  console.log('Name \t\t Ext \t\t Size');
  files.forEach(file => {
    if (file.isFile()) {
      fs.stat(path.join(foldername, file.name), function (err, stats) {
        console.log(path.parse(file.name).name + ' \t\t ' + path.extname(file.name) + ' \t\t ' + (stats.size / 1024).toFixed(2) + 'kB');
      });
    }
  });
});