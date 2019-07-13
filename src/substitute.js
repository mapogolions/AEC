'use strict';

const { Var, Operation } = require('./expressions');
const isValue = require('./isValue');

// value -> variable -> expr -> expr
const substitute = (value, name, expr) => {
  if (isValue(expr)) return expr;
  if (expr instanceof Var) {
    if (expr.name !== name) throw new Error('Different names');
    return value;
  }
  if (expr instanceof Operation) {
    const { leftExpr, op, rightExpr } = expr;
    const newLeftExpr = substitute(value, name, leftExpr);
    const newRightExpr = substitute(value, name, rightExpr);
    return new Operation(newLeftExpr, op, newRightExpr);
  }
  return undefined;
};

module.exports = substitute;
