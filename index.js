const inquirer = require("inquirer");
const mysql = require("mysql2");
const consTable = require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employee_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the employees_db database!");
  showConnection();
});

function showConnection() {
  console.log("=======================");
  console.log("|                     |");
  console.log("|   EMPLOYEE TRACKER  |");
  console.log("|                     |");
  console.log("=======================");
  pickEmps();
  console.log(allemps);
  firstPrompt();
}

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
          "im done organizing my company",
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
      if (answers.firstPrompt === "im done organizing my company") {
        return;
      }
    });
}

let alldeps = [];
function pickDeps() {
  db.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      alldeps.push(res[i].depName);
    }
  })
  return alldeps;
}


let allroles = [];
function pickRoles() {
  db.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      allroles.push(res[i].title)
    }
  })
  return allroles;
}

let allemps = [];
function pickEmps() {
  db.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      allemps.push(res[i].first_name);
    }
  });
  return allemps;
}

let managerlist = ['NULL'];
function pickMan() {
  db.query(
    'SELECT * FROM employees WHERE manager_id IS NULL;',
    function (err, res) {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        managerlist.push(res[i].first_name);
      }
    }
  );
  return managerlist;
}

// functions that add department, role, and employees
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
      console.log("department added succesfully!");
      firstPrompt();
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "what is the name of the role?",
        name: "roleAdded",
      },
      {
        type: "input",
        message: "what is the salary of this role?",
        name: "salaryAdded",
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
                '${alldeps.indexOf(answers.depRole) + 1}');`),
        function (err) {
          if (err) throw err;
          firstPrompt();
        };
      console.log("role added succesfully!");
      firstPrompt();
    });
}

// fix this
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
        type: "list",
        message: `what is this employee's role?`,
        name: "roles",
        choices: pickRoles(),
      },
      {
        type: "list",
        message: `who is the employee's manager?`,
        name: "empManager",
        choices: pickMan() 
      }
    ])
    .then((answers) => {
      db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES  ('${answers.firstName}','${answers.lastName}','${allroles.indexOf(answers.roles) + 1}','${managerlist.indexOf(answers.empManager)}');`),
        function (err) {
          if (err) throw err
          firstPrompt()
        };
      console.log("employee added succesfully!")
      firstPrompt()
    });
}

// functions that view all departments, roles, and employees
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
  db.query(
    `SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.title, roles.department_id, roles.salary FROM employees JOIN roles ON employees.role_id = roles.id`,
    function (err, res) {
      if (err) throw err;
      console.table(res);
      firstPrompt();
    }
  );
}

function updateEmp() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee you would like to update?",
        name: "emp_name",
        choices: pickEmps(),
      },
      {
        type: "list",
        message: "What role would you like to give them?",
        name: "emp_role",
        choices: pickRoles(),
      },
    ])
    .then((answers) => {
      db.query(
        `UPDATE employees SET role_id = ${
          allroles.indexOf(answers.emp_role) + 1
        } WHERE employees.id = ${allemps.indexOf(answers.emp_name) + 1}`
      ),
        function (err) {
          if (err) throw err;
          console.log(err);
          firstPrompt();
        };
      console.log("Employee Role Changed Successfully");
      firstPrompt();
    });
}
