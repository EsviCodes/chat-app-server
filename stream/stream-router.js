// To set up a stream: npm install json-sse
// Json, sever sends events

// Use stream in both your get as post requests. Dont't forget either one

const { Router } = require("express");
const ChatRoom = require("./stream-model");
const Sse = require("json-sse");

const router = new Router();
const stream = new Sse();

router
  .get("/stream", async (req, res) => {
    console.log("Hi from Stream");

    // res.status(200); --> we want our stream to handle the collection, thus don't do this.
    // res.send("Hi from Stream"); --> we want our stream to handle the collection, thus don't do this.

    // Streaming....
    // Db is the master to stream things
    const messagesList = await ChatRoom.findAll();
    //console.log("Before Stringify - Messages in Db", messagesList);

    // we don't want to send the user the whole body. Instead we use stringify
    const data = JSON.stringify(messagesList);
    console.log("After Stringify - Messages in Db", data);

    // It's important to use stream with every .init (so not stream.updateInit.init --> this doesn't work)
    // Test with http :5000/stream --stream
    stream.updateInit(data); // Here I put the data in the stream
    stream.init(req, res); // IMPORTANT!
  })
  .post("/message", async (req, res) => {
    console.log("Hi from Post Message in Stream");
    console.log("Req Body is", req.body);
    const { message } = req.body;

    const entity = await ChatRoom.create({
      message
    });

    // Update the string for the stream
    const messagesList = await ChatRoom.findAll(); // copied form get request
    const data = JSON.stringify(messagesList); // copied form get request
    stream.send(data); // updates the stream

    res.status(201);
    res.send("Thanks for your Twitterlike Message");
  });

module.exports = router;
