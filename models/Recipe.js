// models/Recipe.js
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: String,
  author: String,
  description: String,
  ingredients: String,
  instructions: String,
  rating: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  image: String  // This will store the filename like "<MongoID>.jpg"
});

module.exports = mongoose.model('Recipe', recipeSchema);
