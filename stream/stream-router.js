const { Router } = require("express");
const ChatRoom = require("./stream-model");

const router = new Router();

router
  .get("/stream", (req, res) => {
    console.log("Hi from Stream");

    res.status(200);
    res.send("Hi from Stream");

    // here I want to stream things
  })
  .post("/message", async (req, res) => {
    console.log("Hi from Post Message in Stream");
    console.log("Req Body is", req.body);
    const { message } = req.body;

    const entity = await ChatRoom.create({
      message
    });
    res.status(201);
    res.send("Thanks for your Twitterlike Message");
  });

module.exports = router;
