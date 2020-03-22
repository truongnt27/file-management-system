var User = require("../models/userStore");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/keymanagementsys");

var users = [
  new User({
    userId: "dev1",
    password: "123456",
    fullname: "Nguyễn Văn A",
    dob: "December 17, 1995",
    contact: "0962123456",
    address: "Ngõ Quỳnh, Quỳnh Lôi, Hai Bà Trưng, Hà Nội",
    type: "user",
    keyList: [],
    files: []
  }),
  new User({
    userId: "dev2",
    password: "123456",
    fullname: "Đinh Văn Nguyên",
    dob: "December 17, 1995",
    contact: "0962123456",
    address: "Ngõ Trại, Cầu Giấy, Hà Nội",
    type: "user",
    keyList: [],
    files: []
  }),
  new User({
    userId: "manager1",
    password: "123456",
    fullname: "Nguyễn Thắng Trung",
    dob: "December 17, 1995",
    contact: "0962123456",
    address: "Ngõ Tự do, Đồng Tâm, Hai Bà Trưng, Hà Nội",
    keyList: [],
    files: [],
    type: "manager",
  }),
  new User({
    userId: "admin",
    password: "123465",
    fullname: "Nguyễn Thắng Trường",
    dob: "December 17, 1995",
    contact: "0962123456",
    address: "Ngõ Tự do, Đồng Tâm, Hai Bà Trưng, Hà Nội",
    type: "manager",
    keyList: [],
    files: [],
  }),
  new User({
    userId: "manager2",
    password: "123456",
    fullname: "Trần Văn An",
    dob: "December 17, 1995",
    contact: "0962123456",
    address: "Ngõ Quỳnh, Quỳnh Lôi, Hai Bà Trưng, Hà Nội",
    type: "manager",
    keyList: [],
    files: []
  }),
  new User({
    userId: "manager3",
    password: "123456",
    fullname: "Nguyễn Đức Toàn",
    dob: "December 17, 1973",
    contact: "0962123456",
    address: "Ngõ Trại, Cầu Giấy, Hà Nội",
    type: "manager",
    keyList: [],
    files: [],
  }),
  new User({
    userId: "manager4",
    password: "123456",
    fullname: "Nguyễn Văn Dũng",
    dob: "December 17, 1973",
    contact: "0962123456",
    address: "Trần Khát Chân, Hai Bà Trưng, Hà Nội",
    keyList: [],
    files: [],
    type: "manager",
  }),
  new User({
    userId: "manager5",
    password: "123456",
    fullname: "Nguyễn Văn Bình",
    dob: "December 17, 1995",
    contact: "0962123456",
    address: "Ngõ Tự do, Đồng Tâm, Hai Bà Trưng, Hà Nội",
    keyList: [],
    files: [],
    type: "manager",
  }),
];

var done = 0;

for (var i = 0; i < users.length; i++) {
  users[i].save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      done++;
      if (done == users.length) {
        exit();
      }
    }
  });
}
function exit() {
  mongoose.disconnect();
}
