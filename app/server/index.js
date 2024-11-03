import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import userRouter from "./routes/userRoute.js";
import performanceRouter from "./routes/performanceRoute.js";;
import interviewRouter from './routes/interviewRoute.js';

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;

app.use("/api/user", userRouter);
app.use("/api/interview",interviewRouter);;
app.use("/api/performance", performanceRouter);

app.get("/", async (req, res) => {
  return res.json({ status: "Working" }).status(200);
});
mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => console.log(`Connected to Database`))
  .catch((e) => console.log(e));

app.listen(port, () => console.log(`Server listening at port ${port}`));
// .catch(e=>console.log(`Error: ${e}`));
