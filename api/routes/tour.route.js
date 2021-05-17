const { Router } = require('express');
const multer = require('multer');
const tourController = require('../controllers/tour.controller');
const userController = require('../controllers/user.controller');
const { archivesPath, toursPath } = require('../../server.config');

const router = Router();

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, archivesPath);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('_');
    cb(null, fileName);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/zip' || file.mimetype === 'application/x-zip-compressed') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storageConfig, fileFilter });

router
  .route('/')
  .get(tourController.fetchProjects);

router
  .route('/:id/upload')
  .post(upload.single('filedata'), tourController.uploadTour);

router
  .route('/:id')
  .all(userController.authorizateUser)
  .get(tourController.fetchOne)
  .post(tourController.saveOne)
  .delete(tourController.removeOne);

module.exports = router;
