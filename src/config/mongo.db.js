const mongoose = require("mongoose");
const config = require("./env/env");
const MongoClient = require('mongodb').MongoClient;

// mongoose.Promise = global.Promise;

// mongoose.connect(config.dburl, { useNewUrlParser: true });
// mongoose.connection
//   .once("open", () => console.log("Connected to Mongo on " + config.dburl))
//   .on("error", error => {
//     console.warn("Warning", error.toString());
// });

MongoClient.connect(config.dburl, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   // const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});