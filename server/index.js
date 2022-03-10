const express = require("express");
const { MongoClient } = require("mongodb");
var cors = require("cors");
require("dotenv").config();
const UserModel = require("./models/user");

const client = new MongoClient(process.env.ATLAS_URI, {
  useUnifiedTopology: true,
});

let initialData;
const run = async () => {
  try {
    await client.connect();
    const db = await client.db("words");

    initialData = db
      .collection("words")
      .find()
      .toArray(function (err, result) {
        if (err) {
          throw err;
        }
        console.log(result);
      });
  } finally {
    console.log("mongo is running");
  }
};
run();

const app = express();
const router = express.Router();
app.use(cors());
app.use(express.json());

router.get("/", function (req, res) {
  res.send(result);
});

// const client = await MongoClient.connect(process.env.MFLIX_DB_URI, {
//   useNewUrlParser: true,

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
