const editJsonFile = require("edit-json-file");
const name = process.argv[process.argv.length-1];
// If the file doesn't exist, the content will be an empty object by default.
let file = editJsonFile(`${__dirname.split('/src')[0]}/package.json`);
 
// Set a couple of fields
file.set("name", name);
 
file.save();