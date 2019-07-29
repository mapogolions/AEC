## Eager evaluation model

[![Build Status](https://travis-ci.org/mapogolions/evaluation-model.svg?branch=master)](https://travis-ci.org/mapogolions/evaluation-model) [![Coverage Status](https://coveralls.io/repos/github/mapogolions/evaluation-model/badge.svg?branch=master)](https://coveralls.io/github/mapogolions/evaluation-model?branch=master)


### call-by-value VS call-by-name

```sh
// call-by-value
let x = 2 + 1 in x * x
reduction(2 + 1) = 3, then substitute
3 * 3
-> 9

// call-by-name
let x = 2 + 1 in x * x
subtitute (2 + 1) into body expression
(2 + 1) * (2 + 1), then reduction
3 * (2 + 1)
3 * 3
-> 9
```

### ast-samples

* [literal expression](./docs/literal.md)
* [operation expression](./docs/operation.md)
* [let-in expression](./docs/let-in.md)
* [function expression](./docs/fun.md)
* [function call](./docs/fun-call.md)
