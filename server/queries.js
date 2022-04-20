const getAllUsers = (collection, result) => {
  collection.find().toArray((error, documents) => {
    error ? result.send("Cannot find users") : result.send(documents);
  });
};

const getUserInfoById = ({ collection, userId, result }) => {
  collection.findOne({ _id: userId }, (error, response) => {
    error ? result.send("Cannot find user") : result.send(response);
  });
};

const getSelectedCards = ({userId, firstKey,secondKey, collection, result }) => {    
  collection.find({user_id: userId, [firstKey]: {$exists: true}, [secondKey]: {$exists: true}})
  .toArray((error, documents) => {
    error ? result.send("Cannot find cards") : result.send(documents);
  });
}

const getCardsByUserId = ({ collection, userId, result }) => {
  collection.find({ user_id: userId }).toArray((error, documents) => {
    error ? result.send("Cannot find cards") : result.send(documents);
  });
};

const createNewUser = ({ collection, firstName, lastName, result }) => {
  collection.insertOne(
    { first_name: firstName, last_name: lastName },
    (error, response) => {
      error ? result.send("Cannot create user") : result.send(response);
    }
  );
};

const createNewCard = ({ collection, words, userId, result }) => {
  collection.insertOne(
    { ...words, user_id: userId },
    (error, response) => {
      error ? result.send("Cannot create card") : result.send(response);
    }
  );
};

const deleteCardById = ({ collection, userId, cardId, result }) => {
  collection.deleteOne({ _id: cardId, user_id: userId }, (error, response) => {
    error ? result.send("Cannot delete card") : result.send(response);
  });
};

const editCardById = ({
  collection,
  userId,
  cardId,
  editedWords,
  result,
}) => {
  collection.updateOne(
    { _id: cardId, user_id: userId },
    {
      $set: {
        ...editedWords
      },
    },
    (error, response) => {
      error ? result.send("Cannot edit card") : result.send(response);
    }
  );
};

const deleteUserById = ({ userId, usersCollection, cardsCollection, result }) => {
  usersCollection.aggregate([
    { $match: { _id: userId } },
    { $lookup: { from: 'cards', foreignField: "user_id", localField: "_id", as: 'cards' } }
  ]).toArray((error, documents) => {
    if (!error) {
      documents.map((doc) => doc.cards.map((card) => {
        cardsCollection.deleteOne({ _id: card._id }, (error) => {
          if (!error) {
            usersCollection.deleteOne({ _id: userId }, (error, response) => {
              error ? result.send("Cannot delete user") : result.send(response);
            })
          } else {
            result.send("Cannot delete user")
          }
        })
      }))
    } else {
      result.send("Cannot delete user")
    }
  });
};

const editUserById = ({
  collection,
  userId,
  editedFirstName,
  editedLastName,
  result,
}) => {
  collection.updateOne(
    { _id: userId },
    { $set: { first_name: editedFirstName, last_name: editedLastName } },
    (error, response) => {
      error ? result.send("Cannot edit user info") : result.send(response);
    }
  );
};

module.exports = {
  getAllUsers,
  getUserInfoById,
  createNewUser,
  createNewCard,
  deleteCardById,
  getSelectedCards,
  editCardById,
  getCardsByUserId,
  deleteUserById,
  editUserById,
};
