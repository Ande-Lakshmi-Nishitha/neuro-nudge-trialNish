// server/models/Bias.js
import mongoose from "mongoose";

const biasSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    examples: [{ type: String }],
    nudges: [{ type: String }],
  },
  { timestamps: true }
);

const Bias = mongoose.model("Bias", biasSchema);
export default Bias;
