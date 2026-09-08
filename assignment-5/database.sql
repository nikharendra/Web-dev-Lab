CREATE DATABASE employee_db;
USE employee_db;
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    employee_id VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15),
    department VARCHAR(100),
    designation VARCHAR(100),
    salary DECIMAL(10,2),
    joining_date DATE
);

INSERT INTO employee
(name, employee_id, email, phone, department, designation, salary, joining_date)
VALUES
('Harendra Singh Yadav', 'EMP001', 'harendra@gmail.com',
 '9876543210', 'IT', 'Software Developer', 50000.00, '2026-08-11');
 
 SELECT * FROM employee;