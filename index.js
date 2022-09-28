const inquirer = require("inquirer");
const mysql = require("mysql2");
const consTable = require("console.table");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root",
    database: "employee_db",
  },
  console.log("Connected to the employees_db database!")
);

db.connect((err) => {
  if (err) throw err;
  console.log("There was an error connecting to employee_db database!");

  firstPrompt();
});

function firstPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "firstPrompt",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then((answers) => {
      if (answers.firstPrompt === "view all departments") {
        viewDeps();
      }
      if (answers.firstPrompt === "view all roles") {
        viewRoles();
      }
      if (answers.firstPrompt === "view all employees") {
        viewEmps();
      }
      if (answers.firstPrompt === "add a department") {
        addDep();
      }
      if (answers.firstPrompt === "add a role") {
        addRole();
      }
      if (answers.firstPrompt === "add an employee") {
        addEmp();
      }
      if (answers.firstPrompt === "update an employee role") {
        updateEmp();
      }
    });
}

let allDeps = [];
function pickDeps() {
  db.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    for (i = 0; i <= res.length; i++) {
      allDeps.push(res[i].depName);
    }
  });
  return allDeps;
}

let allRoles = [];
function pickRoles() {
  db.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    for (i = 0; i <= res.length; i++) {
      allRoles.push(res[i].title);
    }
  });
  return allRoles;
}

let allEmps = [];
function pickEmps() {
  db.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;
    for (i = 0; i <= res.length; i++) {
      allEmps.push(res[i].firstName);
    }
  });
  return allEmps;
}

let manList = [];
function pickMan() {
  db.query(
    `SELECT * from employees WHERE manager_id = NULL`,
    function (err, res) {
      if (err) throw err;
      for (i = 0; i <= res.length; i++) {
        manList.push(res[i].firstName);
      }
    }
  );
  return manList;
}

function addDep() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "depAdded",
      },
    ])
    .then((answers) => {
      db.query(`INSERT INTO departments (depName)
        VALUES ('${answers.depAdded}')`),
        function (err) {
          if (err) throw err;
          firstPrompt();
        };
    });
  console.log("department added succesfully!");
  firstPrompt();
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "what is the name of the role?",
        name: "roleName",
      },
      {
        type: "input",
        message: "what is the salary of this role?",
        name: "roleSalary",
      },
      {
        type: "list",
        message: "what department is this role in?",
        name: "depRole",
        choices: pickDeps(),
      },
    ])
    .then((answers) => {
      db.query(`INSERT INTO roles (title, salary, department_id)
        VALUES  ('${answers.roleAdded}',
                '${answers.salaryAdded}',
                '${allDeps.indexOf(answers.depRole) + 1}');`);
    });
  console.log("role added succesfully!");
  firstPrompt();
}

function addEmp() {
  inquirer
    .prompt([
      {
        type: "input",
        message: `what is the employee's first name?`,
        name: "firstName",
      },
      {
        type: "input",
        message: `what is the employee's last name?`,
        name: "lastName",
      },
      {
        type: "input",
        message: `what is this employee's role?`,
        name: "role",
        choices: pickRoles(),
      },
      {
        type: "list",
        message: `who is the employee's manager?`,
        name: "empManager",
        choices: pickMan(),
      },
    ])
    .then((answers) => {
      db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES  ('${answers.firsName}',
                '${answers.lastName}',
                '${allRoles.indexOf(answers.roles) + 1}',
                '${manList.indexOf(answers.empManager)}');`),
        function (err) {
          if (err) throw err;
          firstPrompt();
        };
    });
  console.log("employee added succesfully!");
  firstPrompt();
}

function viewDeps() {
  db.query(`SELECT * FROM departments`, function (err, res) {
    if (err) throw err;
    console.table(res);
    firstPrompt();
  });
}

function viewRoles() {
  db.query(`SELECT * FROM roles`, function (err, res) {
    if (err) throw err;
    console.table(res);
    firstPrompt();
  });
}

function viewEmps() {
  db.query(`SELECT employees.id, employees.first_name, employees.last_namem, employees.manager_id,   roles.title, roles.departmebnt_id, roles.salary, FROM employees JOIN roles ON employees.role_id = roles.id`, function (err, res) {
    if (err) throw err;
    console.table(res);
    firstPrompt();
  });
}

function updateEmp() {
  inquirer
    .prompt([
      {
        type: "list",
        message: `Which Employee would you like to update?`,
        name: "empName",
        choices: pickEmps(),
      },
      {
        type: "list",
        message: `What role would you like to give them?`,
        name: "empRole",
        choices: pickRoles(),
      },
    ])
    .then((answers) => {
      db.query(`UPDATE employees SET role_id = '${answers.empRole}' WHERE role_id = ${answers.empName}`), function (err) {
        if (err) throw err;
        console.log(err);
        firstPrompt();
      };
      console.log('employee updated!')
      firstPrompt ()
    });
}
