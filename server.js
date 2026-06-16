const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = new sqlite3.Database("quotes.db");

db.run(`
CREATE TABLE IF NOT EXISTS quotes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quote TEXT
)
`);
app.post("/save", (req, res) => {
    const { quote } = req.body;

    db.run(
        "INSERT INTO quotes (quote) VALUES (?)",
        [quote],
        (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({ message: "Quote saved" });
        }
    );
});
app.get("/history", (req, res) => {
    db.all(
        "SELECT * FROM quotes ORDER BY id DESC",
        [],
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(rows);
        }
    );
});
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
