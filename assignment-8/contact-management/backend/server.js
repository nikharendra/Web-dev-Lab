const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Contact Management API is running");
});

app.get("/api/contacts", async (req, res) => {
    try {
        const [contacts] = await db.query("SELECT * FROM contacts");

        res.json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch contacts"
        });
    }
});

app.post("/api/contacts", async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        const [result] = await db.query(
            "INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)",
            [name, email, phone]
        );

        res.status(201).json({
            message: "Contact added successfully",
            id: result.insertId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to add contact"
        });
    }
});

app.put("/api/contacts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone } = req.body;

        const [result] = await db.query(
            "UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?",
            [name, email, phone, id]
        );

        res.json({
            message: "Contact updated successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update contact"
        });
    }
});

app.delete("/api/contacts/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(
            "DELETE FROM contacts WHERE id = ?",
            [id]
        );

        res.json({
            message: "Contact deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete contact"
        });
    }
});

app.delete("/api/contacts/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(
            "DELETE FROM contacts WHERE id = ?",
            [id]
        );

        res.json({
            message: "Contact deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete contact"
        });
    }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});