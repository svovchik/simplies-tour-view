const path = require('path');
const fileService = require('../services/file.service');
const { dbPath, toursPath } = require('../../server.config');

const projectsDb = require(dbPath);

exports.unzipTour = async (source, tourName) => {
  try {
    const tmpFolder = await fileService.unzipFile(source);
    
    const destination = path.join(toursPath, tourName);
    fileService.moveFolder(tmpFolder, destination);
  } catch (error) {
    console.log(error);
  }
};

exports.getTours = () => {
  return projectsDb;
};

exports.addTour = async (tour) => {
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
