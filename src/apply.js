'use strict';

const { Literal } = require('./expressions');
const { ADD, SUB, MUL, DIV } = require('./operations');

const apply = (op, a, b) => {
  switch (op) {
    case ADD:
      return new Literal(a + b);
    case SUB:
      return new Literal(a - b);
    case MUL:
      return new Literal(a * b);
    case DIV:
      return new Literal(a / b);
    default:
      throw new Error('Undefined operation');
  }
};

module.exports = apply;
