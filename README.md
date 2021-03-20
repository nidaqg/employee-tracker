# Employee Tracker

![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)
![badge](https://img.shields.io/badge/license-MIT-orange)

A Node.js application for adding, deleting, updating and managing employees in a company.  

## User Story

As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business

## Description

This project called for the creation of a node.js application to manage and interact with an employee database in MySql. The database includes 3 tables: employees, roles and departments and the node.js application helps the user add, delete, view or update data within these related tables through the command line. 

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Contributing Guidelines](#contributing)
* [License](#license)
* [Questions](#questions)

## Installation
 
 This application makes use of node.js, MySql npm, inquirer npm and console.table npm packages. To install the npm packages, run 'npm i' in the command line. Make sure your MySql workbench is connected, then create and seed the employees database by opening and running the employeetracker.sql and seed.sql files provided. Once the database has been initialized and seeded, run 'node employeeTracker.js' in the command line to start the app.


## Usage 

This app makes use of inquirer to prompt the user with multiple questions to guide them through interacting with the employees database. The user can:
 - View all employees, roles and departments (this will show all departments even if there are no roles/employees associated with them), 
 - View employees by department, 
 - View employees by role, 
 - View all managers and view employees by manager ID, 
 - Add an employee, 
 - Add a new department,
 - Add a new role, 
 - Remove employee, 
 - Remove department,
 - Remove a role, 
 - Update an employee role, 
 - Update an employee manager
 - View the total budget.

When done, the user can click exit to end the connection.



## Contributing
 ![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)
 Link to Contributor's Covenant:[Contributors Covenant](https://www.contributor-covenant.org/version/2/0/code_of_conduct/) 

 
## License
![badge](https://img.shields.io/badge/license-MIT-orange)
   
Copyright (c) [2021] [Nida Ghuman]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. 

## Questions

The repo for this project can be found here: https://github.com/nidaqg/employee-tracker

video walkthrough link : 

For any questions or to report issues, email me at: nidaqg@gmail.com
