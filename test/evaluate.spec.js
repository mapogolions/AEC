'use strict';

const { Var, Let, Literal, Operation } = require('../src/expressions');
const { ADD, SUB, MUL, DIV } = require('../src/operations');
const evaluate = require('../src/evaluate');

test('Should return the same value when expression is a literal', () => {
  const expr = new Literal(10);
  expect(evaluate(expr)).toEqual(expr);
});

test('Should return the reduced literal when operation doing over literals', () => {
  const testCases = [
    {
      left: new Literal(-10),
      right: new Literal(2),
      op: ADD,
      expected: new Literal(-8),
    },
    {
      left: new Literal(-1),
      right: new Literal(5),
      op: MUL,
      expected: new Literal(-5),
    },
    {
      left: new Literal(10),
      right: new Literal(-2),
      op: SUB,
      expected: new Literal(12),
    },
    {
      left: new Literal(6),
      right: new Literal(2),
      op: DIV,
      expected: new Literal(3),
    },
  ];
  testCases.forEach(({ left, right, op, expected }) => {
    const expr = new Operation(left, op, right);
    expect(evaluate(expr)).toEqual(expected);
  });
});
