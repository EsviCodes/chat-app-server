const express = require("express");
const streamRouter = require("./stream/stream-router");

const app = express();

const port = process.env.PORT || 5000;

app
  .use(streamRouter)
  .get("/", (req, res) => {
    console.log("Hello World");
    res.status(200);
    res.send("Hello World");
  })
  .listen(port, () => console.log(`Listening to port ${port}`));
