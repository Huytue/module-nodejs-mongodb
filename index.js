const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const routeStudent = require('./routes/student');
const routeClasses = require('./routes/classes');
const routeAdmin = require('./routes/admin');
const routeHome = require('./routes/home');

const Classes = require("./models/classes");
const Student = require("./models/student");

//Tự động tạo class
module.exports.generateClass = async function () {
  var classess = [];
  for (let index = 1; index < 10; index++) {
    let classes = {
      name: "Công nghệ thông tin " + index,
    }
    classess.push(classes);
  }
  await Classes.collection.insertMany(classess, (err) => {
    if (err) {
      console.log("error");
    } else {
      console.log("finish");
    }
  });
}
//Tự động tạo student
module.exports.generateStudent = async () => {
  const students = [];
  for (let index = 1; index < 500; index++) {
    //Tìm ngẫu nhiên 1 lớp
    await Classes.countDocuments((err, count) => {
      var random = Math.floor(Math.random() * count)
      Classes.findOne().skip(random).exec(
        (err, result) => {
          var student = {
            name: "Nguyễn Văn " + index,
            email: "nguyenvan" + index + "@tdc.edu.vn",
            class: result._id
          };
          students.push(student);
        })
    })
  }
  Student.collection.insertMany(students, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("finish");
    }
  });
}

// Tạo hàm gọi app để sử dụng
module.exports.app = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.set("view engine", "ejs");
  app.use(express.static("node_modules/module-nodejs-mongodb/public"));
  app.set("views", "node_modules/module-nodejs-mongodb/views");

  app.use("/student", routeStudent);
  app.use("/classes", routeClasses);
  app.use("/admin", routeAdmin);
  app.use("/", routeHome);

  app.listen(3000);
}

//Tajo hàm kết nối Mongodb local
module.exports.mongoLocal = (nameDB) => {
  const mongoose = require("mongoose");
  mongoose.connect("mongodb://localhost/" + nameDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("MongoDB connection successfully");
  });
}

//Tạo hàm kết nối Mongodb Online
module.exports.mongoOnline = (urlDB) => {
  const mongoose = require("mongoose");
  mongoose.connect(urlDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("MongoDB connection successfully");
  });
}

