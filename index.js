const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./users/user-router");
const authRouter = require("./auth/auth-router");
const authMiddleware = require("./auth/authMiddleware");

// Routers
const streamRouter = require("./stream/stream-router");

const app = express();
const port = process.env.PORT || 5000;

const jsonParser = bodyParser.json();

app
  .use(cors())
  .use(jsonParser)
  .use(streamRouter)
  .use(userRouter)
  .use(authRouter)
  .use(authMiddleware)
  .get("/", (req, res) => {
    console.log("Hello World");
    res.status(200);
    res.send("Hello World");
  })
  .listen(port, () => console.log(`Listening to port ${port}`));
