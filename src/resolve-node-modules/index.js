/* global Promise */

const readFolder = require('../read-folder');
const path = require('path');
const readJson = require('read-package-json');

const resolveNodeModulesPath = (cwd, modulePath) => {
  const checkPath = path.dirname(cwd);

  return readFolder(checkPath)
    .then(
      files =>
        files.includes('node_modules') ?
          path.join(checkPath, 'node_modules', modulePath) :
          checkPath !== '.' ?
            resolveNodeModulesPath(checkPath, modulePath) :
            Promise.reject(
                'ERROR: Unable to resolve node_modules path in "${modulePath}"'
              )
    )
    .then(modulePath => {
      return new Promise((resolve, reject) => {
       readJson(
          path.join(modulePath, 'package.json'),
          console.error,
          false,
          (err, data) => {
            if (err) {
              resolve(modulePath);
            } else if (data.main) {
              resolve(path.join(modulePath, data.main));
            } else {
              resolve(modulePath);
            }
          }
        );
      });
    });
};

module.exports = resolveNodeModulesPath;
