#### let-in expression

```sh
// let x = 10 in let y = 20 in x * y
new Let(
  'x',
  new Literal(10),
  new Let(
    'y',
    new Literal(20),
    new Operation(new Var('x'), MUL, new Var('y'))
  )
)
```
