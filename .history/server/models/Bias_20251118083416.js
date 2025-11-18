import mongoose from "mongoose";

const BiasSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }
});

export default mongoose.model("Bias", BiasSchema);
