const path = require('path');

function checkExtension(filename) {
  const availableExtension = ['.log', '.txt', '.json', '.yaml', '.xml', '.js'];
  const extension = path.extname(filename);
  if (!availableExtension.includes(extension)) throw new Error();
}

module.exports = {
  checkExtension
}