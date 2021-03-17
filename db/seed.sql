USE employees_db;

INSERT INTO department(department_name)
VALUES("Sales"),("Web Development"),("Finance"), ("Legal");

INSERT INTO role(title,salary, department_id)
VALUES("Accountant", 150000, 3),("Senior Developer", 100000, 2), ("Junior Developer", 70000, 2), ("Lawyer", 100000, 4), ("Sales Lead", 90000, 1), ("Salesperson", 70000, 1), ("Legal Team Lead", 170000, 4), ("Head of Finance", 200000, 3);

INSERT INTO employees(first_name, last_name, role_id)
VALUES ("Linda", "Johnson", 1), ("Mike", "Smith", 1), ("John", "Doe", 2), ("Jill", "Danner", 3), ("Alice", "Hanna", 4), ("Alex", "Khan", 4), ("Sruthi", "Varma", 5), ("Jonathan","Tanner", 6), ("Ash", "Pearson", 7), ("Roopi", "Smith", 8), ("Raza", "Brown", 3);