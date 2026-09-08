const express = require("express");

const cors = require("cors");

require("dotenv").config();


// Import database

require("./config/db");


// Import routes

const authRoutes =
    require("./routes/authRoutes");

const departmentRoutes =
    require("./routes/departmentRoutes");


const app = express();


// Middleware

app.use(cors());

app.use(express.json());


// Routes

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/departments",
    departmentRoutes
);


// Test route

app.get("/", (req, res) => {

    res.json({
        message:
            "Department Management API is running"
    });

});


// Start server

const PORT =
    process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});