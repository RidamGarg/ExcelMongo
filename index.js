if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const upload = require("./multer");
const readXlsxFile = require("read-excel-file/node");
const User = require("./modals/user");
const Admin = require("./modals/admin");
const Product = require("./modals/product");
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const dbUrl = process.env.dbUrl || "mongodb://localhost:27017/ExcelDB";
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:")); //This file will run every time So there is no need to connect with mongodb further
db.once("open", function () {
  console.log("Connected");
});
app.post("/upload/excel/data", upload.single("excel"), async (req, res) => {
  let path = __dirname + "/uploads/" + req.file.filename;
  readXlsxFile(path, { sheet: "User" }).then(async (rows) => {
    const arr = [];
    rows.forEach((row, idx) => {
      if (idx != 0) {
        arr.push({
          Name: row[0],
          Mobile: row[1],
          Age: row[2],
        });
      }
    });
    await User.insertMany(arr);
  });
  readXlsxFile(path, { sheet: "Admin" }).then(async (rows) => {
    const arr = [];
    rows.forEach((row, idx) => {
      if (idx != 0) {
        arr.push({
          Name: row[0],
          Mobile: row[1],
        });
      }
    });
    await Admin.insertMany(arr);
  });
  readXlsxFile(path, { sheet: "Products" }).then(async (rows) => {
    const arr = [];
    rows.forEach((row, idx) => {
      if (idx != 0) {
        arr.push({
          ProductName: row[0],
          Image: row[1],
        });
      }
    });
    await Product.insertMany(arr);
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(process.env.PORT || "5000", () => {
  console.log("Connected");
});
