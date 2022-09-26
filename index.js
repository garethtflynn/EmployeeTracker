const inquirer = require('inquirer')
const mysql = require('mysql2')
const consTable = require('console.table')

const db  = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password:'root',
        database:'employee_db'
    },
    console.log('Connected to the employees_db database!')
)

db.connect (err => {
    if(err)
        throw err;
        console.log('There was an error connecting to employee_db database!')
    
    firstPrompt ()
})

function firstPrompt () {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'firstPrompt',
            choices: [
                'view all departments',
                'view all roles',
                'view all employees',
                'add a department',
                'add a role',
                'add an employee',
                'update an employee role'
            ]
        }
    ]).then((answers) => {
        if(answers.firstPrompt === 'view all departments') {
            viewDeps()
        }
        if (answers.firstPrompt === 'view all roles'){
            viewRoles ()
        }
        if(answers.firstPrompt === 'view all employees') {
            viewEmps ()
        }
        if (answers.firstPrompt === 'add a department') {
            addDep ()
        }
        if (answers.firstPrompt === 'add a role') {
            addRole ()
        }
        if (answers.firstPrompt === 'add an employee') {
            addEmp ()
        }
        if (answers.firstPrompt === 'update an employee role'){
            updateEmp ()
        }
    })
}

let allDeps = []
function viewDeps () {
    db.query('SELECT * FROM department', function (err, res) {
        if (err) 
            throw err
        for (i = 0; i <= allDeps.length; i++) {
            allDeps.push(res[i].depName)
        }    
    })
    console.table(res)
    firstPrompt ()
};

let allRoles = []
function viewRoles () {
    db.query('SELECT * FROM roles',function (err, res) {
        if (err) 
            throw err
        for (i = 0; i <= allRoles.length; i++) {
            allRoles.push(res[i].title)
        }    
    })
    console.table(res)
    firstPrompt ()
}

let allEmps = []
function viewEmps () {
    db.query('SELECT * FROM employees',function (err, res) {
        if (err) 
            throw err
        for (i = 0; i <= allEmps.length; i++) {
            allEmps.push(res[i].title)
        }    
    })
    console.table(res)
    firstPrompt()
}


function addDep () {
    inquirer.prompt ([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'depAdded'
        }
    ]).then((answers) => {
        db.query(`INSERT INTO department (depName)
        VALUES ('${answers.depAdded}')`)
    })
    console.log('department added succesfully!')
    firstPrompt ()
}


function addRole () {
    inquirer.prompt ([
        {
            type: 'input',
            message: 'what is the name of the role?',
            name: 'roleAdded'
        },
        {
            type: 'input',
            message: 'what is the salary of this role?',
            name: 'salaryAdded'
        },
        {
            type: 'list',
            message: 'what department is this role in?',
            name: 'depRole',
            choices: ''
        },
    ]).then((answers) => {
        db.query(`INSERT INTO role (title, salary, department_id)
        VALUES  ('${answers.roleAdded}'),
                ('${answers.salaryAdded}'),
                ('${allDeps.indexOf(answers.depRole)}');`)
    })
    console.log('role added succesfully!')
    firstPrompt ()
}


function addEmp () {
    inquirer.prompt([
        {
            type: 'input',
            message: `what is the employee's first name?`,
            name: 'firstName'
        },
        {
            type: 'input',
            message: `what is the employee's last name?`,
            name: 'lastName'
        },
        {
            type: 'input',
            message: `what is this employee's role?`,
            name: 'role'
        },
        {
            type: 'list',
            message: `who is the employee's manager?`,
            name: 'empManager',
            choices: 
        }
    ]).then((answers) => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES  ('${answers.firsName}'),
                ('${answers.lastName}'),
                ('${answers.role}'),
                ('${answers.empManager}');`)
    })
    console.log('employee added succesfully!')
    firstPrompt ()
} 

function updateEmp () {
    inquirer.prompt([
        {
            type: 'list',
            message: `Which Employee would you like to update?`,
            name: 'empName',
            choices: viewEmps ()
        },
        {
            type: 'list',
            message: `What role would you like to give them?`,
            name: 'empRole',
            choices: viewRoles ()
        }
    ]).then
}
