const Sequelize = require("sequelize");
const db = require("../db");

const ChatRoom = db.define("chatroom", {
  message: Sequelize.STRING
});

module.exports = ChatRoom;
