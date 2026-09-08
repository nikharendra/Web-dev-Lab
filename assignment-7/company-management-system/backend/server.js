const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const PORT = 5000;


// =========================
// Middleware
// =========================

app.use(cors());

app.use(express.json());


// =========================
// Serve Frontend
// =========================

app.use(express.static(path.join(__dirname, "../frontend")));


// =========================
// Database connection
// =========================

require("./config/db");


// =========================
// Routes
// =========================

const authRoutes = require("./routes/authRoutes");
const detailsRoutes = require("./routes/detailsRoutes");

app.use("/api/details", detailsRoutes);
app.use("/api/auth", authRoutes);


// =========================
// Home Route
// =========================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});


// =========================
// Start Server
// =========================

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});