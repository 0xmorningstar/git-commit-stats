function validatePath(path) {
  const fs = require('fs');
  const pathModule = require('path');

  if (!fs.existsSync(path)) {
    throw new Error(`Path does not exist: ${path}`);
  }

  const gitDir = pathModule.join(path, '.git');
  if (!fs.existsSync(gitDir)) {
    throw new Error(`Not a git repository: ${path}`);
  }

  return true;
}

function parseDate(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date format: ${dateStr}`);
  }
  return date;
}

module.exports = { validatePath, parseDate };