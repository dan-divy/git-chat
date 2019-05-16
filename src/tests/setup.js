const editJsonFile = require("edit-json-file");

let file = editJsonFile(`${__dirname.split('/src')[0]}/package.json`);


const inquirer = require('inquirer');
var questions = [
{
    type: 'input',
    name: 'name',
    message: "Name: ",
},
{
    type: 'input',
    name: 'version',
    message: "Version: ",
},
{
    type: 'input',
    name: 'description',
    message: "Description: ",
},
{
    type: 'input',
    name: 'username',
    message: "Username: ",
},
{
    type: 'input',
    name: 'email',
    message: "Email: ",
},
{
    type: 'input',
    name: 'repo',
    message: "Git Repo (Optional): ",
},
]
  
  inquirer.prompt(questions).then(answers => {
    file.set('name', answers['name'].toLowerCase());
    file.set('version', answers['version']);
    file.set("description", answers['description']);
    file.set("author", `${answers['username']} <${answers['email']}>`);
    if(answers['repo']) file.set("repository", answers['repo'])
    file.save();
  })
