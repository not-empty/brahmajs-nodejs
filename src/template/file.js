const fs = require('fs');

function getFileExt(file) {
  return file.split('.').pop();
}

function getFiles(location) {
  let results = [];
  const list = fs.readdirSync(location);
  list.forEach((file) => {
    const fileLocation = `${location}/${file}`;
    const stat = fs.statSync(fileLocation);
    const isDirectory = stat && stat.isDirectory();

    if (isDirectory) {
      // Recurse into a subdirectory
      results = results.concat(getFiles(fileLocation));
    }

    // Is a json file
    if (!isDirectory && getFileExt(fileLocation) === 'json') {
      results.push(fileLocation);
    }
  });
  return results;
}
module.exports.getFiles = getFiles;

module.exports.readJson = (file) => {
  let jsonStr = '';

  try {
    jsonStr = fs.readFileSync(file, { encoding: 'utf8' });
    const jsonObj = JSON.parse(jsonStr);
    return jsonObj;
  } catch (err) {
    throw new Error(`Error parsing JSON string: ${jsonStr}`);
  }
};
