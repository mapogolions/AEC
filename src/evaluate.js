'use strict';

const apply = require('./apply');
const { isVariable, isOperation } = require('./is');

const evaluate = expr => {
  if (isOperation(expr)) {
    const { leftExpr, op, rightExpr } = expr;
    const leftValue = evaluate(leftExpr);
    const rightValue = evaluate(rightExpr);
    return apply(op, leftValue, rightValue);
  }
  if (isVariable(expr)) {
    throw new Error('Unboud variable');
  }
  return expr;
};

module.exports = evaluate;
