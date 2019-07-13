'use strict';

const apply = require('./apply');
const { isOperation } = require('./is');

const evaluate = expr => {
  if (isOperation(expr)) {
    const { leftExpr, op, rightExpr } = expr;
    const leftValue = evaluate(leftExpr);
    const rightValue = evaluate(rightExpr);
    return apply(op, leftValue, rightValue);
  }
  return expr;
};

module.exports = evaluate;
