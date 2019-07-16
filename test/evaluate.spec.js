'use strict';

const { Var, Let, Literal, Operation, Lambda } = require('../src/expressions');
const { ADD, SUB, MUL, DIV } = require('../src/operations');
const evaluate = require('../src/evaluate');

test('Should return literal', () => {
  const expr = new Literal(10);
  expect(evaluate(expr)).toEqual(expr);
});

test('Should throw error when expression is unbound variable', () => {
  const expr = new Var('x');
  expect(() => evaluate(expr)).toThrowError(Error);
});

test('Should return reduced literal when operation doing over literals', () => {
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

test('Should evaluate nested operations', () => {
  const testCases = [
    {
      left: new Operation(new Literal(1), ADD, new Literal(2)),
      right: new Literal(2),
      op: ADD,
      expected: new Literal(5),
    },
    {
      left: new Literal(-3),
      right: new Operation(new Literal(2), SUB, new Literal(4)),
      op: MUL,
      expected: new Literal(6),
    },
    {
      left: new Operation(new Literal(9), ADD, new Literal(1)),
      right: new Operation(new Literal(100), DIV, new Literal(50)),
      op: DIV,
      expected: new Literal(5),
    },
    {
      left: new Operation(
        new Literal(2),
        ADD,
        new Operation(new Literal(2), MUL, new Literal(3)), // 6
      ), // 2 + 6 = 8
      right: new Operation(new Literal(1), SUB, new Literal(-1)), // 2
      op: SUB,
      expected: new Literal(6),
    },
  ];

  testCases.forEach(({ left, op, right, expected }) => {
    const expr = new Operation(left, op, right);
    expect(evaluate(expr)).toEqual(expected);
  });
});

test('Should evaluate let-in expression', () => {
  const testCases = [
    {
      /**
       * let x = 12 in x
       * eval(12) = 12, then substitute
       * 12
       * -> 12
       */
      expr: new Let('x', new Literal(12), new Var('x')),
      expected: new Literal(12),
    },
    {
      /**
       * let x = 12 in x * x
       * eval(12) = 12, then substitute
       * 12 * 12
       * -> 144
       */
      expr: new Let(
        'x',
        new Literal(12),
        new Operation(new Var('x'), MUL, new Var('x')),
      ),
      expected: new Literal(144),
    },
    {
      /**
       * let x = 2 + 1 in x * x * x
       * eval(2 + 1) = 3, then substutute
       * 3 * 3 * 3
       * -> 27
       */
      expr: new Let(
        'x',
        new Operation(new Literal(2), ADD, new Literal(1)),
        new Operation(
          new Var('x'),
          MUL,
          new Operation(new Var('x'), MUL, new Var('x')),
        ),
      ),

      expected: new Literal(27),
    },
    {
      /**
       * let x = 2 in let y = x + 1 in x + y
       * eval(2) = 2, then substitute
       * let y = 2 + 1 in 2 + y
       * eval(2 + 1) = 3, then substitute
       * 2 + 3
       * -> 5
       */

      expr: new Let(
        'x',
        new Literal(2),
        new Let(
          'y',
          new Operation(new Var('x'), ADD, new Literal(1)),
          new Operation(new Var('x'), ADD, new Var('y')),
        ),
      ),
      expected: new Literal(5),
    },
    {
      /**
       * let x = 2 + 1 in let y = x * x in let z = y + 2 in let x = z + x in x + y
       * eval(2 + 1) = 3, then substitute
       * let y = 3 * 3 in let z = y + 2 in let x = z + 3 in x + y
       * eval(3 * 3) = 9, then substitute
       * let z = 9 + 2 in let x = z + 3 in x + 9
       * eval(9 + 2) = 11, then substitute
       * let x = 11 + 3 in x + 9
       * eval(11 + 3) = 14, then substitute
       * 14 + 9
       * -> 23
       */
      expr: new Let(
        'x',
        new Operation(new Literal(2), ADD, new Literal(1)),
        new Let(
          'y',
          new Operation(new Var('x'), MUL, new Var('x')),
          new Let(
            'z',
            new Operation(new Var('y'), ADD, new Literal(2)),
            new Let(
              'x',
              new Operation(new Var('z'), ADD, new Var('x')),
              new Operation(new Var('x'), ADD, new Var('y')),
            ),
          ),
        ),
      ),
      expected: new Literal(23),
    },
  ];

  testCases.forEach(({ expr, expected }) => {
    expect(evaluate(expr)).toEqual(expected);
  });
});

test('Should throw error when nested let-in expression has unbound variable', () => {
  const testCases = [
    {
      /**
       * let x = x + 1 in x
       * eval(x + 1) - unbound variable
       */
      expr: new Let(
        'x',
        new Operation(new Var('x'), ADD, new Literal(1)),
        new Var('x'),
      ),
      expectedFailure: Error,
    },
    {
      /**
       * let x = y in x
       * eval(y) - unbound variable
       */
      expr: new Let('x', new Var('y'), new Var('x')),
      expectedFailure: Error,
    },
    {
      /**
       * let x = (let y = 10 + 1 in y * y) in y
       * eval(let y = 10 + 1 in y * y) =
       *      eval(10 + 1) = 11, then substitute
       *      11 * 11
       *      -> 121, then substitute
       * y
       * eval(y) - unbound variable
       */
      expr: new Let(
        'x',
        new Let(
          'y',
          new Operation(new Literal(10), ADD, new Literal(1)),
          new Operation(new Var('y'), MUL, new Var('y')),
        ),
        new Var('y'),
      ),
      expectedFailure: Error,
    },
    {
      /**
       * let x = (let y = x in y) in in x
       * eval(let y = x in y) =
       *      eval(x) - unbound variable
       */
      expr: new Let(
        'x',
        new Let('y', new Var('x'), new Var('y')),
        new Var('x'),
      ),
      expectedFailure: Error,
    },
  ];

  testCases.forEach(({ expr, expectedFailure }) => {
    expect(() => evaluate(expr)).toThrowError(expectedFailure);
  });
});

test('Should handle let-in as head expression of another let-in', () => {
  const testCases = [
    {
      /**
       * let x = (let y = 10 + 1 in y * y) in let z = 21 in x - z
       * eval(let y = 10 + 1 in y * y) =
       *      eval(10 + 1) = 11, then substitute
       *      11 * 11
       *      -> 121, then substitute
       * let z = 21 in 121 - z
       * eval(21) = 21, then substitute
       * 121 - 21
       * -> 100
       */
      expr: new Let(
        'x',
        new Let(
          'y',
          new Operation(new Literal(10), ADD, new Literal(1)),
          new Operation(new Var('y'), MUL, new Var('y')),
        ),
        new Let(
          'z',
          new Literal(21),
          new Operation(new Var('x'), SUB, new Var('z')),
        ),
      ),
      expected: new Literal(100),
    },
  ];

  testCases.forEach(({ expr, expected }) => {
    expect(evaluate(expr)).toEqual(expected);
  });
});

test('Should treat lambda as first class citizen object', () => {
  const fn = new Lambda('x', new Operation(new Var('x'), ADD, new Var('x')));
  expect(evaluate(fn)).toEqual(fn);
});
