import { it, expect, describe } from 'vitest'
import { NumberMocker } from 'src/basic-mocker'

describe('test: NumberMocker', () => {
  const mocker = new NumberMocker()

  it('NumberMocker 能生成随机数', () => {
    const num = mocker.generator()
    expect(num).toBeTypeOf('number')
  })

  it('NumberMocker 支持传入范围', () => {
    const PEAK = 100
    const rst = []
    for (let i = 0; i < 50; i++) {
      const num = mocker.generator({ range: [ -PEAK, PEAK ] })
      rst.push(num)
    }

    expect(rst.every(i => i >= -PEAK && i <= PEAK)).toBe(true)
  })

  it('NumberMocker 支持指定小数点位数', () => {
    const REGEXP = /\d+.?\d{1,4}/
    const rst = []
    for (let i = 0; i < 50; i++) {
      const num = mocker.generator({ precision: [4, 4] })
      rst.push(num)
    }
    expect(rst.map(String).every(i => REGEXP.test(i))).toBe(true)
  })
})
