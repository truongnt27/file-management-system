const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require('cors');

mongoose.connect("mongodb://localhost:27017/keymanagementsys");

const authRouter = require("./routes/authen.router");
const usersRouter = require("./routes/users.router");
const keysRouter = require("./routes/keys.router");
const filesRouter = require("./routes/files.router");
const cryptoRouter = require("./routes/crypto.router");
const logsRouter = require("./routes/logs.router");

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  methods: "GET,PUT,POST,DELETE"
}));
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
require('./config/passport-facebook.js');
require('./config/passport-google.js');
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", usersRouter);

app.use("/api/keys", keysRouter);
app.use("/api/auth", authRouter);
app.use("/api/files", filesRouter);
app.use("/api/logs", logsRouter);
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
