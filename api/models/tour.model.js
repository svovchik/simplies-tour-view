const path = require('path');
const fileService = require('../services/file.service');
const { dbPath, toursPath } = require('../../server.config.js');

let projectsDb = require(dbPath);

exports.unzipTour = async (source, tourName) => {
  try {
    const tmpFolder = await fileService.unzipFile(source);
    
    const destination = path.join(toursPath, tourName);
    fileService.moveFolder(tmpFolder, destination);
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

exports.getAll = () => {
  return projectsDb;
};

exports.getOne = (name) => {
  return projectsDb.find(project => project.name === name);
};

exports.save = async (tour) => {
  let updated = false;
  
  projectsDb.forEach((proj, idx, projects) => {
    if (proj.name === tour.name) {
      projects[idx] = tour;
      updated = true;
    }
  });

  if (!updated) {
    projectsDb.push(tour);
  }

  await fileService.saveJson('./api/db/projects.db.json', projectsDb);
};

exports.remove = async (name) => {
  projectsDb = projectsDb.filter(tour => tour.name !== name);
  await fileService.saveJson('./api/db/projects.db.json', projectsDb);

  const location = path.join(toursPath, name);
  await fileService.removePorject(location);
};
