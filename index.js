const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// Array to store team members
const teamMembers = [];

// Function to prompt for manager details
const promptManager = () => {
  // Prompt the user for manager details
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the team manager's name:",
    },
    {
      type: "input",
      name: "id",
      message: "Enter the team manager's employee ID:",
    },
    {
      type: "input",
      name: "email",
      message: "Enter the team manager's email address:",
    },
    {
      type: "input",
      name: "officeNumber",
      message: "Enter the team manager's office number:",
    },
  ])
  .then((answers) => {
    // Create a new Manager object with the provided answers
    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    
    // Add the manager to the teamMembers array
    teamMembers.push(manager);

    // Log the input to ensure everything works correctly
    console.log("Manager Details:", teamMembers);
  });
};

// Initial call to start prompting for manager details
promptManager();
