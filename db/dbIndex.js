const connection = require("./connection");

//dont think im using most of these

class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;
  }

  // Find all workers, join with roles and departments to display their roles, salaries, departments, and managers
  findAllWorkers() {
    return this.connection.query(
      "SELECT worker.id, worker.first_name, worker.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM worker LEFT JOIN role on worker.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN worker manager on manager.id = worker.manager_id;"
    );
  }

  // Find all workers except the given worker id
  findAllPossibleManagers(workerId) {
    return this.connection.query(
      "SELECT id, first_name, last_name FROM worker WHERE id != ?",
      workerId
    );
  }

  // Create a new worker
  createWorker(worker) {
    return this.connection.query("INSERT INTO worker SET ?", worker);
  }

  // Remove an worker with the given id
  removeWorker(workerId) {
    return this.connection.query(
      "DELETE FROM worker WHERE id = ?",
      workerId
    );
  }

  // Update the given worker's role
  updateWorkerRole(workerId, roleId) {
    return this.connection.query(
      "UPDATE worker SET role_id = ? WHERE id = ?",
      [roleId, workerId]
    );
  }

  // Update the given worker's manager
  updateWorkerManager(workerId, managerId) {
    return this.connection.query(
      "UPDATE worker SET manager_id = ? WHERE id = ?",
      [managerId, workerId]
    );
  }

  // Find all roles, join with departments to display the department name
  findAllRoles() {
    return this.connection.query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    );
  }

  // Create a new role
  createRole(role) {
    return this.connection.query("INSERT INTO role SET ?", role);
  }

  // Find all departments, join with workers and roles and sum up utilized department budget
  findAllDepartments() {
    return this.connection.query(
      "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM department LEFT JOIN role ON role.department_id = department.id LEFT JOIN worker ON worker.role_id = role.id GROUP BY department.id, department.name"
    );
  }

  // Create a new department
  createDepartment(department) {
    return this.connection.query("INSERT INTO department SET ?", department);
  }


  // Find all workers in a given department, join with roles to display role titles
  findAllworkersByDepartment(departmentId) {
    return this.connection.query(
      "SELECT worker.id, worker.first_name, worker.last_name, role.title FROM worker LEFT JOIN role on worker.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
      departmentId
    );
  }

  // Find all workers by manager, join with departments and roles to display titles and department names
  findAllworkersByManager(managerId) {
    return this.connection.query(
      "SELECT worker.id, worker.first_name, worker.last_name, department.name AS department, role.title FROM worker LEFT JOIN role on role.id = worker.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
      managerId
    );
  }
}

module.exports = new DB(connection);
