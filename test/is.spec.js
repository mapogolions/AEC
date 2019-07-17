'use strict';

const {
  Literal,
  Var,
  Let,
  Operation,
  Fun,
  FunCall,
} = require('../src/expressions');
const {
  isLiteral,
  isVariable,
  isLetIn,
  isOperation,
  isFun,
  isFunCall,
} = require('../src/is');

test('Should check type of expressions', () => {
  expect(isLiteral(new Literal(10))).toBe(true);
  expect(isVariable(new Var('x'))).toBe(true);
  expect(isLetIn(new Let('x', 'expr', 'expr'))).toBe(true);
  expect(isOperation(new Operation('expr', 'op', 'expr'))).toBe(true);
  expect(isFun(new Fun('x', 'expr'))).toBe(true);
  expect(isFunCall(new FunCall('callable', 'argument'))).toBe(true);
});
