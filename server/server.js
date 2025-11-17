import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ------------------------------
// API ROUTES
// ------------------------------

app.get("/api/nudges", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Confirmation Bias",
      description:
        "A nudge that encourages users to explore information that challenges their existing beliefs.",
    },
    {
      id: 2,
      title: "Loss Aversion",
      description:
        "A nudge that emphasizes what might be lost instead of what might be gained.",
    },
  ]);
});

// ------------------------------
// FRONTEND BUILD
// ------------------------------
const buildPath = path.join(__dirname, "../client/build");
app.use(express.static(buildPath));

// Serve React app for all unknown routes
app.get((req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// ------------------------------
// START SERVER
// ------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
