CREATE DATABASE company_db;
USE company_db;

SHOW DATABASES;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'employee') NOT NULL,
    department VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users
(name, email, password, role, department)
VALUES
(
    'Company Admin',
    'admin@company.com',
    '$2b$10$5szaTDXXnJwdic.zWcrzZut5AKaPXnpBoHtP358oWRYhpbRPxp2yy',
    'admin',
    'Management'
);


SELECT id, name, email, role, department
FROM users;

DESCRIBE users;


DELETE FROM users
WHERE id = 1
AND role = 'employee';