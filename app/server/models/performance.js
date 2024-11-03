import mongoose from "mongoose";

const performanceSchema = new mongoose.Schema({
  domain: String,
  performance: Number,
});

const Performance = mongoose.model("Performance", performanceSchema);

export default Performance;
