import { MongoClient } from "mongodb";


const connectionString = process.env.ATLAS_URI || "";
console.log("Connection string:", connectionString);

const client = new MongoClient(connectionString);

console.log("client string:", client);

let conndb;

try {
    conndb = await client.connect();
} catch (error) {
    console.log("Error connecting to db:", error);
}

let db = conndb.db("sample_training");

console.log("What is db:", db);

export default db;