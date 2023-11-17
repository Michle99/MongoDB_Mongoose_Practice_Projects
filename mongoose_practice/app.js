import express from "express";
import cors from "cors";
import './loadEnv.js'
import restaurants from './routes/restaurants.js';
import connectToDatabase from "./db/conn.js";


const PORT = process.env.PORT || 5050;
const app = express();

connectToDatabase();

app.use(cors());
app.use(express.json());

app.use('/restaurants', restaurants);

// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).send("Uh oh! An unexpected error occured.");
});
  
// start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});
  