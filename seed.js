require('dotenv').config();
const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

const recipes = [
  {
    name: 'Green Eggs and Ham',
    author: 'Dr. Seuss',
    description: 'A classic dish from a classic book',
    ingredients: 'Eggs, Ham, Food coloring',
    instructions: 'Cook the eggs and ham. Add green food coloring for fun!',
    rating: 5.0,
    category: 'Breakfast'
  },
  {
    name: 'Spaghetti Ice Cream',
    author: 'Chef Playful',
    description: 'Sweet and cold spaghetti-inspired ice cream',
    ingredients: 'Vanilla ice cream, Strawberry sauce, White chocolate shavings, Gummy worms',
    instructions: 'Scoop vanilla ice cream, drizzle with strawberry sauce, sprinkle with white chocolate shavings, and top with gummy worms.',
    rating: 4.5,
    category: 'Dessert'
  },
  // Add remaining recipes here...
];

async function seedData() {
  try {
    await client.connect();
    const db = client.db('funnyrecipes');
    const collection = db.collection('recipes');

    await collection.deleteMany({});
    console.log('🔄 Existing recipes cleared.');

    await collection.insertMany(recipes);
    console.log('✅ Recipes inserted successfully.');
  } catch (err) {
    console.error('❌ Error seeding data:', err);
  } finally {
    await client.close();
  }
}

seedData();
