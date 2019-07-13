'use strict';

const { ADD, SUB, MUL, DIV } = require('./operations');

const apply = (op, a, b) => {
  switch (op) {
    case ADD:
      return a + b;
    case SUB:
      return a - b;
    case MUL:
      return a * b;
    case DIV:
      return a / b;
    default:
      throw new Error('Undefined operation');
  }
};

module.exports = apply;
