const express = require("express");

const db = require("../config/db");

const authMiddleware =
    require("../middleware/authMiddleware");


const router = express.Router();


// =================================
// GET ALL DEPARTMENTS
// =================================

router.get(
    "/",
    authMiddleware,
    async (req, res) => {

        try {

            const [departments] =
                await db.promise().query(
                    "SELECT * FROM departments ORDER BY id DESC"
                );


            res.json(departments);


        } catch (error) {

            console.error(error);

            res.status(500).json({

                message:
                    "Failed to fetch departments"

            });

        }

    }
);


// =================================
// CREATE DEPARTMENT
// =================================

router.post(
    "/",
    authMiddleware,
    async (req, res) => {

        try {

            const {
                name,
                description,
                head
            } = req.body;


            if (!name) {

                return res.status(400).json({

                    message:
                        "Department name is required"

                });

            }


            const [result] =
                await db.promise().query(

                    `INSERT INTO departments
                     (name, description, head)
                     VALUES (?, ?, ?)`,

                    [
                        name,
                        description || "",
                        head || ""
                    ]

                );


            res.status(201).json({

                message:
                    "Department created successfully",

                id: result.insertId

            });


        } catch (error) {

            console.error(error);

            res.status(500).json({

                message:
                    "Failed to create department"

            });

        }

    }
);


// =================================
// UPDATE DEPARTMENT
// =================================

router.put(
    "/:id",
    authMiddleware,
    async (req, res) => {

        try {

            const {
                name,
                description,
                head
            } = req.body;


            const { id } =
                req.params;


            await db.promise().query(

                `UPDATE departments
                 SET name = ?,
                     description = ?,
                     head = ?
                 WHERE id = ?`,

                [
                    name,
                    description,
                    head,
                    id
                ]

            );


            res.json({

                message:
                    "Department updated successfully"

            });


        } catch (error) {

            console.error(error);

            res.status(500).json({

                message:
                    "Failed to update department"

            });

        }

    }
);


// =================================
// DELETE DEPARTMENT
// =================================

router.delete(
    "/:id",
    authMiddleware,
    async (req, res) => {

        try {

            const { id } =
                req.params;


            await db.promise().query(

                "DELETE FROM departments WHERE id = ?",

                [id]

            );


            res.json({

                message:
                    "Department deleted successfully"

            });


        } catch (error) {

            console.error(error);

            res.status(500).json({

                message:
                    "Failed to delete department"

            });

        }

    }
);


module.exports = router;