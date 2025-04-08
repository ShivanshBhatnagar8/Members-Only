const express = require("express");
const routes = express.Router();
const {
  createMessages,
  deleteMessage,
} = require("../controller/messagesController");

routes.post("/", createMessages);
routes.delete("/delete", deleteMessage);
module.exports = routes;
