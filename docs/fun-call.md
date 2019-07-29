#### function call

```sh
// (fun x -> x) (3 + 2)
new FunCall(
  new Fun('x', new Var('x')),
  new Operation(new Literal(3), ADD, new Literal(2))
)
```
