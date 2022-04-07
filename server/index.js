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
  deleteUserById, 
  editUserById,
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
    const { userId, ...words } = request.body;
    createNewCard({
      userId: new ObjectId(userId),
      words,
      collection: cardsCollection,
      result,
    });
  });

  app.post("/cards/edit", (request, result) => { 
    const { cardId, userId, ...editedWords} = request.body;
    editCardById({
      userId:new ObjectId(request.body.userId),
      cardId:new ObjectId(request.body.cardId),
      editedWords,
      collection: cardsCollection,
      result,
    });
  });

  app.post("/cards/delete", (request, result) => {
    const cardId = new ObjectId(request.body.cardId);
    const userId = new ObjectId(request.body.userId);
    deleteCardById({ cardId, userId, collection: cardsCollection, result });
  });

  app.post("/user/edit", (request, result) => {
    const userId = new ObjectId(request.body.userId);
    const { editedFirstName, editedLastName } = request.body;
    editUserById({
      userId,
      editedFirstName,
      editedLastName,
      collection: usersCollection,
      result,
    });
  });

  app.post("/user/delete", (request, result) => {
    const userId = new ObjectId(request.body.userId); 
    deleteUserById({ userId, usersCollection, cardsCollection, result });
  });
});

app.listen(process.env.PORT, () => {
  console.log("Yaay, server is runnung ");
});
