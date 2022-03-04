const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/user");
const DataBase = require("./connect");
const ObjectId = require("mongodb").ObjectId;

const app = express();
const router = express.Router();
app.use(express.json());

console.log(DataBase);

// This help convert the id from string to ObjectId for the _id.

// router.route("/").get(function (req, res) {
//   console.log(DBCollection);
// let db_connect = DBCollection.getDB("users");
// db_connect
//   .collection("users")
//   .find({})
//   .toArray(function (err, result) {
//     if (err) throw err;
//     res.json(result);
//   });
// });
// router.get("/", function (req, res, next) {
//   UserModel.find((err, docs) => {
//     if (docs) {
//       console.log("result", res);
//       // res.render("list", {
//       //   data: docs,
//       // });
//     } else {
//       console.log("Failed to retrieve the Course List: " + err);
//     }
//   });
// });

// router.get("/user/create", async (required, response) => {
//   const newUser = new UserModel({
//     firstName: "Olga",
//     lastName: "Pinchuk",
//     words: [
//       {
//         english: "pen",
//         russian: "ручка",
//       },
//     ],
//   });

// const user = required.body;
// const newUser = new UserModel(user);
//   await newUser.save();
//   response.json(newUser);
// });

// app.get("/words", async (required, response) => {

//   const user = required.body;
//   const newUser = new UserModel(user);
//   await newUser.save();
//   response.json(newUser);
// });

app.listen(3003, () => {
  console.log("Yaay, server is runnung");
});
