var express = require('express');
var router = express.Router();

var UserStore = require("../models/userStore");
/* GET users listing. */
router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post("/login", function (req, res, next) {
  var userId, password = ""
  userId = req.body.userId;
  password = req.body.password;
  var type = req.body.type;

  console.log(req.body);
  if (!userId == "") {
    UserStore.findOne({ userId: userId }, function (err, doc) {
      if (err || doc == null) res.send("User not found !");
      else {
        if (doc.password == password && doc.type == type) {
          req.session.userId = doc.userId;
          res.send("Success");
        }
        else {
          res.send("Invalid username or password !");
        }
      }
    });
  }
  else {
    res.send("Invalid username or password!");
  }
});


module.exports = router;
