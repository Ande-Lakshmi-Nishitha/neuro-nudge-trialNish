import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------------
// MIDDLEWARE
// --------------------------
app.use(cors());
app.use(express.json()); // IMPORTANT — parses req.body

// --------------------------
// DATABASE
// --------------------------
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("Mongo Error:", err));

// --------------------------
// ROUTES
// --------------------------
app.use("/api/auth", authRoutes);

// Test route to verify server is actually receiving requests
app.get("/test", (req, res) => {
    console.log("Test route hit");
    res.send("Server working");
});

// --------------------------
// SERVE REACT BUILD (OPTIONAL)
// --------------------------
const clientBuildPath = path.join(__dirname, "../client/build");

app.use(express.static(clientBuildPath));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
});

// --------------------------
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
