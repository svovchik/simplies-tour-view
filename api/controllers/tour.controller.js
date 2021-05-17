const Tour = require('../models/tour.model');

exports.uploadTour = async (req, res) => {
  const name = req.params.id;
  try {
    const archivePath = req.file.path;
    await Tour.unzipTour(archivePath, name);
  } catch (error) {
    console.log(req.headers);
    console.log(req.file);
    console.log(name, ': ', error.message);
    res.status(400).send({ message: error.message });
  }
  res.status(201).send();
};

exports.fetchProjects = async (req, res) => {
  res.send({ projects: Tour.getAll() });
};

exports.fetchOne = (req, res) => {
  const name = req.params.id;
  const tour = Tour.getOne(name);
  if (!tour) {
    res.status(404).send({ message: 'Not found' });
  }
  res.status(200).send(tour);
};

exports.saveOne = (req, res) => {
  const name = req.params.id;
  const { preview, description } = req.body;
  const tour = { name, preview, description };
  Tour.save(tour);
  res.status(200).send();
};

exports.removeOne = async (req, res) => {
  const name = req.params.id;
  try {
    await Tour.remove(name);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send();
  }

  res.status(200).send();
};
