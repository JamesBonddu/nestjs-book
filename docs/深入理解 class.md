## 深入理解 Class

#### 需要明白的几个问题

1. 弄清楚 `class` 的固有特征，包括属性、方法、继承、实例及其各自的访问控制
2. `class` 出现的原因及其演进历程
3. `JavaScript` 和 `TypeScript` 中 Class 的异同
4. [tsconfig.json]() 中和 `class` 有关的选项
5. [TypeScript]() 和 [Babel]()、[Webpack]() 在实际项目工程中的关系
6. 如何证明你说的是对的

基础语法

```ts
class 类名 {
  属性: 类型
  constructor(参数: 类型) {
    this.属性 = 参数
  }

  方法() {}
}
```

#### TypeScript 中如何阐述 class

1. Class Members
2. Fields
3. readonly
4. Constructor
5. Methods
6. Getters / Setters
7. Index Signatures
8. Class Heitage
9. implements Clauses
10. extends Clauses
11. Member Visibility
12. public
13. protected
14. private
15. Static Members
16. Special Static Classes
17. Generic Classes
18. Type Parameters in Static Members
19. this at Runtime in Classes
20. Arrow Functions
21. this parameters
22. this Types
23. this-based type guards
24. Parameter Properties
25. Class Expressions
26. abstract Classes and Members
27. Abstract Construct Signatures
28. Relationships Between Classes
