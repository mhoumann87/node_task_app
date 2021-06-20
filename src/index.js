// Import the dependencies
const express = require('express');

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
  res.send('testing');
});

app.listen(port, () => console.log(`Server in running on port ${port}`));
