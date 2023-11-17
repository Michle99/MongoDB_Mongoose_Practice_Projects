import { MongoClient } from "mongodb";
import '../loadEnv.js';

const client = new MongoClient(process.env.MONGODB_URI);

let conn;
try {
  conn = await client.connect();
  console.log("Connected to MongoDB!");
} catch (e) {
  console.error(e);
}

let db = conn.db("sample_training");

export default db;
