// server/routes/biasRoutes.js
import express from "express";
import Bias from "../models/Bias.js";
const router = express.Router();

// GET /api/biases - list all biases
router.get("/", async (req, res) => {
  try {
    const biases = await Bias.find().sort({ name: 1 });
    res.json(biases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching biases" });
  }
});

// GET /api/biases/:id - get one bias by _id
router.get("/:id", async (req, res) => {
  try {
    const bias = await Bias.findById(req.params.id);
    if (!bias) return res.status(404).json({ message: "Bias not found" });
    res.json(bias);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching bias" });
  }
});

// POST /api/biases - create new bias (optional helper)
router.post("/", async (req, res) => {
  try {
    const newBias = new Bias(req.body);
    await newBias.save();
    res.status(201).json(newBias);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error creating bias", error: err.message });
  }
});

// POST /api/biases/:id/nudges - add a nudge to a bias
// body: { nudge: "Do X" }
router.post("/:id/nudges", async (req, res) => {
  try {
    const { nudge } = req.body;
    if (!nudge || !nudge.trim()) {
      return res.status(400).json({ message: "Nudge text required" });
    }

    const bias = await Bias.findById(req.params.id);
    if (!bias) return res.status(404).json({ message: "Bias not found" });

    bias.nudges = bias.nudges || [];
    bias.nudges.push(nudge.trim());
    await bias.save();

    res.json(bias);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error adding nudge" });
  }
});

export default router;
