const userDb = require('../db/users.db.json');


exports.authenticate = user => {
  if (user.username === userDb.username && user.password === userDb.password) {
    return {
      username: userDb.username,
      accessToken: `Bearer ${userDb.accessToken}`
    };
  }
  return null;
};

exports.authorizate = token => {
  if (token === userDb.accessToken) {
    return true;
  }
  return false;
};
