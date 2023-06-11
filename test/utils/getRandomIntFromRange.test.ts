import { it, expect, describe } from 'vitest';
import { getRandomIntFromRange } from 'src/utils/getRandomIntFromRange'

describe('test: getRandomIntFromRange', () => {
  const from = 5
  const to = 8

  it('getRandomIntFromRange 应该满足范围', () => {
      const range = [from, to];

      const result = []
      for (let i = 0; i < 20; i++) {
          const rst = getRandomIntFromRange(range)
          result.push(rst)
      }

      // 测试边界情况, 有一定概率会失败
      // expect(result.some(i => i === from)).toBe(true)
      // expect(result.some(i => i === to)).toBe(true)

      expect(result.some(i => i > to)).toBe(false)
      expect(result.some(i => i < from)).toBe(false)

      expect(getRandomIntFromRange([from, from])).toBe(from)
  });

  it('getRandomIntFromRange 应该能补充缺省值', () => {
      expect(getRandomIntFromRange([from, undefined])).toBe(from)
      expect(getRandomIntFromRange([undefined, to])).toBe(to)
      expect(() => getRandomIntFromRange([])).toThrow()
  })

  it('getRandomIntFromRange 应该能支持0', () => {
      expect(getRandomIntFromRange([0])).toBe(0)

  })
})
