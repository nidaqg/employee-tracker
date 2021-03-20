const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
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
        type: 'rawlist',
        message:'Hello, What would you like to do today?',
        choices:[
            'View all Employees, Departments and Roles',
            'View all Employees by Department',
            'View all Employees by Role',
            'View all Employees by Manager ID',
            'Add Employee',
            'Add Department',
            'Add Role',
            'Remove Employee',
            'Update Employee Role',
            'Remove Role',
            'Remove Department',
            'View total utilized Budget by Department',
            'Update Employee Manager',
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
           case 'View all Employees by Role':
               viewByRole()
               break;
           case 'View all Employees by Manager ID':
               viewByManager();
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
           case 'Update Employee Manager':
               updateManager();
               break
        //if 'Exit' is chosen, end connection
           case 'Exit':
               console.log('---------------------------');
               console.log("All Done! Have a great day!");
               console.log('---------------------------');
               connection.end();
               break
       }
    });
}

//function to display all employees, roles and departments
const viewAll = () => {
    console.log('-----------------------------------------');
    console.log('VIEW ALL EMPLOYEES, ROLES AND DEPARTMENTS');
    console.log('-----------------------------------------');
    //query to retrieve data from db
    const query = `SELECT employees.id, employees.first_name AS "First Name", employees.last_name AS "Last Name", role.title AS "Role", role.salary AS "Salary", department.department_name AS "Department"
    FROM employees 
    RIGHT JOIN role ON (role.id = employees.role_id)
    RIGHT JOIN department ON (department.id = role.department_id)
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
    LEFT JOIN role ON (department.id = role.department_id)
    LEFT JOIN employees ON (role.id = employees.role_id)
    ORDER BY department.id;`;
    connection.query(query, (err,res)=> {
        if(err) throw err;
    //display returned data as table
    console.table(res);
    runApp();
    })
};

//function to display employees by role
const viewByRole = () => {
    console.log('-----------------------');
    console.log('EMPLOYEES BY ROLE');
    console.log('-----------------------');
    //query to retrieve data
    const query = `SELECT role.id AS "Role ID", role.title AS "Role", role.salary AS "Salary", employees.first_name AS "First Name", employees.last_name AS "Last Name"
    FROM role
    LEFT JOIN employees ON (role.id = employees.role_id)
    ORDER BY role.id;`;
    connection.query(query, (err,res)=> {
        if(err) throw err;
    //display returned data as table
    console.table(res);
    runApp();
    })
};

//function to display employees by manager
const viewByManager = () => {
    //query to retrieve data from db
    const query = `SELECT id, first_name, last_name, manager_id
    FROM employees;`;
    connection.query(query, (err,res) => {
        if (err) throw err;
        let managerArray = [];
        let empArray = [];
        res.forEach((res) => {
            if (!res.manager_id){
              managerArray.push({id: res.id, Manager:res.first_name + ' '+res.last_name});
            }
            if(res.manager_id !== null){
              empArray.push({Manager_id: res.manager_id, Employees: res.first_name + ' ' + res.last_name})
            }

        })
        console.log('-------------------');
        console.log('VIEW ALL MANAGERS');
        console.log('-------------------');
        console.table(managerArray);
        console.log('----------------------------');
        console.log('VIEW EMPLOYEES BY MANAGER ID');
        console.log('---------------------------');
        console.table(empArray);
        runApp();
    })

}

