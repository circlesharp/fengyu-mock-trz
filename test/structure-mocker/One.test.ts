import { it, expect, describe } from 'vitest'
import { BooleanMock, NumberMocker, StringMocker } from 'src/basic-mocker'
import { OneMocker } from 'src/structure-mocker'
import { OneGeneratorParams } from 'src/structure-mocker/One'

function initMockersMap() {
  const booleanMocker = new BooleanMock()
  const numberMocker = new NumberMocker()
  const stringMocker = new StringMocker()
  const mockersMap = {
    [booleanMocker.typeName]: booleanMocker,
    [numberMocker.typeName]: numberMocker,
    [stringMocker.typeName]: stringMocker,
  }

  return mockersMap;
}

describe('test: OneMocker', () => {
  const mockersMap = initMockersMap()
  const oneMocker = new OneMocker(mockersMap)

  it('OneMocker 能响应一个数组, 有默认的项数, item 信息必填', () => {
    const items: OneGeneratorParams['items'] = [
      { value: true },
      { value: false },
    ]
    const rst = oneMocker.generator({ items })

    expect(rst).toBeTypeOf('boolean')

    // @ts-expect-error
    expect(() => arrayMocker.generator()).toThrow()
  })

  it('OneMocker 能传入一个 mocker', () => {
    const items: OneGeneratorParams['items'] = [
      {
        desc: { type: 'boolean' }
      },
    ]
    const rst = []
    for (let i = 0; i < 20; i++) {
      rst.push(oneMocker.generator({ items }))
    }

    expect(rst.every(i => typeof i === 'boolean')).toBe(true)

    // 测试边界情况, 有一定概率会失败
    expect(rst.some(i => i)).toBe(true)
    expect(rst.some(i => !i)).toBe(true)
  })

  it('OneMocker 能传入更多 mocker', () => {
    const items: OneGeneratorParams['items'] = [
      { desc: { type: 'boolean' } },
      { desc: { type: 'number' } },
      { desc: { type: 'string' } },
    ]

    const rst = []
    for (let i = 0; i < 20; i++) {
      rst.push(oneMocker.generator({ items }))
    }

    // 测试边界情况, 有一定概率会失败
    expect(rst.some(i => typeof i === 'boolean')).toBe(true)
    expect(rst.some(i => typeof i === 'number')).toBe(true)
    expect(rst.some(i => typeof i === 'string')).toBe(true)
  })
})
