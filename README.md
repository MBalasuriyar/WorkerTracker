# Unit 12 MySQL Homework: worker Tracker

Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as **C**ontent **M**anagement **S**ystems. This app is an attempt to make a solution for managing a company's workers using node, inquirer, and MySQL.


The database schema contain three tables:


* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **worker**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold worker first name
  * **last_name** - VARCHAR(30) to hold worker last name
  * **role_id** - INT to hold reference to role worker has
  * **manager_id** - INT to hold reference to another worker that manages the worker being Created. 
  
This command-line application allows the user to:

  * Add departments, roles, workers

  * View departments, roles, workers

  * Update worker roles


```
As a business owner
I want to be able to view and manage the departments, roles, and workers in my company
So that I can organize and plan my business
```

Submitted the following:

* The URL of the GitHub repository

* A video demonstrating the entirety of the app's functionality 

- - -
© 2021 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.
