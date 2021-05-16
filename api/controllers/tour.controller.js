const path = require('path');
const tourModel = require('../models/tour.model');

exports.uploadTour = async (req, res) => {
  const tour = {
    name: req.params.id,
    preview: ''
  };
  
  const archivePath = req.file.path;
  await tourModel.unzipTour(archivePath, tour.name);
  tourModel.addTour(tour);

  res.status(201).send(tour);
};

exports.fetchProjects = async (req, res) => {
  res.send({ projects: tourModel.getTours() });
};
