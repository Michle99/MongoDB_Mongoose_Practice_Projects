import mongoose from "mongoose";
import '../loadEnv.js'

const connectionString = process.env.ATLAS_URI || "";
console.log("Connection string:", connectionString);

mongoose.connect(connectionString);

const db = mongoose.connection;

db.on("error", (error) => {
    console.error("Error connecting to MongoDB:", error);
});
  
db.once("open", () => {
    console.log("Connected to MongoDB");
});


console.log("What is db:", db);

export default db;