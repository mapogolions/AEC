'use strict';

const apply = require('./apply');
const substitute = require('./substitute');
const { isLetIn, isVariable, isOperation } = require('./is');

const evaluate = expr => {
  if (isOperation(expr)) {
    const { leftExpr, op, rightExpr } = expr;
    const leftValue = evaluate(leftExpr);
    const rightValue = evaluate(rightExpr);
    return apply(op, leftValue, rightValue);
  }
  if (isVariable(expr)) {
    throw new Error('Unbound variable');
  }
  if (isLetIn(expr)) {
    const { name, headExpr, bodyExpr } = expr;
    const headValue = evaluate(headExpr);
    return evaluate(substitute(headValue, name, bodyExpr));
  }
  return expr;
};

module.exports = evaluate;
