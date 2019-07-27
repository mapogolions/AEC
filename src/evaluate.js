'use strict';

const apply = require('./apply');
const substitute = require('./substitute');
const { Fun, FunCall } = require('./expressions');
const { isLetIn, isVariable, isOperation, isFun, isFunCall } = require('./is');

const evalOperation = expr => {
  const { leftExpr, op, rightExpr } = expr;
  const leftValue = evaluate(leftExpr);
  const rightValue = evaluate(rightExpr);
  return apply(op, leftValue, rightValue);
};

const evalLetIn = expr => {
  const { name, headExpr, bodyExpr } = expr;
  return evaluate(new FunCall(new Fun(name, bodyExpr), headExpr));
};

const evalFunCall = expr => {
  const { funExpr, argExpr } = expr;
  const funValue = evaluate(funExpr);
  if (!isFun(funValue)) throw new TypeError();
  const { param, bodyExpr } = funValue;
  const argValue = evaluate(argExpr);
  return evaluate(substitute(argValue, param, bodyExpr));
};

const evaluate = expr => {
  if (isOperation(expr)) return evalOperation(expr);
  if (isVariable(expr)) throw new Error('Unbound variable');
  if (isLetIn(expr)) return evalLetIn(expr);
  if (isFunCall(expr)) return evalFunCall(expr);
  return expr;
};

module.exports = evaluate;
