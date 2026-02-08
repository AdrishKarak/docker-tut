const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");

dotenv.config();
colors.enable();

const Anim = require("./database/anim.model");
const connect = require("./database/connect");

const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(cors({ origin: "*" }));
app.use(express.json());

/* -------------------- ROUTES -------------------- */

// Health check
app.get("/", (req, res) => {
    console.log("Hello World!".rainbow);
    res.send("Hello World!");
});

// Get all anime
app.get("/api/anime", async (req, res) => {
    try {
        const anime = await Anim.find();
        res.json(anime);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch anime" });
    }
});

// Add anime
app.post("/api/anime", async (req, res) => {
    try {
        const anime = new Anim(req.body);
        await anime.save();
        res.status(201).json(anime);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save anime" });
    }
});

/* -------------------- SERVER START -------------------- -*/

async function startServer() {
    // Start DB connection (it retries internally)
    connect();

    // Start server immediately — DB will attach when ready
    app.listen(8000, () => {
        console.log("🚀 Server running on port 8000".green);
    });
}

startServer();
