'use strict';

const { Var, Let, Literal, Operation, Fun } = require('./expressions');

const isLiteral = expr => expr instanceof Literal;
const isVariable = expr => expr instanceof Var;
const isLetIn = expr => expr instanceof Let;
const isOperation = expr => expr instanceof Operation;
const isFun = expr => expr instanceof Fun;

module.exports = { isLiteral, isVariable, isLetIn, isOperation, isFun };
