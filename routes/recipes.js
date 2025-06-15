const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const Category = require('../models/Category');

// GET all recipes (index)
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('category').lean();
    res.render('recipes/index', { recipes });
  } catch (err) {
    console.error('Error fetching recipes:', err);
    res.status(500).send('Server Error');
  }
});

// GET single recipe by ID (view)
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('category').lean();
    if (!recipe) return res.status(404).send('Recipe not found');
    res.render('recipes/view', { recipe });
  } catch (err) {
    console.error('Error fetching recipe:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
