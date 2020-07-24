const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");



const render = require("./lib/htmlRenderer");
const team = [];


function initalize() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: `Who is the team manager?`
        },
        {
            type: "input",
            name: "id",
            message: `What is their ID number?`
        },
        {
            type: "input",
            name: "email",
            message: `What is the email of the project manager?`
        },
        {
            type: "input",
            name: "officeNumber",
            message: `The managers office number is what again?`
        }
    ])
}
function buildTeam() {
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What type of team member would you like to add?",
            choices: ["Engineer", "Intern", "I don't want to add any more team members"]
        }
    ]).then((answer) => {
        if (answer.role === "Engineer") {
            return inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: `What is your engineer's name?`
                },
                {
                    type: "input",
                    name: "id",
                    message: `What is your engineer's ID?`
                },
                {
                    type: "input",
                    name: "email",
                    message: `What is your engineer's email?`
                },
                {
                    type: "input",
                    name: "github",
                    message: `What is your engineer's GitHub??`
                }
            ]).then((answers) => {
                let engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
                team.push(engineer);

                buildTeam();
            })
        }
        if (answer.role === "Intern") {
            return inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: `What is your intern's name?`
                },
                {
                    type: "input",
                    name: "id",
                    message: `What is your intern's ID?`
                },
                {
                    type: "input",
                    name: "email",
                    message: `What is your intern's email?`
                },
                {
                    type: "input",
                    name: "school",
                    message: `What is your intern's school?`
                }
            ]).then((answers) => {
                let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
                team.push(intern)
                buildTeam();
            })
        }

        return putSquadInHTML(team);
    });

    function putSquadInHTML(team) {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(team), "utf-8");
        console.log("Here is your squad");
    }
}


initalize()
    .then((answers) => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        team.push(manager)
        buildTeam();
    });




