import express from "express";
import Performance from "../models/performance.js";

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const performance = await Performance.find({});
    console.log(performance);
    return res.json({ performance }).status(200);
  } catch (error) {
    console.log(error);
    return res.json({ status: "There was a problem." }).status(500);
  }
});

export default router;
