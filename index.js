const mysql2 = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const db = mysql2.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

db.connect((err) => {
  if (err) throw err;
  init();
});

function init() {
  inquirer
    .prompt({
      type: "list",
      name: "options",
      message: "What do you want to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
      ],
    })
    .then(function (answers) {
      switch (answers.options) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployee();
          break;
      }
    });
}

function viewDepartments() {
  const query = "SELECT * FROM department";
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    init();
  });
}

function viewRoles() {
  const query = "SELECT * FROM role";
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    init();
  });
}

function viewEmployees() {
  const query =
    "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id FROM employee";
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    init();
  });
}

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "newDepartment",
      message: "What is the name of the new department?",
    })
    .then(function (answers) {
      const query = `INSERT INTO department (name) VALUES ("${answers.newDepartment}")`;
      db.query(query, function (err, res) {
        if (err) throw err;
        console.log("----Added department----");
        init();
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "What is the title of the new role?",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "What is the salary for the new role?",
      },
      {
        type: "input",
        name: "roleDepartment",
        message: "What department contains the new role?",
      },
    ])
    .then(function (answers) {
      const query = `INSERT INTO role (title, salary, department_id) VALUES ("${answers.roleTitle}", "${answers.roleSalary}", "${answers.roleDepartment}")`;
      db.query(query, function (err, res) {
        if (err) throw err;
        console.log("----Added role----");
        init();
      });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the new employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the new employee's last name?",
      },
      {
        type: "input",
        name: "role",
        message: "What is the new employee's role?",
      },
      {
        type: "input",
        name: "manager",
        message: "Who is the new employee's manager?",
      },
    ])
    .then(function (answers) {
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.firstName}", "${answers.lastName}", "${answers.role}", "${answers.manager}")`;
      db.query(query, function (err, res) {
        if (err) throw err;
        console.log("----Added role----");
        init();
      });
    });
}

function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeToUpdate",
        message: "Which employee ID's role would you like to update?",
      },
      {
        type: "input",
        name: "newRole",
        message: "What is the role ID you would like to give them?",
      },
    ])
    .then(function (answers) {
      const query = `UPDATE employee SET role_id = "${answers.newRole}" WHERE role_id = "${answers.employeeToUpdate}"`;
      db.query(query, function (err, res) {
        if (err) throw err;
        console.log("----Added role----");
        init();
      });
    });
}
