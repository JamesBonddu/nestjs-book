/**
 * tsconfig.json 配置详解
 */

function fn(n: number) {
  if (n > 5) {
    return true
  } else {
    return false
  }
  // 在 allowUnreachableCode: false 下产生警告，会被现有 eslint fix 掉
  // return true
}

function verfifyAge(age: number) {
  if (age > 18) {
    // 在 allowUnusedLabels: false 下产生警告，会被现有 eslint fix 掉
    // verified: true
  }
}

class Point {
  /**
   * 如果 tsconfig.json 中 strictPropertyInitialization:true，则这里必须初始化值
   * @see https://www.typescriptlang.org/tsconfig#strictPropertyInitialization
   */
  x: number
  y: number
  /**
   * 字面量类型（Literal Type）
   */
  a = 123
  b = true
  c = 'string'

  name: string

  constructor() {
    this.name = 'Jordan'
  }
}

const pt = new Point()
pt.x = 0
pt.y = 0
// ❌ 不能将类型“string”分配给类型“number”。ts(2322)
// pt.a = ''
console.log(pt) // Point { a: 123, b: 'string', x: 0, y: 0 }

interface UserDefaults {
  colorThemeOverride?: 'dark' | 'light'
}
function getUserSettings(this: UserDefaults) {
  this.colorThemeOverride = 'dark'
  // 如 exactOptionalPropertyTypes: true，则不能将 undefined 赋给 colorThemeOverride
  // this.colorThemeOverride = undefined
}

// "noFallthroughCasesInSwitch": false
// const a = 6
// switch (a) {
//   case 0:
//     console.log('even')
//   case 1:
//     console.log('odd')
//     break
// }

// 如 noImplicitAny: false，则这里不产生警告
// ❌ 参数“s”隐式具有“any”类型。ts(7006)
function fn1(s) {
  console.log(s.subr(3))
}
fn1(42)

class Album {
  download() {}
}
class SharedAlbum extends Album {
  // 如 noImplicitOverride: true，则产生警告，即子类不能改写父类方法
  download() {}
  // override 可以确保即使 noImplicitOverride: true 也不会产生警告
  // override download() {}
}

class Rectangle {
  width: number
  height: number

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
  }

  getAreaFunction() {
    return function () {
      // 如开启noImplicitThis: true, 则 ❌  "this" 隐式具有类型 "any"，因为它没有类型注释。ts(2683)
      return this.width * this.height
    }
  }
}

interface GameSettings {
  speed: 'fast' | 'medium' | 'slow'
  quality: 'high' | 'low'
  [key: string]: string
}

const createKeyboard = (modelID: number) => {
  // 如 noUnusedLocals: true, 则 ❌ 已声明“defaultModelID”，但从未读取其值。ts(6133)
  const defaultModelID = 123
}

// 如 noUnusedParameters: true, 则 ❌ 已声明“modelID”，但从未读取其值。ts(6133)
const createDefaultKeyboard = (modelID: number) => {
  const defaultModelID = 23
  return { type: 'keyboard', modelID: defaultModelID }
}

function fn2(x: string) {
  return parseInt(x)
}
const n1 = fn2.call(undefined, '10')
// "strictBindCallApply": true
const n2 = fn2.call(undefined, false)

function fn3(x: string) {
  console.log('hello, ' + x.toLowerCase())
}
type StringOrNumberFunc = (ns: string | number) => void
// "strictFunctionTypes": true
const func: StringOrNumberFunc = fn
// Ultimately an unsafe assignment，but not detected
type Methodish = {
  func(x: string | number): void
}
const m: Methodish = {
  func: fn
}
m.func(10)

declare const loggedInUsername: string
const users = [
  {
    name: 'Oby',
    age: 12
  }
]
const loggedInUser = users.find(u => u.name === loggedInUsername)
// "strictNullChecks": true
console.log(loggedInUser.age)
console.log(loggedInUser?.age)

function useUnknownInCatchVariables() {
  try {
    console.log(123)
    // "useUnknownInCatchVariables": true，自动推断为 unknown 类型
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    }
  }
}

/**
 * declaration: true
 */
// index.ts
// export let helloWorld = 'hi'
// =>
// helloWorld.js
// export let helloWorld = 'hi'
// helloWorld.d.ts
// export declare let helloWorld: string
