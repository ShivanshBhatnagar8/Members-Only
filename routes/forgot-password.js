const express = require("express");
const routes = express.Router();
const {
  getForgotPasswordForm,
  updateUserPassword,
} = require("../controller/forgotPasswordController");

routes.get("/", getForgotPasswordForm);
routes.post("/", updateUserPassword);

module.exports = routes;
