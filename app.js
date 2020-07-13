const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = [];

function init() {
    console.log("Welcome to team generator!");
    inquirer.prompt([{
            type: "list",
            message: "What would you like to do?",
            name: "menu",
            choices: ["Create a company portfolio", "Exit"]
        }])
        .then(function ({
            menu
        }) {
            if (menu === "Create a company portfolio") addEmployee()
            else console.log("Goodbye!");
        }).catch((err) => {
            throw err
        })
}

function addEmployee() {
    inquirer.prompt([{
            type: "list",
            message: "Which employee would you like to add?",
            name: "option",
            choices: ["Engineer", "Manager", "Intern"]
        }])
        .then(({
            option
        }) => {
            switch (option) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Manager":
                    addManager();
                    break;
                case "Intern":
                    addIntern();
                    break;
            }

        }).catch((err) => {
            throw err
        })
}

function addManager() {
    inquirer.prompt([{
                type: "input",
                message: "What is the Manager's name?",
                name: "name"
            },
            {
                type: "input",
                message: "What is the Manager's id?",
                name: "id"
            },
            {
                type: "input",
                message: "What is the Manager's email?",
                name: "email"
            },
            {
                type: "input",
                message: "What is the Manager's office number?",
                name: "officeNumber"
            },
            {
                type: "confirm",
                message: "Would you like to add another member?",
                name: "addMember"
            }
        ])
        .then(({ name, id, email, officeNumber, addMember}) => {
            const newManager = new Manager(name, id, email, officeNumber)
            employees.push(newManager)
            
            if (addMember) addEmployee();
            else renderHTML(employees)

        }).catch((err) => {
            throw err
        })
}

function addEngineer() {
    inquirer.prompt([{
                type: "input",
                message: "What is the Engineer's name?",
                name: "name"
            },
            {
                type: "input",
                message: "What is the Engineer's id?",
                name: "id"
            },
            {
                type: "input",
                message: "What is the Engineer's email?",
                name: "email"
            },
            {
                type: "input",
                message: "What is the Engineer's HitHub username?",
                name: "gitHubUsername"
            },
            {
                type: "confirm",
                message: "Would you like to add another member?",
                name: "addMember"
            }
        ])
        .then(({name, id, email, gitHubUsername, addMember}) => {
            const newEngineer = new Engineer(name, id, email, gitHubUsername)
            employees.push(newEngineer)
            if (addMember) addEmployee();
            else renderHTML(employees)

        }).catch((err) => {
            throw err
        })
}

function addIntern() {
    inquirer.prompt([{
                type: "input",
                message: "What is the Inter's name?",
                name: "name"
            },
            {
                type: "input",
                message: "What is the Inter's id?",
                name: "id"
            },
            {
                type: "input",
                message: "What is the Intern's email?",
                name: "email"
            },
            {
                type: "input",
                message: "What school is the Intern's attending?",
                name: "officeNumber"
            },
            {
                type: "confirm",
                message: "Would you like to add another member?",
                name: "addMember"
            }
        ])
        .then(({name, id, email, school, addMember}) => {
            const newIntern = new Intern(name, id, email, school)
            employees.push(newIntern)
            if (addMember) addEmployee();
            else renderHTML(employees)

        }).catch((err) => {
            throw err
        })
}

function renderHTML() {
    const renderedInfo = render(employees)
    fs.writeFile(outputPath, renderedInfo, (err) => {
        if (err) throw err
        console.log("Success!");
    })
}

init();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```