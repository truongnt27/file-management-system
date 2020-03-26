var User = require("../models/userStore");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/keymanagementsys");

var users = [
  new User({
    email: "dev1@company.com",
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
    email: "dev2@company.com",
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
    email: "manager1@company.com",
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
    email: "admin@company.com",
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
    email: "manager2@company.com",
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
    email: "manager3",
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
    email: "manager4@company.com",
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
    email: "manager5@company.com",
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
