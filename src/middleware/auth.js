const jwt = require('jsonwebtoken');

// Get the secret for jwt
const jwtSecret = require('../../jwtSecret');

const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '').trim();
    console.log(token);
    const decoded = jwt.verify(token, 'test');

    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Please Log In', msg: err });
  }
};

module.exports = auth;
