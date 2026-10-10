const express = require("express");
const session = require("express-session");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use("/api/auth", authRoutes);

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD exists:', typeof process.env.DB_PASSWORD === 'string');
console.log('DB_PASSWORD length:', process.env.DB_PASSWORD?.length);

app.get('/users', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows); // result.rows contains the array of records
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/users', async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const newUser = await db.query(
      'INSERT INTO users (username,password, email) VALUES (\$1, \$2, \$3) RETURNING *',
      [name, email]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

