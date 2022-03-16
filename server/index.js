const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const {
  getAllUsers,
  getUserById,
  createNewUser,
  createNewCard,
  deleteCardById,
} = require("./queries");

require("dotenv").config();

const app = express();

const client = new MongoClient(process.env.ATLAS_URI, {
  useUnifiedTopology: true,
});

app.use(require("body-parser").json());
app.use(cors());
app.use(express.json());

client.connect((error, client) => {
  const db = client.db("words-app");
  const usersCollection = db.collection("users");
  const wordsCollection = db.collection("words");

  app.get("/", (_, result) => {
    getAllUsers(usersCollection, result);
  });

  app.post("/user", (request, result) => {
    const userId = new ObjectId(request.body.userId);
    getUserById({ collection: usersCollection, userId, result });
  });

  app.post("/user/create", (request, result) => {
    const { firstName, lastName } = request.body;
    createNewUser({ firstName, lastName, collection: usersCollection, result });
  });

  app.post("/cards", (request, result) => {
    wordsCollection
      .find({ user_id: request.body.userId })
      .toArray((err, docs) => {
        if (err) {
          result.send("Error in GET req.");
        } else {
          result.send(docs);
        }
      });
  });

  app.post("/cards/create", (request, result) => {
    const { userId, russianWord, englishWord } = request.body;
    createNewCard({
      userId,
      russian: russianWord,
      english: englishWord,
      collection: wordsCollection,
      result,
    });
  });

  app.post("/cards/delete", (request, result) => {
    const wordId = new ObjectId(request.body.wordId);
    const userId = request.body.userId;
    deleteCardById({ wordId, userId, collection: wordsCollection, result });
  });
});

app.listen(8080, () => {
  console.log("Yaay, server is runnung ");
});
