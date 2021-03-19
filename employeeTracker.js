const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./config/connection');
const { query } = require('./config/connection');

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
            'Remove Role',
            'Remove Department',
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
           case 'Remove Role':
               removeRole();
               break;
           case 'Remove Department':
               removeDepart();
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
    const query = `SELECT employees.id, employees.first_name AS "First Name", employees.last_name AS "Last Name", role.title AS "Role", role.salary AS "Salary", department.department_name AS "Department"
    FROM employees 
    INNER JOIN role ON (role.id = employees.role_id)
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY employees.id;`;
    connection.query(query, (err,res) => {
        if (err) throw err;
    //display returned data as table
        console.table(res);
        runApp();
    })
};

//function to display employees sorted by department
const viewByDep = () => {
    console.log('-----------------------');
    console.log('EMPLOYEES BY DEPARTMENT');
    console.log('-----------------------');
    //query to retrieve data
    const query = `SELECT department.id, department.department_name AS "Department", employees.first_name AS "First Name", employees.last_name AS "Last Name"
    FROM department
    INNER JOIN role ON (department.id = role.department_id)
    INNER JOIN employees ON (role.id = employees.role_id)
    ORDER BY department.id;`;
    connection.query(query, (err,res)=> {
        if(err) throw err;
    //display returned data as table
    console.table(res);
    runApp();
    })
};

//function to add new employee
const addEmployee = () => {
    connection.query('SELECT * FROM role', (err,res)=> {
        if(err) throw err;

    inquirer.prompt([
    {
        name:'first_name',
        type:'input',
        message:'Please enter the first name of the new employee: '
    },
    {
        name:'last_name',
        type:'input',
        message:'Please enter the last name of the new employee: '
    },
    {
        name:'choose_role',
        type:'rawlist',
        choices() {
            const choices = [];
        res.forEach(({title}) => {
            choices.push(title);
        })
        return choices;
        },
        message:'Choose role for new employee: ',
    }
    ])
    .then ((answers) => {
        let newRoleID;
        res.forEach((res)=> {
            if(res.title === answers.choose_role) {
                newRoleID = res.id;
            }
        })

    //query to insert new data
    connection.query(
        'INSERT INTO employees SET ?',
        {
        first_name: answers.first_name,
        last_name: answers.last_name,
        role_id: newRoleID 
        },
        (err) => {
        if(err) throw err;
        console.log(`New Employee ${answers.first_name} ${answers.last_name} added!`);
        runApp();
    })
 
})

    });
}

//function to add new department to db
const addDepart = () => {
    inquirer.prompt({
     name:"add_depart",
     type: "input",
     message: "Please enter new department name: "
    })
    .then((answer)=> {
        connection.query(
            'INSERT INTO department SET ?',
            {
                department_name: answer.add_depart,
            },
            (err)=> {
                if (err) throw err;
                console.log('-------------------------');
                console.log(`Department ${answer.add_depart} has been successfully added!`);
                console.log('-------------------------');
                runApp();
            }
            )
    })
};


//function to add new role to db
const addRole = () => {
    //query department table to populate choices for role_depart question
    connection.query('SELECT * FROM department', (err,res)=> {
        if(err) throw err;

    inquirer.prompt([
        {
        name:"add_role",
        type: "input",
        message: "Please enter new role title: "
       },
       {
        name:"add_salary",
        type:"input",
        message:"Please enter salary for new role: "
       },
       {
        name:"role_depart",
        type:"rawlist",
        choices(){
        const choicesArray = [];
        res.forEach(({department_name}) => {
            choicesArray.push(department_name);
        });
        return choicesArray;
        },
        message:"Which department will the new role fall under?"
       }
      ])
       .then((answer)=> {
    //get department id based on department chosen by user
           let newDepartmentID;
           res.forEach((res) => {
               if(res.department_name === answer.role_depart) {
                   newDepartmentID = res.id; 
               }
           })
    //insert new role data in db
           connection.query(
               'INSERT INTO role SET ?',
               {
                   title: answer.add_role,
                   salary: answer.add_salary,
                   department_id: newDepartmentID,
               },
               (err)=> {
                   if (err) throw err;
                   console.log('----------------------');
                   console.log(`New role ${answer.add_role} has been successfully added!`);
                   console.log('----------------------');
                   runApp();
               }
            )
       });
    });
};

const removeEmployee = () => {
    connection.query('SELECT * FROM employees', (err,res)=> {
        if(err) throw err;

    inquirer.prompt({
        name:"remove_emp",
        type:"rawlist",
        choices(){
            const choicesArray = [];
        res.forEach(({first_name,last_name}) => {
            choicesArray.push(first_name +' '+ last_name);
        });
        return choicesArray;
        }
        
    })
    .then((answers) => {
        let removeEmpID;
        res.forEach((res) => {
            if((res.first_name +' '+ res.last_name) === answers.remove_emp) {
                removeEmpID = res.id;
            }
        })
    connection.query(
        'DELETE FROM employees WHERE ?',
        {
            id:removeEmpID,
        },
        (err) => {
            if(err) throw err;
            console.log('Employee successfully deleted!');
            runApp();
        }
        )
    })
})
};



const updateRole = () => {
    console.log('updateRole called');
};

const removeRole = () => {
    console.log('remove role');
};

const removeDepart = () => {
    console.log('remove department');
}
const viewBudget = () => {
    console.log('view Budget called');
};










