const express = require ('express');
const app = express ();
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
let port = process.env.PORT||3000;
require('dotenv/config');

app.use(bodyParser.json());


//import routes
const postsRoute = require ('./routes/posts');
app.use ('/posts', postsRoute);

//routes
app.get('/', (req, res) => {
    res.send ('home page');
});


//connect to database
mongoose.connect( 
  process.env.DB_connect,
{ useNewUrlParser: true, useUnifiedTopology: true  },

()=> console.log ('connected to database')
);

//listen in server
app.listen(3000); 

