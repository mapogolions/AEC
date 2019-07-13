'use strict';

const { ADD, SUB, MUL } = require('../src/operations');
const { Var, Literal, Operation } = require('../src/expressions');
const substitute = require('../src/substitute');

test('Should nothing to replace', () => {
  // let x = 10 in 11
  const name = 'x';
  const value = new Literal(10);
  const expr = new Literal(11);
  const result = substitute(value, name, expr);
  expect(result).toEqual(new Literal(11));
});

test('Should replace the variable with the same name', () => {
  // let x = 10 in x
  const name = 'x';
  const value = new Literal(10);
  const expr = new Var(name);
  const result = substitute(value, name, expr);
  expect(result).toEqual(new Literal(10));
});

test('Should throw an error when variables have different names', () => {
  // let x = 10 in y
  const [name, another] = ['x', 'y'];
  const value = new Literal(10);
  const expr = new Var(another);
  expect(() => substitute(value, name, expr)).toThrowError(Error);
});

test('Should repalce the variable in the operation expression', () => {
  const testCases = [
    {
      // let x = 2 in x + 1
      name: 'x',
      bindedValue: new Literal(2),
      freeValue: new Literal(1),
      get expr() {
        const { name, freeValue } = this;
        return new Operation(new Var(name), ADD, freeValue);
      },
      get expected() {
        const { bindedValue, freeValue } = this;
        return new Operation(bindedValue, ADD, freeValue);
      },
    },
    {
      // let x = -2 in 10 - x
      name: 'y',
      bindedValue: new Literal(-2),
      freeValue: new Literal(10),
      get expr() {
        const { name, freeValue } = this;
        return new Operation(freeValue, SUB, new Var(name));
      },
      get expected() {
        const { bindedValue, freeValue } = this;
        return new Operation(freeValue, SUB, bindedValue);
      },
    },
    {
      // let x = 10 in x * x
      name: 'x',
      bindedValue: new Literal(10),
      get expr() {
        const { name } = this;
        return new Operation(new Var(name), MUL, new Var(name));
      },
      get expected() {
        const { bindedValue } = this;
        return new Operation(bindedValue, MUL, bindedValue);
      },
    },
    {
      // let z = 10 in (z - (-2)) + z
      name: 'z',
      bindedValue: new Literal(10),
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
        const { bindedValue, freeValue } = this;
        return new Operation(
          new Operation(bindedValue, SUB, freeValue),
          ADD,
          bindedValue,
        );
      },
    },
  ];
  testCases.forEach(({ bindedValue, name, expr, expected }) => {
    const result = substitute(bindedValue, name, expr);
    expect(result).toEqual(expected);
  });
});
