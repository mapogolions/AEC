'use strict';

const isValue = require('../src/isValue');
const { Literal, Var, Let, Operation } = require('../src/expressions');

test('Should return true when the expression is an int literal', () => {
  const expr = new Literal(10);
  expect(isValue(expr)).toBe(true);
});

test('Should return true when the expression is a string literal', () => {
  const expr = new Literal('foo');
  expect(isValue(expr)).toBe(true);
});

test('Should return true when the expression is a logic literal', () => {
  const expr = new Literal(false);
  expect(isValue(expr)).toBe(true);
});

test('Should return false when the expression is a variable', () => {
  const expr = new Var('x');
  expect(isValue(expr)).toBe(false);
});

test('Should return false when the expression is an operation', () => {
  const expr = new Operation('expr', 'operation', 'expr');
  expect(isValue(expr)).toBe(false);
});

test('Should return false when the expression is a let', () => {
  const expr = new Let('x', 'expr', 'expr');
  expect(isValue(expr)).toBe(false);
});
