'use strict';

class Expression {}

class Literal extends Expression {
  constructor(value) {
    super();
    this.value = value;
  }
}

class Var extends Expression {
  constructor(identifier) {
    super();
    this.identifier = identifier;
  }
}

class Operation extends Expression {
  constructor(leftExpr, op, rightExpr) {
    super();
    this.leftExpr = leftExpr;
    this.op = op;
    this.rightExpr = rightExpr;
  }
}

class Let extends Expression {
  constructor(identifier, headExpr, bodyExpr) {
    super();
    this.identifier = identifier;
    this.headExpr = headExpr;
    this.bodyExpr = bodyExpr;
  }
}

module.exports = { Expression, Literal, Var, Operation, Let };
