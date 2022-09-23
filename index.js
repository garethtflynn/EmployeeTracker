const inquirer = require('inquirer')
const mysql = require('mysql2')
const consTable = require('console.table')

const db  = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password:'root',
        database:'employees_db'
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
    }
}

function viewDeps () {

}

function viewRoles () {

}

function viewEmps () {

}

function addDep () {
    inquirer.prompt ([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'department'
        }
    ])

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
            type: 'input',
            message: 'what department is this role in?',
            name: 'depRole'
        },

    ])


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
            message: `who is the employee's manager?`,
            name: 'empManager'
        },
    ])    

}

function updateEmp () {

}
