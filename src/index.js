const app = require("./server");
const config = require("./config/env/env");

const MongoClient = require("mongodb").MongoClient;
const CONNECTION_URL =
  "mongodb+srv://" +
  process.env.DB_USER +
  ":" +
  process.env.DB_PASSWORD +
  "concertiodb-dndfi.gcp.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = process.env.DB_DATABASE;

// const database, collection;

if (process.env.NODE_ENV == "production") {
  app.listen(config.env.webPort, () => {
    MongoClient.connect(
      CONNECTION_URL,
      { useNewUrlParser: true },
      (error, client) => {
        if (error) {
          throw error;
        }
        database = client.db(DATABASE_NAME);
        console.log(
          "Connected to `" + DATABASE_NAME + "` on port " + app.get("port")
        );
      }
    );
  });
} else {
  app.listen(config.env.webPort, function() {
    console.log("Server listening on port " + app.get("port"));
  });
}
