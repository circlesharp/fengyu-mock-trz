import { it, expect, describe } from 'vitest';
import { checkMockTypeExist } from 'src/utils/checkMockTypeExist'
import { MockType } from 'src/types'

describe('test: checkMockTypeExist', () => {
  it('根据名称判断是否在对象中', () => {
    const obj = {
      a: 1,
    } as unknown as Record<string, MockType<any>>
    
    expect(checkMockTypeExist(obj, 'a')).toBe(true)
    expect(checkMockTypeExist(obj, 'c')).toBe(false)
  })
})
