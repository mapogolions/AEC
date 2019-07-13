'use strict';

const apply = require('./apply');
const { Let, Var, Literal, Operation } = require('./expressions');

const evaluate = expr => {
  if (expr instanceof Operation) {
    const { leftExpr, op, rightExpr } = expr;
    const leftValue = evaluate(leftExpr);
    const rightValue = evaluate(rightExpr);
    return apply(op, leftValue, rightValue);
  }
  return expr;
};

module.exports = evaluate;
