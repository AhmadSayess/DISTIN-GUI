const mongoose = require("mongoose")

 // Connect to the MongoDB cluster
 const conncetDB = async ()=>{

     const mongoAtlasUri = process.env.MONGO_DB;
     try {
         mongoose.connect(
           mongoAtlasUri,
           { useNewUrlParser: true, useUnifiedTopology: true },
           () => console.log("Mongoose is connected"),
         );
       } catch (e) {
         console.log("could not connect");
       }

       const dbConnection = mongoose.connection;
       dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
       dbConnection.once("open", () => console.log("Connected to DB!"));
 }

 module.exports = conncetDB