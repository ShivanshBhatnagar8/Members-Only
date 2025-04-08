const db = require("../db/queries");

async function getLoginForm(req, res) {
  try {
    const messages = await db.getAllMessages();
    res.render("index", {
      user: req.user,
      message: req.session.messages,
      messages: messages,
    });
  } catch (error) {
    res.status(400).render("errorPage");
  }
}

async function logout(req, res) {
  req.logout((err) => {
    if (err) {
      res.status(400).render("errorPage");
    }
    res.redirect("/");
  });
}

module.exports = {
  getLoginForm,
  logout,
};
