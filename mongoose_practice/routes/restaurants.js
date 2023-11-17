import express from 'express';
import Restaurant from '../models/restaurant.model.js';
// import connectToDatabase from '../db/conn.js';
const router = express.Router();


// GET all restaurants
router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        res.status(500).send("Internal Server Error");
    }
    // res.send('Get All Restaurants');
});

// GET restaurant by ID
router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.status(200).json(restaurant);
    } catch (error) {
        console.error("Error fetching restaurant by ID:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Update Restaurant by ID
router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const updates = {
            $set: { cuisine: req.body.cuisine },
            $currentDate: { lastModified: true }
        };

        const result = await Restaurant.updateOne(query, updates);

        res.send(result).status(200);
    } catch (error) {
        console.error("Error updating restaurant data:", error);
        res.status(500).send("Internal Server Error");
    }
});

// POST route to create a new document
router.post('/', async (req, res) => {
    try {
      // Create a new document based on the request body
      const newDocument = new Restaurant(req.body);
  
      // Save the new document to the database
      const savedDocument = await newDocument.save();
  
      res.status(201).json(savedDocument);
    } catch (error) {
      console.error('Error creating a new document:', error);
      res.status(500).send('Internal Server Error');
    }
});

console.log("Find Restaurants:", Restaurant.collection.collectionName);


export default router;