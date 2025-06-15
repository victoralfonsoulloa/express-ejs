//include Express
const express = require('express');

//includes .env file for credentials
require('dotenv').config();
 
//manages database connectivity
require('./models/mongoose');


//server will listen on this port
const port = 3000;

//create instance of Express app
const app = express();

// ejs is templating engine
app.set('view engine','ejs');

//this will allow us to serve up static files, CSS, images & JS
app.use(express.static('public'));

// reference test json file of users
var data = require('./test.json');

//Create server, deal with requests/responses
const recipeRoutes = require('./routes/recipes');
app.use('/recipes', recipeRoutes);


//index/home URL
app.get('/',(req,res)=>{
  let title = "Home Page";
  res.render("pages/index", {"title": title});

});

//index/about URL
app.get('/about',(req,res)=>{
  let title = "About Page";
  res.render("pages/about", {"title": title});

});

//index/users URL
app.get('/users',(req,res)=>{
  let title = "Users Page";
  res.render("users/index", {
    "title": title,
    "users": data
  });

});

//add user/view route - we are cheating by using the array index - 1
app.get('/users/view/:id', function(req, res) {
 var title = 'User Page';
 var id = req.params.id;
 res.render('users/view', {
     title: title,
     user: data[--id]
 });
});



//Set server to listen for requests
app.listen(port, () => {
  console.log(data);
  console.log(`Server running at port: ${port}`);
});

