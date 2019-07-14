'use strict';

const { Let, Operation } = require('./expressions');
const { isLiteral, isOperation, isVariable, isLetIn } = require('./is');

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
  if (isLetIn(expr)) {
    return new Let(
      expr.name,
      substitute(value, name, expr.headExpr),
      // shadow
      expr.name === name
        ? expr.bodyExpr
        : substitute(value, name, expr.bodyExpr),
    );
  }
  return expr;
};

module.exports = substitute;
