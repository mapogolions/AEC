#### operation expression

```sh
// 3 + 4 * 2
new Operation(
  new Literal(3),
  ADD,
  new Operation(new Literal(4, MUL, new Literal(2)))
)
```
