const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db/dbIndex");
require("console.table");

const path = require("path");
const fs = require("fs")
// const fs = require("fs/promises")
// const fs = require("node:fs/promises")

const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');
//const happiness = notfound


// Setup connection string. 
const conn = {
  host: 'localhost',
  port: 3000,
  user: 'killme',
  password: 'help',
  database: 'workers'
};

// Connect and test connection.
const connection = mysql.createConnection(conn);

connection.connect((err) => {
  if(err) throw err;
  console.log(`connected as id ${connection.threadId}\n`); 
})

const tracker = async() => {
    inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'What are you here to do?',
        choices: [
            'View the workers',
            'View the Departments',
            'View the Roles',
            'Add a worker',
            "Add a Department",
            "Add a Role",
            'Delete a worker',
            //deleting a worker sounds like a walmart buisness plan
            'Delete a Department',
            'Delete a Role',
            'Update worker Role',
            'Update worker Manager',
            'Exit',
        ],
        validate: answer => {
          if (answer !== "") {
              return true;
            }
            return "Choose.";
          }
    })
        // Switch so this is not a thousand lines long


        .then((answer) => {
            switch (answer.choice) {
                case 'View the workers':
                    viewWorker();
                    break;
                case 'View the Departments':
                    viewDep();
                    break;
                case 'View the Roles':
                    viewRoles();
                    break;
                case 'Add a worker':
                    addWorker();
                    break;
                case 'Add a Department':
                    addDep();
                    break;
                case 'Add a Role':
                    addRoles();
                    break;
                case 'Update worker Role':
                    updateWorkerRole();
                    break;
                case 'Update worker Manager':
                    updateWorkerMan();
                    break;
                case 'Exit':
                    exiting();
                    break;
            }
        })
}

//What the above do is bellow


function viewWorker() {
    let varWorker = "SELECT * FROM worker JOIN roles ON worker_tracker_DB.worker.id = worker_tracker_DB.roles.id";
    conn.query(varWorker, function (err, WorkerTable) {
        if (err) throw err;
        console.log(WorkerTable.length + "workers Data");
        console.table("workers: ", WorkerTable);
        tracker();
    });
}

function viewDep() {
    let vDep = "SELECT * a department";
    conn.query(vDep, function (err, eDep) {
        if (err) throw err;
        console.log(eDep + "Departments Data");
        console.table("Departments: ", eDep);
        tracker();
    });
}


function viewRoles() {
    let vrol = "SELECT * FROM roles";
    conn.query(vrol, function (err, eRol) {
        if (err) throw err;
        console.log(eRol + "worker Roll Data");
        console.table("Roles: ", eRol);
        tracker();
    });
}


function addWorker() {

    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
      }));
      const managerChoices = workers.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));

    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the worker first name?',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the worker last name?',
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is the worker role?',
                 
            choices: roleChoices
            
        },
        

        {
            type: 'list',
            name: 'manager_id',
            message: 'Who is the worker Manager?',
            choices: managerChoices,
            
          validate: answer => {
            if (answer !== "") {
                return true;
              }
              return "Choose.";
            }
        },
        
    ]) 
    
    

        .then(function (answer) {

            conn.query(
                "INSERT INTO worker SET ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    roles_id: answer.roles_id,
                    manager_id: answer.manager_id,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your worker has been added.");
                    tracker();
                }
            );
        });
};


async function updateWorkerRole() {
    const workers = await db.findAllWorkers();
  
    const workerChoices = workers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { workerId } = await prompt([
      {
        type: "list",
        name: "workerId",
        message: "Which worker's role do you want to update?",
        choices: workerChoices
      }
    ]);
  
    await db.updateWorkerRole(workerId, roleId);

    console.log("Updated worker's role");
  
    tracker();
  }

  async function addRole() {
    const departments = await db.findAllDepartments();
  
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
  
    const role = await prompt([
      {
        name: "title",
        message: "What is the name of the role?"
      },
      {
        name: "salary",
        message: "What is the salary of the role?"
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department does the role belong to?",
        choices: departmentChoices
      }
    ]);
  
    await db.createRole(role);
  
    console.log(`Added ${role.title} to the database`);
  
    tracker();
  }
  
  
async function addDepartment() {
    const department = await prompt([
      {
        name: "name",
        message: "What is the name of the department?"
      }
    ]);
  
    await db.createDepartment(department);
  
    console.log(`Added ${department.name} to the database`);
  
    tracker();
  }


  tracker();
  addWorker();