DROP DATABASE IF EXISTS workers;


CREATE database workers;

USE workers;

CREATE TABLE department (
	id int auto_increment,
    name varchar(30) UNIQUE NOT NULL,
    primary key(id)UNIQUE NOT NULL
);

CREATE TABLE role (
	id int auto_increment,
    title varchar(30) UNIQUE NOT NULL,
    salary decimal UNIQUE NOT NULL,
    department_id int,
    primary key(id),
    foreign key(department_id) 
        references departments(id)
);

CREATE TABLE workersauto_increment,
    id int auto_increment
    first_name varchar(30),
    last_name varchar(30),
    roles_id int,
    index role_ind (role_id)
    manager_id int,
    primary key(id),
    foreign key(roles_id)    
        references roles(id),
    foreign key(manager_id) 
        references workers