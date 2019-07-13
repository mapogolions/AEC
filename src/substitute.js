'use strict';

const { Operation } = require('./expressions');
const { isLiteral, isOperation, isVariable } = require('./is');

const substitute = (value, name, expr) => {
  if (isLiteral(expr)) return expr;
  if (isVariable(expr) && expr.name === name) {
    return value;
  }
  if (isOperation(expr)) {
    const { leftExpr, op, rightExpr } = expr;
    const newLeftExpr = substitute(value, name, leftExpr);
    const newRightExpr = substitute(value, name, rightExpr);
    return new Operation(newLeftExpr, op, newRightExpr);
  }
  return expr;
};

module.exports = substitute;
