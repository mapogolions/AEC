'use strict';

const apply = require('../src/apply');
const { Literal } = require('../src/expressions');
const { ADD, SUB, MUL, DIV } = require('../src/operations');

test('Should return the sum of two numbers', () => {
  const [a, b] = [new Literal(-1), new Literal(-2)];
  expect(apply(ADD, a, b)).toEqual(new Literal(-3));
});

test('Should return the product of two numbers', () => {
  const [a, b] = [new Literal(10), new Literal(2)];
  expect(apply(MUL, a, b)).toEqual(new Literal(20));
});

test('Should return the quotient of two numbers', () => {
  const [a, b] = [new Literal(10), new Literal(2)];
  expect(apply(DIV, a, b)).toEqual(new Literal(5));
});

test('Should return the difference of two numbers', () => {
  const [a, b] = [new Literal(5), new Literal(-1)];
  expect(apply(SUB, a, b)).toEqual(new Literal(6));
});
