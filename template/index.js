
const fs = require('fs')
const { getFiles, readJson } = require('./file')
const proc = require('./process')

var exports = module.exports = {};

exports.run = (location, context) => {

    const files = getFiles(location)

    files.forEach(file => {

        const test = readJson(file);
        proc.runTest(test, context);

    })

};
