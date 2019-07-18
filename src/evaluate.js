'use strict';

const apply = require('./apply');
const substitute = require('./substitute');
const { Fun, FunCall } = require('./expressions');
const { isLetIn, isVariable, isOperation, isFun, isFunCall } = require('./is');

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
    return evaluate(new FunCall(new Fun(name, bodyExpr), headExpr));
  }
  if (isFunCall(expr)) {
    const { funExpr, argExpr } = expr;
    const fn = evaluate(funExpr);
    if (!isFun(fn)) throw new TypeError();
    const { param, bodyExpr } = fn;
    const value = evaluate(argExpr);
    return evaluate(substitute(value, param, bodyExpr));
  }
  return expr;
};

module.exports = evaluate;
