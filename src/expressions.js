'use strict';

class Expression {}

class Literal extends Expression {
  constructor(value) {
    super();
    this.value = value;
  }
}

class Var extends Expression {
  constructor(name) {
    super();
    this.name = name;
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
  constructor(name, headExpr, bodyExpr) {
    super();
    this.name = name;
    this.headExpr = headExpr;
    this.bodyExpr = bodyExpr;
  }
}

class Fun extends Expression {
  constructor(param, expr) {
    super();
    this.param = param;
    this.expr = expr;
  }
}

module.exports = { Expression, Literal, Var, Operation, Let, Fun };
