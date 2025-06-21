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

// GET Add Recipe form - must be BEFORE :id route
router.get('/add', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.render('recipes/add', { categories ,title: 'Add Recipe' });
  } catch (err) {
    console.error('Error loading add form:', err);
    req.session.message = { type: 'danger', text: 'Could not load add form.' };
    res.redirect('/recipes');
  }
});

// POST Add Recipe
router.post('/add', async (req, res) => {
  try {
    const { name, author, description, ingredients, instructions, rating, category } = req.body;

    // Validate rating is a number between 1 and 5
    const parsedRating = parseFloat(rating);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      req.session.message = { type: 'danger', text: 'Rating must be a number between 1 and 5.' };
      return res.redirect('/recipes/add');
    }

    // Create and save new recipe
    const newRecipe = new Recipe({
      name,
      author,
      description,
      ingredients,
      instructions,
      rating: parsedRating,
      category
    });

    await newRecipe.save();
    req.session.message = { type: 'success', text: 'Recipe added successfully!' };

    res.redirect(`/recipes/${newRecipe._id}`);
  } catch (err) {
    console.error('❌ Error adding recipe:', err);
    req.session.message = { type: 'danger', text: 'There was an error adding the recipe.' };
    res.redirect('/recipes/add');
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
