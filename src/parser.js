'use strict';

const { Var } = require('./expressions');

const whitespaces = [' ', '\t', '\f', '\n'];
const isAlphabetic = ch => (ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z');

function parseVariable(source) {
  if (source === '' || !isAlphabetic(source[0])) {
    return { token: null, tail: source };
  }
  const iter = pos => {
    if (pos >= source.length) {
      return { token: new Var(source), tail: '' };
    }
    if (!isAlphabetic(source[pos])) {
      return whitespaces.includes(source[pos])
        ? { token: new Var(source.slice(0, pos)), tail: source.slice(pos) }
        : { token: null, tail: source };
    }
    return iter(pos + 1);
  };
  return iter(1);
}

module.exports = { parseVariable };
