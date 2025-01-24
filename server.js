import "dotenv/config";
// import {env} from "node:process"
import express from "express";

import cron from "node-cron";
import leetRoute from "./leetcode/leetcode.js";
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(JSON.stringify({ res: "Success" }));
});
app.use("/leet", leetRoute);
app.listen(port, () => console.log(`listening on port ${port}`));
// cron.schedule("1 * * * * *", () => {
//   console.log("running");
// });
