const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
//const render = require('./dist/renderdata');
const connection = require('./config/connection');

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
               viewAll();
               break;
           case 'View all Employees by Department':
               viewByDep();
               break;
           case 'Add Employee':
               addEmployee();
               break;
           case 'Add Department':
               addDepart();
               break;
           case 'Add Role':
               addRole();
               break;
           case 'Remove Employee':
               removeEmployee();
               break;
           case 'Update Employee Role':
               updateRole();
               break;
           case 'View total utilized Budget by Department':
               viewBudget();
               break
           case 'Exit':
               console.log("All Done! Have a great day!")
               connection.end();
               break
       }
    });
}

//function to display all employees, roles and departments
const viewAll = () => {
    console.log('-----------------');
    console.log('VIEW ALL EMPLOYEES');
    console.log('-----------------');
    //query to retrieve data from db
    let query = `SELECT employees.id, employees.first_name, employees.last_name, role.title, role.salary, department.department_name
    FROM employees 
    INNER JOIN role ON (role.id = employees.id)
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY employees.id;`;
    connection.query(query, (err,res) => {
        if (err) throw err;
    //display returned data as table
        console.table(res);
        runApp();
    })

};

const viewByDep = () => {
    console.log('view by department called');
};



const addEmployee = () => {
    console.log('Add a new Employee: ');
    
}

const addDepart = () => {
    console.log('add department called');
};

const addRole = () => {
    console.log('add role called');
};

const removeEmployee = () => {
    console.log('remove employee called');
};
const updateRole = () => {
    console.log('updateRole called');
};
const viewBudget = () => {
    console.log('view Budget called');
};










