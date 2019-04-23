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
const client = new MongoClient(CONNECTION_URL, { useNewUrlParser: true });

if (process.env == "production") {
  app.listen(config.env.webPort, () => {
    client.connect(err => {
      //   const collection = client.db("test").collection("devices");
      // perform actions on the collection object
      client.close();
    });
  });
} else {
  app.listen(config.env.webPort, function() {
    console.log("Server listening on port " + app.get("port"));
  });
}
