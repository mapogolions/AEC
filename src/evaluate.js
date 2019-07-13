'use strict';

const apply = require('./apply');
const { Let, Var, Literal, Operation } = require('./expressions');

const evaluate = expr => {
  if (expr instanceof Operation) {
    const { value: a } = evaluate(expr.leftExpr);
    const { value: b } = evaluate(expr.rightExpr);
    const result = apply(expr.op, a, b);
    return new Literal(result);
  }
  return expr;
};

module.exports = evaluate;
