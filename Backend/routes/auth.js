
const express = require("express");
const pool = require("../db");

const router = express.Router();

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Validate the request
    console.log(username);
    console.log(password);
    if (
        typeof username !== "string" ||
        typeof password !== "string" ||
        !username.trim() ||
        !password
    ) {
        return res.status(400).json({
            message: "Email and password are required."
        });
    }

    try {
        // Find the user by email
        const result = await pool.query(
            `SELECT id, username, password
             FROM users
             WHERE username = $1`,
            [username.trim().toLowerCase()]
        );

        const user = result.rows[0];
        console.log(user);

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        // Save the authenticated user in the session
        req.session.userId = user.id;

        // Return safe user information to React
        return res.status(200).json({
            message: "Sign-in successful.",
            user: {
                id: user.id,
                email: user.username
            }
        });
    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "An internal server error occurred."
        });
    }
});

router.post("/signup", async (req, res) => {
    const { username, password, email } = req.body;

    // Validate the request
    console.log(username);
    console.log(password);
    if (
        typeof username !== "string" ||
        typeof password !== "string" ||
        typeof email !== "string" ||
        !username.trim() ||
        !password ||
        !email
    ) {
        return res.status(400).json({
            message: "Email and password are required."
        });
    }

    try {
        // Find the user by email
        const result = await pool.query(
            `Insert INTO users (username, password, email)
            VALUES($1, $2, $3)
            RETURNING id, username, email`,
            [username, password, email]
        );

        const user = result.rows[0];
        console.log(user);

        res.status(201).json({
            message: "User created successfully",
            user: result.rows[0],
         });

        // Save the authenticated user in the session
        req.session.userId = user.id;
    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "An internal server error occurred."
        });
    }
});

module.exports = router;
