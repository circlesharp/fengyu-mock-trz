import { it, expect, describe } from 'vitest'
import { BooleanMock } from 'src/basic-mocker'

describe('test: BooleanMock', () => {
  const mocker = new BooleanMock()
  it('BooleanMock 能随机返回 true, false', () => {
      const result = []
      for (let i = 0; i < 50; i++) {
          const rst = mocker.generator()
          result.push(rst)
      }
      expect(result.some(i => i)).toBe(true)
      expect(result.some(i => !i)).toBe(true)
  })
})