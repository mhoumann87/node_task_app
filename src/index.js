// Import the dependencies
const express = require('express');

// Make sure mongoose.js will run
require('./db/mongoose');

// Get access to our models
const User = require('./models/user');
const Task = require('./models/task');

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
  // Create a new instance User
  const user = new User(req.body);

  user
    .save()
    .then(() => res.status(201).send(user))
    .catch(err => res.status(400).send(err));
});

app.post('/tasks', (req, res) => {
  // Create a new instance of Task
  const task = new Task(req.body);

  task
    .save()
    .then(() => res.status(201).send(task))
    .catch(err => res.status(400).send(err));
});

app.listen(port, () => console.log(`Server in running on port ${port}`));
