'use strict';

const { Var, Let, Literal, Operation, Lambda } = require('./expressions');

const isLiteral = expr => expr instanceof Literal;
const isVariable = expr => expr instanceof Var;
const isLetIn = expr => expr instanceof Let;
const isOperation = expr => expr instanceof Operation;
const isLambda = expr => expr instanceof Lambda;

module.exports = { isLiteral, isVariable, isLetIn, isOperation, isLambda };