//function to add new employee
const addEmployee = () => {
//query role table to populate choices for choose_role question
    connection.query('SELECT * FROM role', (err,res)=> {
        if(err) throw err;
//inquirer to get user input to add new employee
    inquirer.prompt([
    {
        name:'first_name',
        type:'input',
        message:'Please enter the first name of the new employee: ',
        validate: function validateInput(name){
            return name !== '';
        }
    },
    {
        name:'last_name',
        type:'input',
        message:'Please enter the last name of the new employee: ',
        validate: function validateInput(name){
            return name !== '';
        }
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
        console.log('---------------------------');
        console.log(`New Employee ${answers.first_name} ${answers.last_name} added!`);
        console.log('---------------------------');
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
     message: "Please enter new department name: ",
     validate: function validateInput(name){
        return name !== '';
    }
    })
    .then((answer)=> {
    //query to insert new data in db
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
        message: "Please enter new role title: ",
        validate: function validateInput(name){
            return name !== '';
        }
       },
       {
        name:"add_salary",
        type:"input",
        message:"Please enter salary for new role: ",
        validate: function validateInput(name){
            return name !== '';
        }
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

//function to delete employee from db
const removeEmployee = () => {
    //query employees table to populate choices for remove_emp question
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
        },
        message:"Please choose Employee to remove:"
    })
    .then((answers) => {
        let removeEmpID;
        res.forEach((res) => {
            if((res.first_name +' '+ res.last_name) === answers.remove_emp) {
                removeEmpID = res.id;
            }
        })
    //query to delete chosen employee
    connection.query(
        'DELETE FROM employees WHERE ?',
        {
            id:removeEmpID,
        },
        (err) => {
            if(err) throw err;
            console.log('-------------------------------');
            console.log(`${answers.remove_emp} successfully deleted!`);
            console.log('-------------------------------');
            runApp();
        }
        )
    })
})
};

//function to update employee role
const updateRole = () => {
//query to populate choices for inquirer prompts
let query =
   `SELECT employees.id, employees.first_name, employees.last_name, employees.role_id, role.title, role.id  
    FROM employees 
    INNER JOIN role ON (role.id = employees.role_id);` 
    connection.query(query, (err,res) => {
    if (err) throw err;

    inquirer.prompt([
        {
        name:"update_employee",
        type:"rawlist",
        choices(){
        const choicesArray = [];
        res.forEach(({first_name,last_name}) => {
            choicesArray.push(first_name + ' ' + last_name);
        });
        return choicesArray;
        },
        message: "Please choose Employee to update role:"
        },
        {
        name:"role_list",
        type:"rawlist",
        choices(){
            const choices = [];
            res.forEach(({title}) => {
            choices.push(title);
            })
            return choices;
            },
            message: "Please choose new role:"   
        }
        ])
        .then ((answers) => {
            let updateID;
            let updateAt;
            res.forEach((res) => {
                if((res.title) === answers.role_list) {
                    updateID = res.id;
                }
                if((res.first_name + ' ' + res.last_name) === answers.update_employee) {
                   updateAt = res.id;
                }
            });
        connection.query(
            'UPDATE employees SET ? WHERE ?',
            [
            {
             role_id: updateID,
            },
            {
            id: updateAt,
            },
            ],
            (err, res)=> {
                if(err) throw err;
                console.log('-----------------------------------');
                console.log(`Role for ${answers.update_employee} updated successfully!`);
                console.log('-----------------------------------');
                runApp();
            }
            )
        })
}
)
};


//function to remove role from db
const removeRole = () => {
    connection.query('SELECT * FROM role', (err,res)=> {
        if(err) throw err;

    inquirer.prompt({
        name:"remove_role",
        type:"rawlist",
        choices(){
            const choicesArray = [];
        res.forEach(({title}) => {
            choicesArray.push(title);
        });
        return choicesArray;
        },
        message: "Please choose role to remove:"
    })
    .then((answers) => {
        let removeRoleID;
        res.forEach((res) => {
            if((res.title) === answers.remove_role) {
                removeRoleID = res.id;
            }
        })
    connection.query(
        'DELETE FROM role WHERE ?',
        {
            id:removeRoleID,
        },
        (err) => {
            if(err) throw err;
            console.log('--------------------------');
            console.log(`${answers.remove_role} successfully deleted from roles!`);
            console.log('--------------------------');
            runApp();
        }
        )
    })
})
};

//function to delete department
const removeDepart = () => {
    connection.query('SELECT * FROM department', (err,res)=> {
        if(err) throw err;

    inquirer.prompt({
        name:"remove_depart",
        type:"rawlist",
        choices(){
            const choicesArray = [];
        res.forEach(({department_name}) => {
            choicesArray.push(department_name);
        });
        return choicesArray;
        },
        message: "Please choose Department to remove:"
    })
    .then((answers) => {
        let removeID;
        res.forEach((res) => {
            if((res.department_name) === answers.remove_depart) {
                removeID = res.id;
            }
        })
    connection.query(
        'DELETE FROM department WHERE ?',
        {
            id:removeID,
        },
        (err) => {
            if(err) throw err;
            console.log('--------------------------------');
            console.log(`${answers.remove_depart} successfully deleted from Departments!`);
            console.log('--------------------------------');
            runApp();
        }
        )
    })
})
}


//function to update manager
const updateManager = () => {
    connection.query('SELECT * FROM employees', (err,res) => {
    if(err) throw err;

    inquirer.prompt([
    {
    name: "update_where",
    type: "rawlist",
    choices() {
     const choices = [];
     res.forEach((res) => {
         if(res.manager_id != null) {
         choices.push(res.first_name + ' ' + res.last_name);
         }
     })
     return choices;
    },
    message: "Please choose an Employee to update their Manager:"
    },
    {
    name:"updated_manager",
    type:"rawlist",
    choices (){
     const choices = [];
    res.forEach((res) => {
        if(!res.manager_id) {
        choices.push(res.first_name + ' ' + res.last_name);
        }
         })
    return choices;
    },
    message: "Please choose new Manager for selected Employee:"
    }
    ])
    .then ((answers) => {
        let updateWhere;
        let newManagerID;

        res.forEach((res) => {
            if((res.first_name + ' ' + res.last_name) === answers.update_where) {
                updateWhere = res.id;
            }
            if((res.first_name + ' ' + res.last_name) === answers.updated_manager) {
               newManagerID = res.id;
            } 
        });
    connection.query(
    'UPDATE employees SET ? WHERE ?',
        [
        {
        manager_id: newManagerID,
        },
        {
        id: updateWhere,
        },
        ],
        (err, res)=> {
        if(err) throw err;
        console.log('-----------------------------');
        console.log(`Manager for ${answers.update_where} successfully updated!`);
        console.log('-----------------------------');
        runApp();
        }
    )
    });
    });
};








