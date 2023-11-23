import mongoose from "mongoose";
import '../loadEnv.js'

// const connectionString = "mongodb+srv://nice:1n7prcx5gQHt6IcS@mongopt.auarr0p.mongodb.net/?retryWrites=true&w=majority";
// console.log("Connection string:", connectionString);

const connectToDatabase = async () => {
    try {
      await mongoose.connect("mongodb+srv://nice:1n7prcx5gQHt6IcS@mongopt.auarr0p.mongodb.net",
      /**
       * Gotta add "dbName" to specifically connect to the specific collection
       * or else it wont connect to the collections u want in MongoDB 
       */
       
      { dbName: "sample_restaurants"}); 
      console.log("Connected to MongoDB");
      return mongoose.connection;
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
};

mongoose.set('debug', true);



export default connectToDatabase;