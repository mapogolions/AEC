'use strict';

const { Literal } = require('./expressions');

const isValue = expr => expr instanceof Literal;

module.exports = isValue;
