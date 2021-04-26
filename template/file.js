const fs = require('fs')

function getFiles(location) {
    let results = [];
    const list = fs.readdirSync(location);
    list.forEach(file => {
        file = location + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            // Recurse into a subdirectory
            results = results.concat(getFiles(file));
        } else {
            // Is a file 
            if (getFileExt(file) === 'json') {
                results.push(file);
            }
        }
    });
    return results;
}
module.exports.getFiles = getFiles;

function getFileName(file) {
    return file.split(/(\\|\/)/g).pop();
}
function getFileExt(file) {
    return file.split(".").pop();
}


module.exports.readJson = (file) => {

    try {

        const jsonStr = fs.readFileSync(file, { encoding: 'utf8' });

        const jsonObj = JSON.parse(jsonStr);

        return jsonObj;

    } catch (err) {
        throw new Error('Error parsing JSON string: ' + jsonString)
    }

};