const User = require('../models/user.model');

exports.authenticateUser = (req, res) => {
  const { username, password } = req.body;
  const user = { username, password };
  const userData = User.authenticate(user);
  if (!userData) {
    return res.status(403).send({ message: 'User not found.' });
  }
  
  return res.status(200).send(userData);
};

exports.authorizateUser = (req, res, next) => {
  try {
    // console.log(req.headers);
    const token = req.headers['authorization'].split(' ')[1];
    if (!User.authorizate(token)) {
      return res.status(403).send();
    }
  } catch (error) {
    return res.status(401).send();
  }
  next();
};
