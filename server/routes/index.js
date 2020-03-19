var express = require("express");
var router = express.Router();
var path = require("path");
var crypto = require("crypto");
var multer = require('multer');
var encryptor = require('file-encryptor');

var UserStore = require("../models/userStore");
var EncryptKey = require("../models/encryptKey");
var KeyStore = require("../models/keyStore");
var EventLog = require("../models/eventLog");

/* GET homepage page. */
router.get("/", isLoggedIn, function (req, res, next) {
  res.redirect("/dashboard");
});

/* GET dashboard page. */
router.get("/dashboard", isLoggedIn, function (req, res, next) {
  var userId = req.session.userId;
  UserStore.findOne({ userId: userId }, function (err, doc) {
    if (doc != null) {
      var keyIds = doc.keyList;
      EncryptKey.find({ alias: keyIds }, function (err, result) {
        if (err) return err;
        res.render("dashboard", { keys: result });
      });
    }
  });
});

router.post("/dashboard/changeKeyStatus", function (req, res, next) {
  var keys = req.body.keys;
  var status = req.body.status;
  keys.forEach(key => {
    EncryptKey.findById(key, function (err, doc) {
      if (err) res.send(err)
      doc.status = status;
      doc.save(function (err, doc) {
        if (err) res.send(err);
        res.send("Success");
      });
    });
  });

});

/* GET view detail key page */
router.get("/dashboard/viewDetailKey/:alias", function (req, res, next) {
  EncryptKey.findOne({ alias: req.params['alias'] }, function (err, key) {
    if (err || key == null) return res.send("Error!");
    UserStore.find({ userId: key.userPermision }, function (err, users) {
      UserStore.find(function (err, userList) {
        var result = filterUser(userList, users);
        res.render("viewDetailKey", { key: key, users: users, userList: result, currentUser: req.session.userId });
      });
    });
  });
});

router.post("/dashboard/viewDetailKey/updateKey", function (req, res, next) {
  var userPermision = req.body.userPermision;
  userPermision.push(req.session.userId);
  EncryptKey.findById(req.body.keyId, function (err, key) {
    key.description = req.body.description;
    key.userPermision = userPermision;
    key.rotation = req.body.rotation;
    key.save(function (err, doc) {
      if (err) return res.send("err");
      var event = new EventLog({
        event: "update-key",
        keyAlias: doc.alias,
        userId: req.session.userId,
        time: Date.now()
      });
      event.save(function (err) {
        if (err) console.log(err);
      });
      return res.send("Update successful");
    })
  });
});

/* create key */
router.get("/createKey", function (req, res, next) {
  var users = [];
  UserStore.find(function (err, docs) {
    users = docs;
    res.render("createKey", { users: users, currentUser: req.session.userId });
  });
});

router.post("/createKey", function (req, res, next) {
  var event = new EventLog({
    event: "create-key",
    keyAlias: req.body.alias,
    userId: req.session.userId,
    time: Date.now()
  });
  event.save(function (err) {
    if (err) console.log(err);
  });
  EncryptKey.findOne({ alias: req.body.alias }, function (err, key) {
    if (key != null) return res.send("Key alias existed ");
    var key = genKey();
    var keyStore = new KeyStore(key);
    console.log(keyStore);
    keyStore.save(function (err, result) {
      if (err) {
        res.send(err);
      }
      const userPermision = req.body.userPermision;
      userPermision.push(req.session.userId);
      const alias = req.body.alias;
      var encryptKey = new EncryptKey({
        userId: "142757906",
        keyId: result,
        status: "enable",
        rotation: "false",
        createdDate: Date.now(),
        alias: req.body.alias,
        description: req.body.description,
        userPermision: userPermision
      });
      encryptKey.save(function (err, encryptKey) {
        userPermision.forEach(user => {
          UserStore.findOne({ userId: user }, function (err, doc) {
            if (err) res.send(err);
            doc.keyList.push(alias)
            doc.save(function (err) {
              if (err) res.send(err);
            });
          });
        });
        return res.send("Success");
      });
    });
  });
});
/* GET manage record page */
router.get("/manageRecord", isLoggedIn, function (req, res, next) {
  var userId = req.session.userId;
  UserStore.findOne({ userId: userId }, function (err, doc) {
    // if (doc) res.redirect("/user/login");
    var keyAlias = doc.keyList;
    EncryptKey.find({ alias: keyAlias, status: "enable" }, function (err, keys) {
      if (keys) res.render("manageRecord", { keys: keys, userId: userId, files: doc.files });
    });
  });
});

router.post("/manageRecord/uploadFile", function (req, res, next) {

  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.end("Error uploading file.");
    }
    console.log(req.body.key, req.file.filename);
    UserStore.findOne({ userId: req.session.userId }, function (err, user) {
      var date = new Date();
      user.files.push({
        file: req.file.filename,
        key: req.body.key,
        size: req.file.size,
        lastModified: date.toString()
      });
      user.save(function (err) {
        if (err) return res.send("Save failed");
      });
    });
    EncryptKey.findOne({ alias: req.body.key }, function (err, doc) {
      KeyStore.findById(doc.keyId, function (err, key) {
        encryptFile(req.file.filename, key.plaintext);
      })
    });
    var event = new EventLog({
      event: "encrypt-file",
      keyAlias: req.body.key,
      userId: req.session.userId,
      time: Date.now()
    });
    event.save(function (err) {
      if (err) console.log(err);
    });
    return res.redirect("/manageRecord");
  });
});

router.post("/manageRecord/getDetailKey", function (req, res, next) {
  var keyAlias = req.body.alias;
  var userId = req.session.userId;
  EncryptKey.findOne({ alias: keyAlias }, function (err, doc) {
    if (err) res.send(err)
    res.json({
      userId: userId,
      key: doc
    });
  });
});

router.get("/eventLog", function (req, res, next) {
  EventLog.find(function (err, events) {
    res.render("eventLog", { events: events });
  });
});

/* Save file  */
var storage = multer.diskStorage({

  destination: function (req, file, callback) {
    callback(null, './public/tmp_uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

var upload = multer({ storage: storage }).single('fileUpload');

/* Generate random key */
var genKey = function () {
  var sharedSecret = crypto.randomBytes(16); // key_length = 256 bit
  var textSecret = sharedSecret.toString('base64');
  return {
    plaintext: textSecret,
    createdDate: Date.now()
  }
}

function encryptFile(fileName, key) {
  encryptor.encryptFile(`./public/tmp_uploads/${fileName}`, `./public/tmp_uploads/encrypted_${fileName}`, key, { algorithm: 'aes256' }, function (err) {
    if (err) console.error(err);
  });
}

function isLoggedIn(req, res, next) {
  if (req.session.userId == "" || req.session.userId == null || req.session.userId == undefined) return res.redirect("/user/login");
  return next();
}

function filterUser(array1, array2) {
  return array1.filter(function (obj1) {
    return array2.filter(function (obj2) {
      return obj1.userId == obj2.userId;
    }).length == 0;
  });
}

module.exports = router;
