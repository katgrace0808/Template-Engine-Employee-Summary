const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const writeFileAsync = util.promisify(fs.writeFile);

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employeesArr = []

function managerQuestions() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'nameManager',
                message: "Manager's first and last name:"
            },
            {
                type: 'input',
                name: 'emailManager',
                message: "Manager's email:"
            },
            {
                type: 'input',
                name: 'idManager',
                message: "Manager's employee id:",
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: "Manager's phone number:",
            }
        ])
        .then(function (response) {
            let managerName = response.nameManager;
            let managerEmail = response.emailManager;
            let managerId = response.idManager;
            let managerOfficeNumber = response.officeNumber;
            let manager = new Manager(managerName, managerEmail, managerId, managerOfficeNumber);
            employeesArr.push(manager);
            employeeQuestions();
        });
}

function employeeQuestions() {
    inquirer
        .prompt(
            [
                {
                    type: 'list',
                    name: 'roleEmployee',
                    message: "Team member's role:",
                    choices: [
                        'Engineer',
                        'Intern'
                    ]
                },
                {
                    type: 'input',
                    name: 'nameEmployee',
                    message: "Employee's first and last name:"
                },
                {
                    type: 'input',
                    name: 'emailEmployee',
                    message: "Employee's email:"
                },
                {
                    type: 'input',
                    name: 'idEmployee',
                    message: "Employee's employee id:"
                },
                {
                    type: 'input',
                    name: 'githubEngineer',
                    message: "Engineer's Github username:",
                    when: (answers) => answers.roleEmployee === 'Engineer'
                },
                {
                    type: 'input',
                    name: 'schoolIntern',
                    message: "School Intern is attending:",
                    when: (answers) => answers.roleEmployee === 'Intern'
                },
                {
                    type: 'list',
                    name: 'again',
                    message: 'Enter another employee?',
                    choices: ['Yes', 'No']
                }
            ])
        .then(function (response) {
            let employeeRole = response.roleEmployee;
            let employeeName = response.nameEmployee;
            let employeeEmail = response.emailEmployee;
            let employeeId = response.idEmployee;
            let engineerGithub = response.githubEngineer;
            let internSchool = response.schoolIntern;

            if (employeeRole === "Engineer") {
                let engineer = new Engineer(employeeName, employeeEmail, employeeId, engineerGithub);
                employeesArr.push(engineer);
                if (response.again === 'Yes') {
                    employeeQuestions();
                } else {
                    renderHtml();
                    console.log("Done entering employees");
                    console.log(employeesArr);
                }
            } else if (employeeRole === "Intern") {
                let intern = new Intern(employeeName, employeeEmail, employeeId, internSchool);
                employeesArr.push(intern);
                if (response.again === "Yes") {
                    employeeQuestions();
                } else {
                    renderHtml();
                    console.log("Done entering employees");
                    console.log(employeesArr);
                }
            };
        });
};

managerQuestions();

function renderHtml() {
    let html = render(employeesArr);
    return writeFileAsync(outputPath, html);
}


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
