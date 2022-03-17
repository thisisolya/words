const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const {
  getAllUsers,
  getUserInfoById,
  createNewUser,
  createNewCard,
  deleteCardById,
  editCardById,
  getCardsByUserId,
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
  const cardsCollection = db.collection("cards");

  app.get("/", (_, result) => {
    getAllUsers(usersCollection, result);
  });

  app.post("/user", (request, result) => {
    const userId = new ObjectId(request.body.userId);
    getUserInfoById({ collection: usersCollection, userId, result });
  });

  app.post("/user/create", (request, result) => {
    const { firstName, lastName } = request.body;
    createNewUser({ firstName, lastName, collection: usersCollection, result });
  });

  app.post("/cards", (request, result) => {
    const userId = new ObjectId(request.body.userId);
    getCardsByUserId({ userId, collection: cardsCollection, result });
  });

  app.post("/cards/create", (request, result) => {
    const userId = new ObjectId(request.body.userId);
    const { russianWord, englishWord } = request.body;
    createNewCard({
      userId,
      russian: russianWord,
      english: englishWord,
      collection: cardsCollection,
      result,
    });
  });

  app.post("/cards/edit", (request, result) => {
    const cardId = new ObjectId(request.body.cardId);
    const userId = new ObjectId(request.body.userId);
    const { editedRussianWord, editedEnglishWord } = request.body;
    editCardById({
      userId,
      cardId,
      russian: editedRussianWord,
      english: editedEnglishWord,
      collection: cardsCollection,
      result,
    });
  });

  app.post("/cards/delete", (request, result) => {
    const cardId = new ObjectId(request.body.cardId);
    const userId = new ObjectId(request.body.userId);
    deleteCardById({ cardId, userId, collection: cardsCollection, result });
  });
});

app.listen(8080, () => {
  console.log("Yaay, server is runnung ");
});
