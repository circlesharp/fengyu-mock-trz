import { it, expect, describe } from 'vitest'
import { BooleanMock, NumberMocker, StringMocker } from 'src/basic-mocker'
import { ArrayMocker } from 'src/structure-mocker'
import { ArrayGeneratorParams } from 'src/structure-mocker/Array'

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

describe('test: ArrayMocker', () => {
  const mockersMap = initMockersMap()
  const arrayMocker = new ArrayMocker(mockersMap)

  it('ArrayMocker 能响应一个数组, 有默认的项数, item 信息必填', () => {
    const items: ArrayGeneratorParams['items'] = [
      { value: true },
      { value: false },
    ]
    const rst = arrayMocker.generator({ items })

    expect(Array.isArray(rst)).toBe(true)
    expect(rst.length).toBeGreaterThanOrEqual(5)
    expect(rst.length).toBeLessThanOrEqual(7)

    // 测试边界情况, 有一定概率会失败
    // expect(rst.some(i => i)).toBe(true)
    // expect(rst.some(i => !i)).toBe(true)

    // @ts-expect-error
    expect(() => arrayMocker.generator()).toThrow()
  })

  it('ArrayMocker 能传入一个 mocker', () => {
    const items: ArrayGeneratorParams['items'] = [
      {
        desc: { type: 'boolean' }
      },
    ]
    const rst = arrayMocker.generator({ items, len: [20, 20] })

    expect(Array.isArray(rst)).toBe(true)
    expect(rst.length).toBe(20)

    // 测试边界情况, 有一定概率会失败
    expect(rst.some(i => i)).toBe(true)
    expect(rst.some(i => !i)).toBe(true)
  })

  it('ArrayMocker 能传入更多 mocker', () => {
    const items: ArrayGeneratorParams['items'] = [
      { desc: { type: 'boolean' } },
      { desc: { type: 'number' } },
      { desc: { type: 'string' } },
    ]
    const rst = arrayMocker.generator({ items, len: [30, 30] })

    // 测试边界情况, 有一定概率会失败
    expect(rst.some(i => typeof i === 'boolean')).toBe(true)
    expect(rst.some(i => typeof i === 'number')).toBe(true)
    expect(rst.some(i => typeof i === 'string')).toBe(true)
  })
})
