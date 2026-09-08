const express = require("express");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const {
    getAdminDetails,
    getEmployeeDetails
} = require("../controllers/detailsController");

const router = express.Router();

router.get(
    "/admin",
    authenticateToken,
    authorizeRole("employee"),
    getAdminDetails
);

router.get(
    "/employees",
    authenticateToken,
    authorizeRole("admin"),
    getEmployeeDetails
);

module.exports = router;