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

    // Log the input to the console
    console.log("Manager Details:", teamMembers);

      // Prompt for additional team members
      promptTeamMembers();
  });
};

// Function to prompt for additional team members
const promptTeamMembers = () => {
  inquirer.prompt([
    {
      type: "list",
      name: "role",
      message: "Choose the role of the team member to add:",
      choices: ["Engineer", "Intern", "Finish Building Team"],
    },
  ])
  .then((answers) => {
    // Log the answers to the console
    console.log("Answers for Team Member Role:", answers);

    // Determine the next action based on the team member's role
    answers.role === "Engineer"
    ? promptEngineer()          // If the role is Engineer, prompt for Engineer details
    : answers.role === "Intern" // If false, check if role is Intern
    ? promptIntern()            // If the role is Intern, prompt for Intern details
    : generateHTML();           // Else, finish building the team and generate HTML

  });
};

// Function to prompt for engineer details
const promptEngineer = () => {
    inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the engineer's name:",
      },
      {
        type: "input",
        name: "id",
        message: "Enter the engineer's employee ID:",
      },
      {
        type: "input",
        name: "email",
        message: "Enter the engineer's email address:",
      },
      {
        type: "input",
        name: "github",
        message: "Enter the engineer's GitHub username:",
      },
    ])
    .then((answers) => {
      // Create a new Engineer object with the provided answers
      const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);

      // Add the engineer to the teamMembers array
      teamMembers.push(engineer);

      // Log the input to the console
      console.log("Engineer Details:", teamMembers);
  
      // Call promptTeamMembers again to ask if more team members need to be added
      promptTeamMembers();
    });
  };

  // Function to prompt for intern details
const promptIntern = () => {
    inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the intern's name:",
      },
      {
        type: "input",
        name: "id",
        message: "Enter the intern's employee ID:",
      },
      {
        type: "input",
        name: "email",
        message: "Enter the intern's email address:",
      },
      {
        type: "input",
        name: "school",
        message: "Enter the intern's school:",
      },
    ])
    .then((answers) => {
      // Create a new Intern object with the provided answers
      const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
  
      // Add the intern to the teamMembers array
      teamMembers.push(intern);
      console.log("Intern's Details:", teamMembers);
  
      // Call promptTeamMembers again to ask if more team members need to be added
      promptTeamMembers();
    });
  };

  // Function to generate HTML
const generateHTML = () => {
    // Use the render function to generate HTML using the teamMembers array
    const renderedHTML = render(teamMembers);
  
    // Write the generated HTML to the specified output path
    fs.writeFileSync(outputPath, renderedHTML);
    console.log(`Team Profile Generator Complete! HTML file generated at ${outputPath}`);
  };

// Initial call to start prompting for manager details
promptManager();