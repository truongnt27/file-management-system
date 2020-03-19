var User = require("../models/userStore");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/keymanagementsys");

var users = [
  new User({
    userId: "142757906",
    password: "123456",
    fullname: "Nguyễn Văn A",
    dob: "December 17, 1995",
    contact: "0962123456",
    address: "Ngõ Quỳnh, Quỳnh Lôi, Hai Bà Trưng, Hà Nội",
    type: "patient",
    keyList: [],
    files: []
  }),
  new User({
    userId: "142796325",
    password: "123456",
    fullname: "Đinh Văn Nguyên",
    dob: "December 17, 1995",
    contact: "0962123456",
    address: "Ngõ Trại, Cầu Giấy, Hà Nội",
    type: "patient",
    keyList: [],
    files: []
  }),
  new User({
    userId: "142769332",
    password: "123456",
    fullname: "Nguyễn Thắng Trung",
    dob: "December 17, 1995",
    contact: "0962123456",
    address: "Ngõ Tự do, Đồng Tâm, Hai Bà Trưng, Hà Nội",
    keyList: [],
    files: [],
    type: "doctor",
  }),
  new User({
    userId: "admin",
    password: "123",
    fullname: "Nguyễn Thắng Trường",
    dob: "December 17, 1995",
    contact: "0962123456",
    address: "Ngõ Tự do, Đồng Tâm, Hai Bà Trưng, Hà Nội",
    type: "doctor",
    keyList: [],
    files: [],
  }),
  new User({
    userId: "142720010",
    password: "123456",
    fullname: "Trần Văn An",
    dob: "December 17, 1995",
    contact: "0962123456",
    address: "Ngõ Quỳnh, Quỳnh Lôi, Hai Bà Trưng, Hà Nội",
    type: "doctor",
    keyList: [],
    files: []
  }),
  new User({
    userId: "142736958",
    password: "123456",
    fullname: "Nguyễn Đức Toàn",
    dob: "December 17, 1973",
    contact: "0962123456",
    address: "Ngõ Trại, Cầu Giấy, Hà Nội",
    type: "doctor",
    keyList: [],
    files: [],
  }),
  new User({
    userId: "142755555",
    password: "123456",
    fullname: "Nguyễn Văn Dũng",
    dob: "December 17, 1973",
    contact: "0962123456",
    address: "Trần Khát Chân, Hai Bà Trưng, Hà Nội",
    keyList: [],
    files: [],
    type: "doctor",
  }),
  new User({
    userId: "14274444",
    password: "123456",
    fullname: "Nguyễn Văn Bình",
    dob: "December 17, 1995",
    contact: "0962123456",
    address: "Ngõ Tự do, Đồng Tâm, Hai Bà Trưng, Hà Nội",
    keyList: [],
    files: [],
    type: "doctor",
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
