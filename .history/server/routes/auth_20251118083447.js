import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import biasRoutes from "./routes/biases.js";

const router = express.Router();

// ------------------------------------
// SIGNUP ROUTE
// ------------------------------------
router.post("/signup", async (req, res) => {
    try {
        console.log("📩 Signup request:", req.body);

        const { name, email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Signup successful",
            user: { id: user._id, name: user.name, email: user.email },
            token,
        });

    } catch (err) {
        console.error("❌ SIGNUP ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// ------------------------------------
// LOGIN ROUTE
// ------------------------------------
router.post("/login", async (req, res) => {
    try {
        console.log("🔐 Login request:", req.body);

        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email },
            token,
        });

    } catch (err) {
        console.error("❌ LOGIN ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
