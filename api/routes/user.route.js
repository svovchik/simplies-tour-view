const { Router } = require('express');
const userController = require('../controllers/user.controller');

const router = Router();

router
  .route('/auth')
  .post(userController.authenticateUser);

module.exports = router;
