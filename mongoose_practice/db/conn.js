import mongoose from "mongoose";
import '../loadEnv.js'

const connectionString = process.env.ATLAS_URI;
console.log("Connection string:", connectionString);

const connectToDatabase = async () => {
    try {
      await mongoose.connect(connectionString,
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