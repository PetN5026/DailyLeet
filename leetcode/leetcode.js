import express from "express";
import { DAILY_CODING_CHALLENGE_QUERY } from "./leetcodeQuery.js";
import { MongoClient } from "mongodb";
const router = express.Router();
const LEETCODE_API_ENDPOINT = "https://leetcode.com/graphql";
router.get("/", (req, res) => {
  const now = new Date().toISOString();

  res.send(JSON.stringify({ res: now }));
});

router.get("/:date", (req, res) => {
  const date = new Date(req.params["date"]);

  if (date.toString() == "Invalid Date") {
    res.send({ msg: "bad date" });
    return;
  }

  res.send({ date: date });
});

router.get("/dailyInsert", async (req, res) => {
  // Just some constants

  // We can pass the JSON response as an object to our createTodoistTask later.
  const variables = {
    categorySlug: "all-code-essentials",
    skip: 0,
    limit: 50,
    filters: {},
  };

  const fetchDailyCodingChallenge = async () => {
    console.log(`Fetching daily coding challenge from LeetCode API.`);

    const init = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: DAILY_CODING_CHALLENGE_QUERY, variables }),
    };

    const response = await fetch(LEETCODE_API_ENDPOINT, init);
    return response.json();
  };
  async function read() {
    try {
      const database = client.db("Leetcode");
      const dailies = database.collection("Daily");
      let insertFields;
      let resp = await fetchDailyCodingChallenge();
      let dailyObj = resp.data;

      const question = JSON.stringify(
        dailyObj.activeDailyCodingChallengeQuestion
      );
      const q = await JSON.parse(question);
      let date = new Date(q.date);
      insertFields = {
        title: q.question.title,
        titleSlug: q.question.titleSlug,
        date: date,
        difficuly: q.question.difficulty,
        topics: q.question.topicTags,
      };

      await dailies.insertOne(insertFields);
      let stringedDailyQuestion = JSON.stringify(dailyObj);
      // should turn the push into mongo into a different path I guess
      dailyObj[{ addedToDBSuccess: true }];
      res.send(dailyObj);
      return stringedDailyQuestion;
    } catch (error) {
      console.log(error, "here");
      res.send(error.errorResponse);
    }
  }

  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);
  try {
    await read();
  } catch (error) {
    res.send({ err: error });
  }
});

router.get("/daily", async (req, res) => {
  try {
    const fetchDailyCodingChallenge = async () => {
      console.log(`Fetching daily coding challenge from LeetCode API.`);

      const init = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: DAILY_CODING_CHALLENGE_QUERY,
        }),
      };

      const response = await fetch(LEETCODE_API_ENDPOINT, init);
      return response.json();
    };

    async function getDaily() {
      const response = await fetchDailyCodingChallenge();
      const data = response.data;

      res.send(data);
    }
    getDaily();
  } catch (error) {
    res.send({ err: error });
  }
});

router.get("/all", async (req, res) => {
  const response = await fetch("https://leetcode.com/api/problems/all/");
  const data = await response.json();

  res.send(data);
});
export default router;
