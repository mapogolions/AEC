'use strict';

const apply = require('../src/apply');
const { Literal } = require('../src/expressions');
const { ADD, SUB, MUL, DIV } = require('../src/operations');

test('Should return the sum of two numbers', () => {
  expect(apply(ADD, -1, -2)).toEqual(new Literal(-3));
});

test('Should return the product of two numbers', () => {
  expect(apply(MUL, 10, 2)).toEqual(new Literal(20));
});

test('Should return the quotient of two numbers', () => {
  expect(apply(DIV, 10, 2)).toEqual(new Literal(5));
});

test('Should return the difference of two numbers', () => {
  expect(apply(SUB, 5, -1)).toEqual(new Literal(6));
});
