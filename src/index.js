// Import the dependencies
const express = require('express');

// Make sure mongoose.js will run
require('./db/mongoose');

// Get access to our models
const User = require('./models/user');
const Task = require('./models/task');

// Get our routers
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

// setup express for the project
const app = express();

// Create a variable for the port
const port = process.env.PORT || 3000;

// Set up the middleware
//***********************************
// Use express to parse json
app.use(express.json());

// Use our routers
app.use(userRouter);
app.use(taskRouter);

// Start the server
app.listen(port, () => console.log(`Server in running on port ${port}`));
