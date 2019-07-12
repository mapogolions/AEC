'use strict';

const Expression = Object.freeze({});

const Literal = value =>
  Object.freeze({
    value,
    __proto__: Expression,
  });

const Var = identifier =>
  Object.freeze({
    identifier,
    __proto__: Expression,
  });

const Operation = (leftExpr, op, rightExpr) =>
  Object.freeze({
    leftExpr,
    op,
    rightExpr,
    __proto__: Expression,
  });

const Let = (identifier, headExpr, bodyExpr) =>
  Object.freeze({
    identifier,
    headExpr,
    bodyExpr,
    __proto__: Expression,
  });

module.exports = { Expression, Literal, Var, Operation, Let };
