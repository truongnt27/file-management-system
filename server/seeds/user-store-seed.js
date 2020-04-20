var User = require("../models/userStore");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/keymanagementsys");

var users = [
  new User({
    email: "dev1@company.com",
    password: "123456",
    fullname: "Nguyễn Văn An",
    dob: "December 17, 1995",
    contact: "0962123456",
    address: "Quỳnh Lôi, Hai Bà Trưng, Hà Nội",
    type: "User",
    keyList: [],
    files: []
  }),
  new User({
    email: "dev2@company.com",
    password: "123456",
    fullname: "Kim Ji Won",
    dob: "December 17, 1995",
    contact: "0962123456",
    address: "Seul, Korean",
    type: "User",
    keyList: [],
    files: [],
    avatarPicture: 'https://images.unsplash.com/photo-1517841905240-472988babdf9'
  }),
  new User({
    email: "manager1@company.com",
    password: "123456",
    fullname: "Phạm Văn Bá",
    dob: "December 17, 1995",
    contact: "0962123456",
    address: "Khâm Thiên, Đống Đa, Hà Nội",
    keyList: [],
    files: [],
    type: "Manager",
  }),
  new User({
    email: "admin@company.com",
    password: "123456",
    fullname: "Nguyễn Thắng Trường",
    dob: "December 17, 1995",
    contact: "0962123456",
    address: "Đồng Tâm, Hai Bà Trưng, Hà Nội",
    type: "Manager",
    keyList: [],
    files: [],
    avatarPicture: 'https://www.w3schools.com/html/img_girl.jpg'
  }),
  new User({
    email: "manager2@company.com",
    password: "123456",
    fullname: "Jose Teddy",
    dob: "December 17, 1995",
    contact: "0962123456",
    address: "San Francisco, LA, USA ",
    type: "Manager",
    keyList: [],
    files: [],
    avatarPicture: 'https://images.unsplash.com/photo-1506919258185-6078bba55d2a'
  }),
  new User({
    email: "manager3@company.com",
    password: "123456",
    fullname: "Nguyễn Đức Toàn",
    dob: "December 17, 1973",
    contact: "0962123456",
    address: "Duy Tân, Cầu Giấy, Hà Nội",
    type: "Manager",
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
    type: "Manager",
  }),
  new User({
    email: "manager5@company.com",
    password: "123456",
    fullname: "Harry Kate",
    dob: "December 17, 1995",
    contact: "0962123456",
    address: "San Francisco, LA, USA ",
    keyList: [],
    files: [],
    type: "Manager",
    avatarPicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
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
