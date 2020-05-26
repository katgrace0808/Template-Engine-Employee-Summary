const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const collectEmployees = async (employees = []) => {

    const questions = [
        {
            type: 'input',
            name: 'name',
            message: "Team member's first and last name:"
        },
        {
            type: 'input',
            name: 'email',
            message: "Team member's email:"
        },
        {
            type: 'input',
            name: 'id',
            message: "Team member's employee id:"
        },
        {
            type: 'list',
            name: 'role',
            message: "Team member's role:",
            choices: [
                'Manager',
                'Engineer',
                'Intern'
            ]
        },
        {
            type: 'input',
            name: 'number',
            message: "Manager's phone number:",
            when: (answers) => answers.role === 'Manager'
        },
        {
            type: 'input',
            name: 'github',
            message: "Engineer's Github username:",
            when: (answers) => answers.role === 'Engineer'
        },
        {
            type: 'input',
            name: 'school',
            message: "School Intern is attending:",
            when: (answers) => answers.role === 'Intern'
        },
        {
            type: 'confirm',
            name: 'again',
            message: 'Enter another team member?',
            default: false
        }
    ];

    const { again, ...answers } = await inquirer.prompt(questions);
    const newEmployees = [...employees, answers];
    return again ? collectEmployees(newEmployees) : newEmployees;
};

const init = async () => {
    const employees = await collectEmployees();
    console.log(employees);
    var fileName = 'htmlRenderer.js';
    let renderHtml = render(employees);
    writeToFile(fileName, renderHtml);
    console.log("Done!");

};

init();

function writeToFile(fileName, answers) {
    fs.writeFile(fileName, answers, "utf8", function (err) {
        if (err) throw err;
    });
    console.log("Render file is written.");
};




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
