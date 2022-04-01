const fs = require('fs').promises;
const path = require('path');

async function createFile(filename, content) {
  const filePath = path.join(__dirname, '..', 'public', filename);
  await fs.writeFile(filePath, content);
}

async function getFiles() {
  const publicPath = path.join(__dirname, '..', 'public');
  return await fs.readdir(publicPath);
}

async function getFile(filename) {
  const filePath = path.join(__dirname, '..', 'public', filename);
  return fs.readFile(filePath, 'utf-8');
}

module.exports = {
  createFile,
  getFiles,
  getFile
}