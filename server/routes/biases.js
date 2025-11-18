import express from "express";
import Bias from "../models/Bias.js";

const router = express.Router();

// GET all biases
router.get("/", async (req, res) => {
  try {
    const biases = await Bias.find();
    res.json(biases);
  } catch (err) {
    console.error("Error fetching biases:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
