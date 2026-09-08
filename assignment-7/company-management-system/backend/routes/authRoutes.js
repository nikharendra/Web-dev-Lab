const express = require("express");

const router = express.Router();

const {
    registerEmployee,
    loginUser
} = require("../controllers/authController");

router.post("/register", registerEmployee);

router.post("/login", loginUser);

module.exports = router;