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

class Lambda extends Expression {
  constructor(parameter, expr) {
    super();
    this.parameter = parameter;
    this.expr = expr;
  }
}

module.exports = { Expression, Literal, Var, Operation, Let, Lambda };
