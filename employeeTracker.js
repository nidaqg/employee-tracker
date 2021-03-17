const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const render = require('./dist/renderdata');

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
            'View all Employees, Departments and Roles',
            'View all Employees by Department',
            //'View all Employees by Manager',
            'Add Employee',
            'Add Department',
            'Add Role',
            'Remove Employee',
            'Update Employee Role',
            //'Remove Role',
            //'Remove Department',
            'View total utilized Budget by Department',
            //'Update Employee Manager',
            'Exit'
        ],
    })
    //start relevant function depending on answer chosen by user
    .then((answers) => {
       switch(answers.do_what) {
           case 'View all Employees, Departments and Roles':
               render.viewAll();
               break;
           case 'View all Employees by Department':
               render.viewByDep();
               break;
           case 'Add Employee':
               render.addEmployee();
               break;
           case 'Add Department':
               render.addDepart();
               break;
           case 'Add Role':
               render.addRole();
               break;
           case 'Remove Employee':
               render.removeEmployee();
               break;
           case 'Update Employee Role':
               render.updateRole();
               break;
           case 'View total utilized Budget by Department':
               render.viewBudget();
               break
           case 'Exit':
               console.log("All Done! Have a great day!");
               break
       }
    });
}

