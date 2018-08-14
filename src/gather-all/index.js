/* global Promise */

const pathJoin = require('path').join;
const dirname = require('../dirname');
const readFolder = require('../read-folder');
const readFile = require('../read-file');
const metadataParser = require('../metadata-parser');

// containsFile : List String -> Bool -> Promise
const containsFile = files => name => {
  const file = files.find(f => f.toLowerCase() === name.toLowerCase());

  return file
    ? Promise.resolve(file)
    : Promise.reject();
};

// isPath : String -> Promise
const isPath = path =>
  path
    ? Promise.resolve(path)
    : Promise.reject('Error: gatherAll is missing required `path` argument');

// error : String -> Promise
const error = message =>
  Promise.reject(new Error(message));


const gatherAll = path =>
  isPath(path)
    .catch(e => {
      throw e;
    })

    .then(path =>
      metadataParser(path)
        .catch(e =>
          error(`Unable to parse component in path "${path}", reason: ${e}`)
        )
    )

    .then(metadata =>
      Promise.all([
        Promise.resolve(metadata)
      ])
    ).then((metadata) => ({
      ...metadata
    }));

module.exports = gatherAll;
