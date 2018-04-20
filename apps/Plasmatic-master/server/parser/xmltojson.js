const util = require('util');
const espiParser = require('espi-parser');
var fs = require('fs'); //Node.js File System Module
const exampleXml = `
`;
const json = espiParser(exampleXml);
fs.writeFile('./data.json', JSON.stringify(json, null, 2) , 'utf-8');
console.log(util.inspect(json, { depth: Infinity }));