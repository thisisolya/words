const express = require("express");
const { MongoClient } = require("mongodb");
var cors = require("cors");
require("dotenv").config();
const UserModel = require("./models/user");

const app = express();
app.use(require("body-parser").json());
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.ATLAS_URI, {
  useUnifiedTopology: true,
});

client.connect((err, client) => {
  const db = client.db("words-app");
  const collection = db.collection("users");

  app.get("/", (req, res) => {
    collection.find({ user: req.params.user }).toArray((err, docs) => {
      if (err) {
        res.send("Error in GET req.");
      } else {
        res.send(docs);
      }
    });
  });

  // Responds to POST requests with the route parameter being the username.
  // Creates a new user in the collection with the `user` parameter and the JSON sent with the req in the `body` property
  // Example request: https://mynodeserver.com/myNEWusername
  // app.post("/:user", (req, res) => {
  //   // inserts a new document in the database (collection)
  // collection.insertOne(
  //   { ...req.body, user: req.params.user }, // this is one object to insert. `requst.params` gets the url req parameters
  //   (err, r) => {
  //     if (err) {
  //       res.send("Error in POST req.");
  //     } else {
  //       res.send("Information inserted");
  //     }
  //   }
  // );
});

// this doesn't create a new user but rather updates an existing one by the user name
// a request looks like this: `https://nodeserver.com/username23` plus the associated JSON data sent in
// the `body` property of the PUT request
// app.put("/:user", (req, res) => {
//   collection.find({ user: req.params.user }).toArray((err, docs) => {
//     if (err) {
//       // if and error occurs in finding a user to update
//       res.send("Error in PUT req.");
//     } else {
//       collection.updateOne(
//         { user: req.params.user }, // if the username is the same, update the user
//         { $set: { ...req.body, user: req.params.user } }, // update user data
//         (err, r) => {
//           if (err) {
//             // if error occurs in actually updating the data in the database
//             console.log("Error in updating database information");
//           } else {
//             // everything works! (hopefully)
//             res.send("Updated successfully");
//           }
//         }
//       );
//     }
//   });

// if someone goes to base route, send back they are home.
//   app.get("/", (req, res) => {
//     res.send("You are home 🏚.");
//   });
// });

app.listen(8080, () => {
  console.log("Yaay, server is runnung ");
});
// });
