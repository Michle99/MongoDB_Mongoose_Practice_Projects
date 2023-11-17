// models/restaurant.model.js
import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    building: String,
    coord: {
      type: [Number], 
      index: '2dsphere' 
    },
    street: String,
    zipcode: String
});
  
const gradeSchema = new mongoose.Schema({
    date: {
      type: Date,
      default: Date.now
    },
    grade: String,
    score: Number
});
  
const restaurantSchema = new mongoose.Schema({
    address: addressSchema,
    borough: String,
    cuisine: String,
    grades: [gradeSchema],
    name: String,
    restaurant_id: {
      type: String,
      unique: true
    }
});
  
const Restaurant = mongoose.model('restaurants', restaurantSchema, 'restaurants');

export default Restaurant;