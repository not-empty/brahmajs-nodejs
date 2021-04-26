const statusPlugin = require('./chai-status');
const integerPlugin = require('./chai-integer');
const schemaPlugin = require('./chai-json-schema');

module.exports = [
  statusPlugin,
  integerPlugin,
  schemaPlugin,
];
