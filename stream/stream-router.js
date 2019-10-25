const { Router } = require("express");

const router = new Router();

router.get("/stream", (req, res) => {
  console.log("Hi from Stream");

  res.status(200);
  res.send("Hi from Stream");
});

module.exports = router;
