const fs = require('fs/promises');
const { constants } = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const { archivesPath, toursPath } = require('../../server.config');

async function createWorkingFolders() {
  try {
    await fs.access(archivesPath, constants.R_OK | constants.W_OK);
  } catch (error) {
    fs.mkdir(archivesPath, { recursive: true });
  }
  try {
    await fs.access(toursPath, constants.R_OK | constants.W_OK);
  } catch (error) {
    fs.mkdir(toursPath, { recursive: true });
  }
}

createWorkingFolders();

async function moveFolder(source, destination) {
  const rootPath = await findRoot(source);

  await copyDir(rootPath, destination);
  await fs.rm(source, { maxRetries: 5, recursive: true, retryDelay: 50 });
}

async function findRoot(source) {
  const entries = await fs.readdir(source, { withFileTypes: true });
  let root;

  for (const entry of entries) {
    if (!entry.isDirectory() && entry.name.toLowerCase() === 'index.html') {
      const index = path.join(source, entry.name);
      root = path.dirname(index);
    }
  }

  if (!root) {
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const rootPath = await findRoot(path.join(source, entry.name));
        if (rootPath) {
          root = rootPath;
        }
      }
    }
  }

  return root;
}

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function unzipFile(source) {
  const zip = new AdmZip(source);

  const zipEntries = zip.getEntries();

  let indexFilePath;
  zipEntries.forEach(entry => {
    if (entry.name.toLowerCase() === 'index.html') {
      indexFilePath = entry.entryName;
    }
  });

  if (!indexFilePath) {
    throw new Error('index.hml not found');
  }

  const tmpName = path
    .basename(source, path.extname(source))
    .toLowerCase()
    .split(' ')
    .join('_');

  const destination = path.join(path.dirname(source), tmpName);

  zip.extractAllTo(destination, true);
  await fs.rm(source, {
    force: true,
    recursive: true
  });

  return destination;
}

async function saveJson(filepath, object) {
  const jsonString = JSON.stringify(object, null, 2);
  await fs.writeFile(filepath,jsonString,'utf-8');
}

async function removePorject(source) {
  await fs.rm(source, {
    force: true,
    recursive: true
  });
}

module.exports = { unzipFile, moveFolder, saveJson, removePorject };
