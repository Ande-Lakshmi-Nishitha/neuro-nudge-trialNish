// server/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./db.js";
import Bias from "./models/Bias.js";

dotenv.config();
connectDB();

const biases = [
  {
    name: "Confirmation Bias",
    category: "Cognitive",
    description:
      "The tendency to favor information that confirms existing beliefs while ignoring contradictory evidence.",
    examples: ["Reading news that supports your opinion while dismissing opposing viewpoints."],
    nudges: ["Actively seek sources that challenge your assumptions."]
  },
  {
    name: "Anchoring Bias",
    category: "Cognitive",
    description:
      "Relying too heavily on the first piece of information encountered when making decisions.",
    examples: ["Letting the initial price of a product influence your perception of its value."],
    nudges: ["Compare multiple references before finalizing a decision."]
  },
  {
    name: "Loss Aversion",
    category: "Behavioral",
    description:
      "The tendency to prefer avoiding losses rather than acquiring equivalent gains.",
    examples: ["Refusing to sell a losing investment hoping it will bounce back."],
    nudges: ["Focus on long-term outcomes rather than short-term losses."]
  },
  {
    name: "Availability Heuristic",
    category: "Cognitive",
    description:
      "Overestimating the importance of information that comes to mind easily.",
    examples: ["Believing air travel is dangerous after hearing about a plane crash on the news."],
    nudges: ["Review actual data instead of relying on vivid memories."]
  },
  {
    name: "Halo Effect",
    category: "Social",
    description:
      "Letting one positive trait influence your overall perception of someone or something.",
    examples: ["Assuming someone who looks attractive is also intelligent or kind."],
    nudges: ["Evaluate people and ideas based on multiple factors."]
  },
  {
    name: "Self-Serving Bias",
    category: "Emotional",
    description:
      "Attributing successes to personal factors but blaming failures on external ones.",
    examples: ["Saying you aced an exam because you're smart, but failed another because the teacher was unfair."],
    nudges: ["Reflect honestly on both your strengths and weaknesses."]
  },
  {
    name: "Sunk Cost Fallacy",
    category: "Behavioral",
    description:
      "Continuing a behavior or project due to previously invested resources, even when it no longer makes sense.",
    examples: ["Staying in a bad relationship because you’ve already invested years."],
    nudges: ["Focus on future benefits, not past investments."]
  },
  {
    name: "Bandwagon Effect",
    category: "Social",
    description:
      "Adopting beliefs or behaviors simply because many others do.",
    examples: ["Buying a product because it's trending on social media."],
    nudges: ["Base decisions on facts, not popularity."]
  },
  {
    name: "Recency Bias",
    category: "Cognitive",
    description:
      "Giving greater importance to the most recent information or experiences.",
    examples: ["Judging an employee’s performance based on their last week instead of the whole quarter."],
    nudges: ["Review long-term patterns before concluding."]
  },
  {
    name: "Overconfidence Bias",
    category: "Cognitive",
    description:
      "Overestimating one’s own abilities or accuracy of knowledge.",
    examples: ["Believing you can multitask effectively without errors."],
    nudges: ["Seek feedback and verify before making big decisions."]
  },
  {
    name: "Negativity Bias",
    category: "Emotional",
    description:
      "Paying more attention to negative experiences than positive ones.",
    examples: ["Remembering one criticism more than ten compliments."],
    nudges: ["Deliberately focus on positive experiences and gratitude."]
  },
  {
    name: "Status Quo Bias",
    category: "Behavioral",
    description:
      "Preferring things to stay the same rather than change.",
    examples: ["Keeping an old subscription even though you never use it."],
    nudges: ["Experiment with small changes before rejecting new options."]
  }
];

const importData = async () => {
  try {
    await Bias.deleteMany();
    await Bias.insertMany(biases);
    console.log("✅ 12 biases successfully added to MongoDB!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

importData();
