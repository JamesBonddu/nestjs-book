## Pipe

基本结构

- [Joi](https://joi.dev/api/?v=17.4.2)

### 内置管道

1. `DefaultValuePipe`
2. `ParseArrayPipe`
3. `ParseBoolPipe`
4. `ParseEnumPipe`
5. `ParseFloatPipe`
6. `ParseIntPipe`
7. `ParseUUIDPipe`
8. `ValidationPipe`

> pipe-transform.interface.d.ts

```ts
export interface ArgumentMetadata {
  /**
   * Indicates whether argument is a body, query, param, or custom parameter
   */
  readonly type: Paramtype
  /**
   * Underlying base type (e.g., `String`) of the parameter, based on the type
   * definition in the route handler.
   */
  readonly metatype?: Type<any> | undefined
  /**
   * String passed as an argument to the decorator.
   * Example: `@Body('userId')` would yield `userId`
   */
  readonly data?: string | undefined
}
```
