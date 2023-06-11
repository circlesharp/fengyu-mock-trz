import dayjs from 'dayjs'
import { it, expect, describe } from 'vitest'
import { TimestampMocker } from 'src/basic-mocker'

const TEN_BIT_NUM = 10 ** 10

describe('test: BooleanMock', () => {
  const mocker = new TimestampMocker()
  
  it('TimestampMocker 能生成随机时间', () => {
      const result = []
      for (let i = 0; i < 50; i++) {
          const rst = mocker.generator()
          result.push(rst)
      }
      expect(result.every(i => typeof i === 'number')).toBe(true)
      
      const now = new Date().valueOf()
      expect(result.every(i => i < now)).toBe(true)
      expect(result.every(i => i > 0)).toBe(true)
  })

  it('TimestampMocker 能指定范围', () => {
    const Date_20241201 = dayjs('2024/12/01').valueOf()
    const Date_20241231 = dayjs('2024/12/31').valueOf()

    const date = mocker.generator({ range: [Date_20241201, Date_20241231] })
    expect(dayjs(date).get('year')).toBe(2024)
    expect(dayjs(date).get('month')).toBe(12 - 1)
  })

  it('TimestampMocker 能生成 ms 时间戳', () => {
    const result = []
    for (let i = 0; i < 50; i++) {
        const rst = mocker.generator({ ms: true })
        result.push(rst)
    }

    expect(result.some(i => i > TEN_BIT_NUM)).toBe(true)
  })

  it('TimestampMocker 能生成 s 时间戳', () => {
    const result = []
    for (let i = 0; i < 50; i++) {
        const rst = mocker.generator({ ms: false })
        result.push(rst)
    }

    expect(result.every(i => i < TEN_BIT_NUM)).toBe(true)
  })
})
