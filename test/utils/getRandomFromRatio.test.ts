import { it, expect, describe } from 'vitest';
import { getRandomFromRatio, ratioOption } from 'src/utils/getRandomFromRatio'

describe('test: getRandomFromRatio', () => {
  it('getRandomFromRatio 应该能随机返回传入数组的随机一项', () => {
    const options: ratioOption[] = [
      { value: 1, ratio: 1 },
      { value: 2, ratio: 2 },
    ]
    const result = []
    const REPEAT = 20
    for (let i = 0; i < REPEAT; i++) {
      const rst = getRandomFromRatio(options)
      result.push(rst.value)
    }

    // 期望每次都有结果
    expect(result.filter(i => i != null).length).toBe(REPEAT)

    // 期望每种情况都有一定概率出现，有一定概率会失败
    expect(result.reduce((t, c) => t + Number(c === 1), 0)).toBeGreaterThan(0)
    expect(result.reduce((t, c) => t + Number(c === 2), 0)).toBeGreaterThan(0)
  });
})
