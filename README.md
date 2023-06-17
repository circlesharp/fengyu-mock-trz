# FENGYU-MOCK

## 简介

一个 mock 工具库，能够提供：数值、字符串、布尔值、时间戳、日期、数值、对象、电话、身份证等数据。

类型可区分为：基本类型、结构类型、addons 类型。基本类型即 js 中的可序列化的非对象类型；结构类型包括：对象、数组、one(随机挑一个)；addons 类型为拓展类型，支持用户拓展。

## 使用方法

### Mock类初始化

支持设置约束条件

```ts
const mock = new Mock({
  maxObjDepth: 3,
  maxStrLength: 10,
}); // 初始化，可以自定义性能约束
```

支持设置空规则

```ts
const mock = new Mock({
  empty: {
    allow: true,
    string: ['-'],
    number: [0, NaN, undefined],
    array: [[], null, undefined],
    object: [{}, null, undefined],
  },
}); // 初始化，可以自定义空值
```

### mock 数值

> 支持设置数值精度，支持设置数值范围

```ts
mock.number({ precision: [2, 2] }); // 233.33
mock.number({ precision: [2, 4] }); // 1.22, 1.222, 1.2222
```

```ts
mock.number({ range: [2, 2] }); // 2
mock.number({ range: [2, 4] }); // 2, 3, 4
```

### mock 字符串

> 支持设置字符串长度，支持指定字符集，支持设置自定义字符

```ts
mock.string({ len: [2, 4] }); // 'aa', 'aaa', 'aaaa'
mock.string({ chartset: ['zh', 'en'] }); // '你好world'
mock.string({ customString: ['hello', 'world'] }) // 'hellowo'
```

### mock 布尔值

> 随机生成布尔值

```ts
mock.boolean(); // true, false
```

### mock 时间戳

> 随机生成时间戳，支持指定毫秒、秒，支持设置范围

```ts
mock.timestamp(); // 1685785399
mock.timestamp({ ms: true }); // 1685785399096
mock.timestamp({ range: ['1999', '2023'] }) // 1685785399096
```

### mock 时间日期

> 随机日期、时间字符串，支持自定义格式，支持设置范围

```ts
mock.date({ format: 'MM-DD' }); // 03-14
mock.data({ format: 'HH:mm' }); // 23:33
mock.data({ { range: ['1999', '2023'] } }); // 2023/06/15
```

### mock 数组

> 随机生成数组，支持设置长度防伪，支持指定元素类型，支持指定出现概率

```ts
const strDesc: MockItemDesc = {
  type: 'string',
  params: { len: [1, 2] }
}
const strDesc: MockItemDesc = {
  type: 'number',
  params: { precision: 2 }
}

mock.array({
  len: [2, 2],
  items: [
    {
      desc: strDesc,
      percent: 40,
    },
    item2: {
      desc: numDesc,
      percent: 60,
    }
  ],
}) // ['a', 2.33]

mock.array({
  len: [2, 2],
  items: [strDesc, numDesc]
}) // 'a', 2.33
```

### mock 随机

> 随机生成一个结果, 支持传入各种类型或特定值, 支持设置概率

```ts
mock.one({
  items: [{ value: true }, { value: 2333 }]
}); // true 或 2333

mock.one({
  items: [
    {desc: { type: 'boolean' }, ratio: 80},
    { value: 2333, ratio: 20 },
  ],
}); // true 或 2333
```

### mock 对象

> 生成一个对象, 支持指定对象结构

```ts
const objDesc: MockItemDesc = {
  type: 'object',
  params: {},
  properties: {
    a: strDesc,
    b: strDesc,
  },
};
mock.object(objDesc); // { a: 'a', b: 2.33 }
```

### general mock

```ts
mock.mock(strDesc); // 'a'
mock.mock(); // { a: 'a', b: 2.33 }
```

## 拓展性

> addons 类型为拓展类型，支持用户拓展。

自定义 addons 类型

``` ts
import { merge } from 'lodash-es'
import { StringMocker } from "src/basic-mocker"
import { MockType } from 'src/types'

export interface MockPRCIdentityDesc {
    type: 'PRCIdentity'
    params?: PRCIdentityGeneratorParams
}

export interface PRCIdentityGeneratorParams {
    prefix?: string
}

export class PRCIdentityMocker implements MockType<string> {
    private static IdLength = 18
    private static DefParams: PRCIdentityGeneratorParams = {
        prefix: '440682'
    }

    public typeName = 'PRCIdentity';
    private stringMocker!: StringMocker

    constructor() {
        this.stringMocker = new StringMocker()
    }

    public generator(params?: PRCIdentityGeneratorParams): string {
        const { prefix } = merge({}, PRCIdentityMocker.DefParams, params)
        if (typeof prefix !== 'string')
            throw Error('类型错误: 请传入字符串')

        const restLen = PRCIdentityMocker.IdLength - prefix.length ?? 0
        const restStr = this.stringMocker.generator({
            len: [restLen, restLen],
            chartSet: ['num']
        })

        const identity = `${prefix}${restStr}`

        return identity
    }
}
```

注册 addons 类型

``` ts
const mock = new Mock()
const idMocker = new PRCIdentityMocker()
mock.addMockType(idMocker)
```
