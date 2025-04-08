const db = require("../db/queries");

async function createMessages(req, res) {
  try {
    const { title, message } = req.body;
    await db.createMessage(title, message, req.user.id);
    res.redirect("/");
  } catch (error) {
    res.status(400).render("errorPage");
  }
}
async function deleteMessage(req, res) {
  try {
    const { messageId } = req.body;
    await db.deleteMessage(messageId);
    res.status(200).send();
  } catch (error) {
    res.status(400).render("errorPage");
  }
}
module.exports = {
  createMessages,
  deleteMessage,
};
