const express = require("express");
const bodyParser = require("body-parser");

// Routers
const streamRouter = require("./stream/stream-router");

const app = express();
const port = process.env.PORT || 5000;

const jsonParser = bodyParser.json();

app
  .use(jsonParser)
  .use(streamRouter)
  .get("/", (req, res) => {
    console.log("Hello World");
    res.status(200);
    res.send("Hello World");
  })
  .listen(port, () => console.log(`Listening to port ${port}`));
