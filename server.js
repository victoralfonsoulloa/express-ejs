//include Express
const express = require('express');

//server will listen on this port
const port = 3000;

//create instance of Express app
const app = express();

// ejs is templating engine
app.set('view engine','ejs');

//this will allow us to serve up static files, CSS, images & JS
app.use(express.static('public'));


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


//Set server to listen for requests
app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});

