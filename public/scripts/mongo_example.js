"use strict";

const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // ==> We have a connection to the "test-tweets" db,
  //     starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);
// ==> Let's "get all the tweets". In Mongo-speak, we "find" them.
  //db.collection("tweets").find({}, (err, results, d) => {



function getTweets(callback){
    db.collection("tweets").find().toArray((err, tweets) => {
        // Lazy error handling:
    

    // ==> Fair warning: This is going to log a lot of stuff...
  

    // ==> This is inside this callback now. Think about it:
    // This is now the "end of the program", right?.
      if (err) {
        return callback(err);
      }
      callback(null, tweets);
    }); 
  }
   
   getTweets((err, tweets) => {
    if (err) throw err;

    console.log("Logging each tweet:");
    for (let tweet of tweets) {
      console.log(tweet);
    }

    db.close();
 
  });
});
