// Get mongoose in the project
const mongoose = require('mongoose');

// Set up connection variables
const connectionURL = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager-api';

// Connect to the database
mongoose.connect(`${connectionURL}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
