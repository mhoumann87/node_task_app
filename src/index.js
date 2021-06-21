// Import the dependencies
const express = require('express');

// Make sure mongoose.js will run
require('./db/mongoose');

// Get access to our models
const User = require('./models/user');
const Task = require('./models/task');
const { ObjectID } = require('mongodb');

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

//*********************************************
//* Users
//*********************************************

// Create

app.post('/users', async (req, res) => {
  // Create a new instance User
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Read

// Get all
app.get('/users', (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(err => res.status(500).send());
});

// Get one
app.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    })
    .catch(err => res.status(500).send(err));
});

//*********************************************
//* Tasks
//*********************************************

// Create
app.post('/tasks', (req, res) => {
  // Create a new instance of Task
  const task = new Task(req.body);

  task
    .save()
    .then(() => res.status(201).send(task))
    .catch(err => res.status(400).send(err));
});

// Read
app.get('/tasks', (req, res) => {
  Task.find({})
    .then(tasks => res.send(tasks))
    .catch(err => res.status(500).send());
});

app.get('/tasks/:id', (req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      if (!task) {
        return res.status(404).send();
      }
      res.send(task);
    })
    .catch(err => res.status(500).send());
});

// Start the server
app.listen(port, () => console.log(`Server in running on port ${port}`));
