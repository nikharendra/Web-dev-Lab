const db = require("../config/db");

const getAdminDetails = async (req, res) => {
    try {
        const [admins] = await db.promise().query(
            `SELECT id, name, email, role, department, created_at
             FROM users
             WHERE role = 'admin'`
        );

        res.json({
            message: "Admin details retrieved successfully",
            admins: admins
        });

    } catch (error) {
        console.error("Error fetching admin details:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const getEmployeeDetails = async (req, res) => {
    try {
        const [employees] = await db.promise().query(
            `SELECT id, name, email, role, department, created_at
             FROM users
             WHERE role = 'employee'`
        );

        res.json({
            message: "Employee details retrieved successfully",
            employees: employees
        });

    } catch (error) {
        console.error("Error fetching employee details:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getAdminDetails,
    getEmployeeDetails
};