const jwt = require('jsonwebtoken');
const yargs = require('yargs');

const argv = yargs
  .option('key', {
    alias: 'k',
    description: 'The secret key for signing the JWT',
    type: 'string',
    demandOption: true
  })
  .option('payload', {
    alias: 'p',
    description: 'The payload of the JWT in JSON format',
    type: 'string',
    demandOption: true
  })
  .help()
  .alias('help', 'h')
  .argv;

const payload = JSON.parse(argv.payload);
const options = {
  algorithm: 'HS256'
};

const token = jwt.sign(payload, argv.key, options);
console.log(token);
