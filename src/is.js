'use strict';

const { Var, Let, Literal, Operation } = require('./expressions');

const isLiteral = expr => expr instanceof Literal;
const isVariable = expr => expr instanceof Var;
const isLetIn = expr => expr instanceof Let;
const isOperation = expr => expr instanceof Operation;

module.exports = { isLiteral, isVariable, isLetIn, isOperation };
