const babylon = require('babylon');

const parse = source =>
  babylon.parse(source, {
    plugins: ['decorators', 'jsx', 'typescript', 'classProperties', 'objectRestSpread', 'exportDefaultFrom'],
    sourceType: 'module'
  });

module.exports = parse;
