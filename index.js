const chai = require('chai');
const request = require('./request')
const template = require('./template')
const plugins = require('./assertions')

var exports = module.exports = {};

exports.request = request;

exports.template = template;

exports.chai = chai;

for (let k in plugins) {
    exports.chai.use(plugins[k])
}
