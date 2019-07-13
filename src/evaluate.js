'use strict';

const apply = require('./apply');
const { Let, Var, Literal, Operation } = require('./expressions');

const evaluate = expr => {
  if (expr instanceof Operation) {
    const { value: a } = evaluate(expr.leftExpr);
    const { value: b } = evaluate(expr.rightExpr);
    return apply(expr.op, a, b);
  }
  return expr;
};

module.exports = evaluate;
