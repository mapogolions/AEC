'use strict';

const { ADD, SUB, MUL } = require('../src/operations');
const { Var, Literal, Operation } = require('../src/expressions');
const substitute = require('../src/substitute');

test('Should nothing replace', () => {
  // let x = 10 in 11
  const name = 'x';
  const value = new Literal(10);
  const expr = new Literal(11);
  const result = substitute(value, name, expr);
  expect(result).toEqual(new Literal(11));
});

test('Should replace variable with a value when its name matches', () => {
  // let x = 10 in x
  const name = 'x';
  const value = new Literal(10);
  const expr = new Var(name);
  const result = substitute(value, name, expr);
  expect(result).toEqual(new Literal(10));
});

test('Should return varible when its name does not matches', () => {
  // let x = 10 in y
  const [name, another] = ['x', 'y'];
  const value = new Literal(10);
  const expr = new Var(another);
  expect(substitute(value, name, expr)).toEqual(expr);
});

test('Should replace variable in operation expression', () => {
  const testCases = [
    {
      // let x = 2 in x + 1
      name: 'x',
      value: new Literal(2),
      freeValue: new Literal(1),

      get expr() {
        const { name, freeValue } = this;
        return new Operation(new Var(name), ADD, freeValue);
      },

      get expected() {
        const { value, freeValue } = this;
        return new Operation(value, ADD, freeValue);
      },
    },
    {
      // let x = -2 in 10 - x
      name: 'y',
      value: new Literal(-2),
      freeValue: new Literal(10),

      get expr() {
        const { name, freeValue } = this;
        return new Operation(freeValue, SUB, new Var(name));
      },

      get expected() {
        const { value, freeValue } = this;
        return new Operation(freeValue, SUB, value);
      },
    },
    {
      // let x = 10 in x * x
      name: 'x',
      value: new Literal(10),

      get expr() {
        const { name } = this;
        return new Operation(new Var(name), MUL, new Var(name));
      },

      get expected() {
        const { value } = this;
        return new Operation(value, MUL, value);
      },
    },
    {
      // let x = 10 in (x - (-2)) + x
      name: 'x',
      value: new Literal(10),
      freeValue: new Literal(-2),

      get expr() {
        const { name, freeValue } = this;
        return new Operation(
          new Operation(new Var(name), SUB, freeValue),
          ADD,
          new Var(name),
        );
      },

      get expected() {
        const { value, freeValue } = this;
        return new Operation(new Operation(value, SUB, freeValue), ADD, value);
      },
    },
  ];

  testCases.forEach(({ value, name, expr, expected }) => {
    const result = substitute(value, name, expr);
    expect(result).toEqual(expected);
  });
});
