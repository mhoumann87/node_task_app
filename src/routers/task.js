// Get our dependencies
const express = require('express');
// Get our task model
const Task = require('../models/task');

// Create our router
const router = new express.Router();

// Our routes

// Create
router.post('/tasks', async (req, res) => {
  // Create a new instance of Task
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Read
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (err) {
    res.status(500).send();
  }
});

router.get('/tasks/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findById(_id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
});

// Update
router.patch('/tasks/:id', async (req, res) => {
  // Check to see if updates are in out Task object
  const allowedUpdates = ['description', 'completed'];
  const updates = Object.keys(req.body);

  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'invalid updates' });
  }

  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);

    updates.forEach(update => (task[update] = req.body[update]));

    await task.save();

    if (!task) {
      res.status(404).send();
    }

    res.send(task);
  } catch (err) {
    req.status(400).send(err);
  }
});

// Delete
router.delete('/tasks/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findByIdAndDelete(_id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
});

// Export our router
module.exports = router;
