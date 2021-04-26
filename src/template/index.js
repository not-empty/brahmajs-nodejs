const f = require('./file');
const proc = require('./process');

module.exports = {};

module.exports.run = (location, context) => {
  const files = f.getFiles(location);

  files.forEach((file) => {
    const test = f.readJson(file);
    proc.runTest(test, context);
  });
};
