/* global Promise */

const readFolder = require('../read-folder');
const path = require('path');

const resolveNodeModulesPath = (cwd, modulePath) => {
  const checkPath = './';
  modulePath = modulePath.replace('semantic-ui-react/es','semantic-ui-react/src');

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
};

module.exports = resolveNodeModulesPath;
