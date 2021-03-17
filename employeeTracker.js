const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

//create connection
const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,
    user:'root',

    password:'bootcamp',
    database:'employees_db',
});

//pass function into connect so it will run when connection established
connection.connect((err) => {
    if(err) throw err;
    runApp();
});

//run inquirer and start app
const runApp = () => {
    inquirer.prompt({
        name:'do_what',
        type: 'list',
        message:'Hello, What would you like to do today?',
        choices:[
            'Add department, role or employee',
            'View department, role or employee',
            'Update employee roles'
        ],
    })
    //start relevant function depending on answer chosen by user
    .then((answers) => {
       switch(answers.do_what) {
           case 'Add department, role or employee':
               addInfo();
               break;
           case 'View department, role or employee':
               viewInfo();
               break;
           case 'Update employee roles':
               updateInfo();
               break;
       }
    });
}

const addInfo = () => {
    console.log('addinfo');
};

const viewInfo = () => {
    console.log('view info');
};

const updateInfo = () => {
    console.log('update info');
};

