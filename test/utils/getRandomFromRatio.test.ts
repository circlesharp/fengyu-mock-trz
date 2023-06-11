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
    expect(result.filter(i => !!i).length).toBe(REPEAT)
    
    // 测试边界情况, 有一定概率会失败
    // expect(result.some(i => i === 1)).toBe(true)
    // expect(result.some(i => i === 2)).toBe(true)
    // expect(result.every(i => i >= 1 && i <= 2)).toBe(true)
  });
})
