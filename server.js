const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); // Serve static files (HTML, CSS, JS)

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "busstationdatabase",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        return;
    }
    console.log("Connected to MySQL database.");
});

// JWT Secret
const JWT_SECRET = "";

// Signup API
app.post("/api/signup", async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname|| !email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        db.query("SELECT * FROM user_info WHERE email = ?", [email], async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error." });
            }

            if (results.length > 0) {
                return res.status(400).json({ error: "Email is already registered." });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            db.query(
                "INSERT INTO user_info (firstname, lastname, email, password) VALUES (?, ?, ?,?)",
                [firstname, lastname, email, hashedPassword],
                (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: "Failed to register user." });
                    }
                    // Redirect to index page after successful signup
                    res.status(201).redirect("/");
                }
            );
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error." });
    }
});

// Login API
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    db.query("SELECT * FROM user_info WHERE email = ?", [email], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }

        if (results.length > 0) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

        // Redirect to index page after successful login
        res.status(200).cookie("token", token, { httpOnly: true }).redirect("/");
    });
});

// Middleware to Authenticate Users via JWT
const authenticate = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token." });
    }
};
