const fs = require('fs');
const path = require('path');
const filename = path.join(__dirname, 'text.txt');
const { stdin, stdout } = process;

const output = fs.WriteStream(filename);
const showMsg = (str) => () => stdout.write(str);
    
showMsg('Hi, please enter the text: > \n\n')();

stdin.on('data', function(data) {
    if (data.toString().trim() == 'exit') {
        process.exit();
    }
    output.write(data);
});

process.on('exit', showMsg('\nEND OF EDIT\nBy!\n'));
process.on('SIGINT', process.exit);