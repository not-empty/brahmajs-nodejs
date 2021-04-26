const chai = require('chai');
const request = require('./request');
const template = require('./template');
const plugins = require('./assertions');

module.exports = {};

module.exports.request = request;

module.exports.template = template;

module.exports.chai = chai;

plugins.forEach((chaiPlugin) => module.exports.chai.use(chaiPlugin));
