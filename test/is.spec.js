'use strict';

const { Literal, Var, Let, Operation } = require('../src/expressions');
const { isLiteral, isVariable, isLetIn, isOperation } = require('../src/is');

test('Should check the type of the expression', () => {
  expect(isLiteral(new Literal(10))).toBe(true);
  expect(isVariable(new Var('x'))).toBe(true);
  expect(isLetIn(new Let('x', 'expr', 'expr'))).toBe(true);
  expect(isOperation(new Operation('expr', 'op', 'expr'))).toBe(true);
});
