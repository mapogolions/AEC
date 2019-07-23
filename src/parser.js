'use strict';

const Parsimmon = require('parsimmon');

const parser = Parsimmon.digits;

console.log(parser.parse('-10'));

