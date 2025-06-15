// models/mongoose.js
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/funny_recipes';

mongoose.connect(MONGO_URI, {
  serverApi: { version: '1', strict: true, deprecationErrors: true }
})
.then(() => console.log(`✅ Connected to MongoDB`))
.catch((err) => console.error('❌ Connection error:', err));

module.exports = mongoose;
