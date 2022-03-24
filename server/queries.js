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

const createNewCard = ({ collection, russian, english, userId, result }) => {
  collection.insertOne(
    { russian, english, user_id: userId },
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
  english,
  russian,
  result,
}) => {
  collection.updateOne(
    { _id: cardId, user_id: userId },
    {
      $set: {
        english,
        russian,
      },
    },
    (error, response) => {
      error ? result.send("Cannot edit card") : result.send(response);
    }
  );
};

const deleteUserById = ({ userId, collection, result }) => {
  collection.deleteOne({ _id: userId }, (error, response) => {
    error ? result.send("Cannot delete user") : result.send(response);
  });
};
const deleteCardsByUserId = ({ userId, collection, result }) => {
  collection.deleteMany({ user_id: userId }, (error, response) => {
    error
      ? result.send("Cannot delete cards belonging to user")
      : result.send(response);
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
  editCardById,
  getCardsByUserId,
  deleteUserById,
  deleteCardsByUserId,
  editUserById,
};
