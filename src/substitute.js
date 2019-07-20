'use strict';

const { Let, Operation, FunCall } = require('./expressions');
const {
  isLiteral,
  isOperation,
  isVariable,
  isLetIn,
  isFunCall,
} = require('./is');

const substitute = (value, name, expr) => {
  if (isLiteral(expr)) return expr;
  if (isVariable(expr) && expr.name === name) {
    return value;
  }
  if (isOperation(expr)) {
    const { leftExpr, op, rightExpr } = expr;
    return new Operation(
      substitute(value, name, leftExpr),
      op,
      substitute(value, name, rightExpr),
    );
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
  if (isFunCall(expr)) {
    const { funExpr, argExpr } = expr;
    return new FunCall(
      substitute(value, name, funExpr),
      substitute(value, name, argExpr),
    );
  }
  return expr;
};

module.exports = substitute;
