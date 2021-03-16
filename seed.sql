USE employees_db;

INSERT INTO department(department_name)
VALUES("HR"),("Marketing"),("Development"),("Operations");

INSERT INTO role(title,salary)
VALUES("Manager", 7000),("Senior Developer", 6000), ("Junior Developer", 4000), ("Intern", 2000), ("Associate", 5000), ("Administrative Assistant", 4000);

INSERT INTO employees(first_name, last_name)
VALUES ("Linda", "Johnson"), ("Mike", "Smith"), ("John", "Doe"), ("Jill", "Danner"), ("Alice", "Hanna"), ("Alex", "Khan"), ("Sruthi", "Varma"), ("Jonathan","Tanner"), ("Ash", "Pearson"), ("Roopi", "Smith");