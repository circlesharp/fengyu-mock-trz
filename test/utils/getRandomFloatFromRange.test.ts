import { it, expect, describe } from 'vitest';
import { getRandomFloatFromRange } from 'src/utils/getRandomFloatFromRange'

describe('test: getRandomFloatFromRange', () => {
  const from = 5
  const to = 8

  it('getRandomFloatFromRange 应该满足范围', () => {
      const range = [from, to];

      const result = []
      for (let i = 0; i < 20; i++) {
          const rst = getRandomFloatFromRange(range)
          result.push(rst)
      }

      // 测试边界情况, 有一定概率会失败
      // expect(result.some(i => i === from)).toBe(true)
      // expect(result.some(i => i === to)).toBe(true)

      expect(result.some(i => i > to)).toBe(false)
      expect(result.some(i => i < from)).toBe(false)

      expect(getRandomFloatFromRange([from, from])).toBe(from)
  });

  it('getRandomFloatFromRange 应该能补充缺省值', () => {
      expect(getRandomFloatFromRange([from, undefined])).toBe(from)
      expect(getRandomFloatFromRange([undefined, to])).toBe(to)
      expect(() => getRandomFloatFromRange([])).toThrow()
  })

  it('getRandomFloatFromRange 应该能支持0', () => {
      expect(getRandomFloatFromRange([0])).toBe(0)
  })
})
