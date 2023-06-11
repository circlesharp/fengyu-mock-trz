import { it, expect, describe } from 'vitest'
import dayjs from 'dayjs'
import { DateMocker } from 'src/basic-mocker'

describe('test: BooleanMock', () => {
  const mocker = new DateMocker()
  
  it('DateMocker 能生成随机时间字符串', () => {
    const REGEXP = /^\d{4}\/\d{2}\/\d{2}$/
    const result = []
      for (let i = 0; i < 50; i++) {
          const rst = mocker.generator()
          result.push(rst)
      }

      expect(result.every(i => typeof i === 'string')).toBe(true)
      expect(result.every(i => REGEXP.test(i))).toBe(true)
  })

  it('DateMocker 能生成符合格式的字符串', () => {
    const FORMAT = 'MM-DD:YYYY'
    const REGEXP = /^\d{2}-\d{2}:\d{4}$/

    const result = []
    for (let i = 0; i < 50; i++) {
        const rst = mocker.generator({ format: FORMAT })
        result.push(rst)
    }
    expect(result.every(i => REGEXP.test(i))).toBe(true)
  })

  it('DateMocker 能指定范围', () => {
    const REGEXP = /^2024\/12\/\d{2}$/
    const Date_20241201 = dayjs('2024/12/01').valueOf()
    const Date_20241231 = dayjs('2024/12/31').valueOf()

    const date = mocker.generator({ range: [Date_20241201, Date_20241231] })
    expect(REGEXP.test(date)).toBe(true)
  })
})
