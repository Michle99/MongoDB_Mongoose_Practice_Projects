import express from 'express';
import db from '../db/conn.js'
import Restaurant from '../models/restaurant.model.js';

const router = express.Router();


// GET all restaurants
router.get('/', async (_req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        res.status(500).send("Internal Server Error");
    }
});




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




export default router;