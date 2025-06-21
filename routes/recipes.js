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

// GET edit form
router.get('/edit/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('category').exec();
    const categories = await Category.find();
    res.render('recipes/edit', { recipe, categories, title: 'Edit Recipe' });
  } catch (err) {
    console.error('Error loading edit form:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Update of edit
router.post('/edit/:id', async (req, res) => {
  const { id } = req.params;

  const updatedData = {
    name: req.body.name,
    author: req.body.author,
    description: req.body.description,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    rating: parseFloat(req.body.rating),
    category: req.body.category
  };

  try {
    await Recipe.updateOne({ _id: id }, updatedData);
    req.session.message = {
      type: 'success',
      text: '✅ Recipe updated successfully!'
    };
    res.redirect(`/recipes/${id}`);
  } catch (err) {
    console.error('Update error:', err);
    req.session.message = {
      type: 'danger',
      text: '❌ Failed to update recipe. Please try again.'
    };
    res.redirect(`/recipes/edit/${id}`);
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
