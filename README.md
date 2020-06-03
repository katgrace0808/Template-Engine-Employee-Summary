# Unit 10 OOP Homework: Template Engine - Employee Summary (https://github.com/katgrace0808/Template-Engine-Employee-Summary/settings)

A command line application that gathers information on a manager and their team of engineers and interns.

![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)
[![Generic badge](https://img.shields.io/badge/node.js-100%-green.svg)](https://shields.io/)

## Description

This command line application worked from the user story:

```
As a manager
I want to generate a webpage that displays my team's basic info
so that I have quick access to emails and GitHub profiles
```
When the application is ran from the CLI, the user is prompted with questions related to the manager.  The questions gather the manager's name, id, email, and office phone number.  Then, the user is prompted to select the next employee to enter, and must select a role of either Engineer or Intern.  The Engineer questions prompt the user to enter their name, id, email and Github username.  The Intern questions consist of name, id, email, and school attending.

After the infromation for an Engineer or Intern are added, the user is prompted with a question asking if more employees need to be added.  If more employees need to be added, the user selects Yes.  After all employees are entered, the user selects No, and the application creates the html page.  This page displays all entered employees with the gathered information.

## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [Credits](#credits)
  * [License](#license)
  * [Contributing](#contributing)
  * [Test](#tests)
  * [Questions](#questions)
  * [Author](#author)


## Installation

User will need to install the necessary modules for the application to run successfully.  This is accomplished by entering "npm i".  When the modules have completely loaded, the user can then run the application by entering "node app.js".

## Usage

The generated webpage is usable for a manager to easily see select information on their employees.  The page includes links to email and Github user pages. 

## License

None

## Contributing

Kathryn Teall

## Test

Jest is used to validate the data.  The test can be run at the CLI by entering "NPM run test".

## Questions

None at this time.

## Author

Kathryn Teall

