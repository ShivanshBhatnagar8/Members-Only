const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const app = express();
require("dotenv").config();
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const loginRoutes = require("./routes/login");
const signUpRoutes = require("./routes/sign-up");
const forgotPasswordRoutes = require("./routes/forgot-password");
const messagesRoutes = require("./routes/messages");
const { getUserByEmail, getUserById } = require("./db/queries");

app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({ secret: "members", resave: false, saveUninitialized: false })
);

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await getUserByEmail(username);

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (error) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use("/", loginRoutes);
app.use("/sign-up", signUpRoutes);
app.use("/forgot-password", forgotPasswordRoutes);
app.use("/messages", messagesRoutes);

app.listen(3000, () => console.log("app listening on port 3000!"));
