<<<<<<< HEAD
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var session = require("express-session");
const passport = require("passport");
=======
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
>>>>>>> 5a0051d21bd8416ff1bf6451ab4932862a9d1ea3

mongoose.connect("mongodb://localhost:27017/keymanagementsys");

const authRouter = require("./routes/authen.router");
const usersRouter = require("./routes/users.router");
const keysRouter = require("./routes/keys.router");
const cryptoRouter = require("./routes/crypto.router");

const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(
  {
    secret: "Shh, its a secret!",
    resave: false,
    cookie: { maxAge: 180 * 60 * 1000 }
  }
));

require('./config/passport.js');
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", usersRouter);

app.use("/api/keys", keysRouter);
app.use("/api/keys", keysRouter);
// app.use("/api/crypto", cryptoRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    status: "FAILED",
    message: "Something's wrong"
  });
});

module.exports = app;
