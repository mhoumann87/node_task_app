// Import the dependencies
const express = require('express');

// Make sure mongoose.js will run
require('./db/mongoose');

// Get access to our models
const User = require('./models/user');

// setup express for the project
const app = express();

// Create a variable for the port
const port = process.env.PORT || 3000;

// Set up the middleware
//***********************************
// Use express to parse json
app.use(express.json());

//====================================
// Setting up the routes
//====================================

// Post
app.post('/users', (req, res) => {
  console.log(req.body);

  // Create a new User
  const user = new User(req.body);

  user
    .save()
    .then(() => res.status(201).send(user))
    .catch(err => res.status(400).send(err));
});

app.listen(port, () => console.log(`Server in running on port ${port}`));
