import express from 'express';
import db from '../db/conn.js'

const router = express.Router();

// GET a list of 10 posts
router.get('/', async (req, res) => {
  let collection = db.collection("posts");
  console.log("Posts collection:", collection);
  let results = await collection.find({}).limit(10).toArray();

  res.send(results).status(200);
});

export default router;