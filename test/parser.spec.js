'use strict';

const { parseVariable } = require('../src/parser');
const { Var } = require('../src/expressions');

describe('Should parse variable expression', () => {
  test('Should return short named variable expression and empty tail', () => {
    const { token, tail } = parseVariable('x');
    expect(token).toEqual(new Var('x'));
    expect(tail).toBe('');
  });

  test('Should return long named variable expression and empty tail', () => {
    const { token, tail } = parseVariable('name');
    expect(token).toEqual(new Var('name'));
    expect(tail).toBe('');
  });

  test('Should return null and empty string when source is empty', () => {
    const { token, tail } = parseVariable('');
    expect(token).toBe(null);
    expect(tail).toBe('');
  });

  test('Should return named variable expression and non empty tail', () => {
    const { token, tail } = parseVariable('counter some tail');
    expect(token).toEqual(new Var('counter'));
    expect(tail).toBe(' some tail');
  });

  test('Should return null when source starts with digit', () => {
    const source = '1name';
    const { token, tail } = parseVariable(source);
    expect(token).toBe(null);
    expect(tail).toBe(source);
  });

  test('Should return null when source does not start with an alphabetic', () => {
    const testCases = [' x', '\tname', '_y'];
    testCases.forEach(source => {
      const { token, tail } = parseVariable(source);
      expect(token).toBe(null);
      expect(tail).toBe(source);
    });
  });

  test('Should return null when variable does not end with no space or tab', () => {
    const testCases = ['count1', 'y_', 'y?'];
    testCases.forEach(source => {
      const { token, tail } = parseVariable(source);
      expect(token).toEqual(null);
      expect(tail).toBe(source);
    });
  });
});
