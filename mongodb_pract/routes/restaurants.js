import express from 'express';
// import  db  from '../db/conn.js';
import connectToDatabase from '../db/conn.js';
import { ObjectId } from 'mongodb';

const router = express.Router();


/*********************************************/
//              GET ALL RESTAURANTS
/*********************************************/
router.get('/', async (req, res) => {
    try {
       const db = await connectToDatabase();
       let collection = db.collection("restaurants");
       console.log("Restaurants collection:", collection);
       let results = await collection.find({}).limit(5).toArray();
       res.send(results).status(200);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).send("Internal Server Error");
    }
});

/*********************************************/
//              GET ALL LATEST RESTAURANTS
/*********************************************/
router.get("/latest", async (req, res) => {
    const db = await connectToDatabase();
    let collection = db.collection("restaurants");
    let results = await collection
      .aggregate([
        { $project: { borough: 1, cuisine: 1, grades: 1, date: 1 } },
        { $sort: { date: -1 } },
        { $limit: 3 },
      ])
      .toArray();
    res.send(results).status(200);
});


/*********************************************/
//              GET RESTAURANT BY ID
/*********************************************/
router.get('/:id', async (req, res) => {
    const db = await connectToDatabase();
    let collection = db.collection("restaurants");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
})


/*********************************************/
//              POST NEW RESTAURANT 
/*********************************************/
router.post('/', async (req, res) => {
    const db = await connectToDatabase();
    let collection = db.collection("restaurants");
    let newRestaurant = req.body;
    newRestaurant.date = new Date();
    let result = await collection.insertOne(newRestaurant);
    res.send(result).status(204);
})


/*********************************************/
//              UPDATE RESTAURANT BY ID
/*********************************************/
router.put("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
        $set: { cuisine: req.body.cuisine },
        $currentDate: { lastModified: true }
        };
        const db = await connectToDatabase();
        let collection = db.collection("restaurants");
        let result = await collection.updateOne(query, updates);
    
        res.send(result).status(200);
    } catch (error) {
        console.error("Error updating restaurant data:", error);
        res.status(500).send("Internal Server Error");
    }
});


/*********************************************/
//              DELETE RESTAURANT BY ID
/*********************************************/
router.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };

    const db = await connectToDatabase();
    const collection = db.collection("restaurants");
    let result = await collection.deleteOne(query);
  
    res.send(result).status(200);
});


export default router;