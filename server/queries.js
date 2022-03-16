const getAllUsers = (collection, result) => {
  collection.find().toArray((error, documents) => {
    error ? result.send("Cannot find users") : result.send(documents);
  });
};

const getUserById = ({ collection, userId, result }) => {
  collection.findOne({ _id: userId }, (error, response) => {
    error ? result.send("Cannot find user") : result.send(response);
  });
};

const createNewUser = ({ collection, firstName, lastName, result }) => {
  collection.insertOne(
    { first_name: firstName, last_name: lastName },
    (error, response) => {
      error ? result.send("Cannot create") : result.send(response);
    }
  );
};

const createNewCard = ({ collection, russian, english, userId, result }) => {
  collection.insertOne(
    { russian, english, user_id: userId },
    (error, response) => {
      error ? result.send("Cannot create") : result.send(response);
    }
  );
};

const deleteCardById = ({ collection, userId, wordId, result }) => {
  collection.deleteOne({ _id: wordId, user_id: userId }, (error, response) => {
    error ? result.send("Cannot delete") : result.send(response);
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  createNewCard,
  deleteCardById,
};
