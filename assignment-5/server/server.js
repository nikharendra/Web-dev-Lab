const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Rakhi#84#tiwari",
    database: "employee_db"
});

db.connect((err) => {
    if (err) {
        console.error("MySQL connection failed:", err);
        return;
    }

    console.log("MySQL connected successfully!");
});

app.post("/api/employees", (req, res) => {

    const {
        name,
        employeeId,
        email,
        phone,
        department,
        designation,
        salary,
        joiningDate
    } = req.body;

    console.log("Employee received:");
    console.log(req.body);

    const sql = `
        INSERT INTO employee
        (name, employee_id, email, phone, department, designation, salary, joining_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        name,
        employeeId,
        email,
        phone,
        department,
        designation,
        salary,
        joiningDate
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            console.error("Database error:", err);

            return res.status(500).json({
                message: "Failed to save employee",
                error: err.message
            });
        }

        console.log("Employee saved successfully!");

        res.status(201).json({
            message: "Employee saved successfully",
            employee: {
                id: result.insertId,
                name,
                employeeId,
                email,
                phone,
                department,
                designation,
                salary,
                joiningDate
            }
        });
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});