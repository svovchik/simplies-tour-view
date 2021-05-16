const { Router } = require('express');
const multer = require('multer');
const tourController = require('../controllers/tour.controller');
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
  if (file.mimetype == 'application/zip') {
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
  .route('/upload/:id')
  .post(upload.single('filedata'), tourController.uploadTour);


module.exports = router;
