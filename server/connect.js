const { MongoClient } = require("mongodb");

const bdAddress = process.env.ATLAS_URI;
const client = new MongoClient(bdAddress, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let DataBase;
console.log(client);

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (error, dbClient) {
      if (dbClient) {
        DataBase = dbClient.db("words");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(error);
    });
  },

  getDB: function () {
    return DataBase;
  },
};
