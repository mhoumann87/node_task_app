// Get our dependencies
const express = require('express');
// Get the User model
const User = require('../models/user');

const router = new express.Router();

// Import auth middleware
const auth = require('../middleware/auth');

// Our routes

// Create

router.post('/users', async (req, res) => {
  // Create a new instance User
  const user = new User(req.body);

  try {
    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (err) {
    res.status(400).send();
  }
});

// Read

// Get all
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send();
  }
});

// Get one
router.get('/users/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(500).send();
  }
});

// Update
router.patch('/users/:id', async (req, res) => {
  // Check to see if updates are in our User object
  const allowedUpdates = ['name', 'age', 'email', 'password'];
  const updates = Object.keys(req.body);

  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' });
  }

  const _id = req.params.id;

  try {
    //! This way make it possible to hash the password

    // Find the user
    const user = await User.findById(_id);

    // iterate over all the updates
    updates.forEach(update => (user[update] = req.body[update]));

    // Save the user
    await user.save();

    //* This way to update the user skips middleware and out password hashing
    // const user = await User.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete
router.delete('/users/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(_id);

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
