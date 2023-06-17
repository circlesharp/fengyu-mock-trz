import { MockType } from 'src/types';
import { it, expect, describe } from 'vitest';
import { Mock } from '../../src/mock/index';

describe('test: Mock', () => {
  it('Mock 添加重复类型能抛出异常', () => {
    const mock = new Mock()
    const fackStringMocker = { typeName: 'string' } as MockType<string>
    expect(() => mock.addMockType(fackStringMocker)).toThrow()
  })

  it('Mock 能生成内置类型', () => {
    const mock = new Mock()
    expect(mock.mock({ type: 'number' })).toBeTypeOf('number')
    expect(mock.mock({ type: 'string' })).toBeTypeOf('string')
    expect(mock.mock({ type: 'boolean' })).toBeTypeOf('boolean')
    expect(mock.mock({ type: 'timestamp' })).toBeTypeOf('number')
    expect(mock.mock({ type: 'date' })).toBeTypeOf('string')
    expect(mock.mock({ type: 'phone' })).toBeTypeOf('string')
    expect(mock.mock({ type: 'PRCIdentity' })).toBeTypeOf('string')
  })

  it('Mock 能生成复杂类型', () => {
    const mock = new Mock()

    const arr = mock.mock({
      type: 'array',
      params: {
        items: [
          { desc: { type: 'boolean' } },
          { desc: { type: 'number' } },
          { desc: { type: 'string' } },
          { desc: { type: 'phone' } },
        ]
      },
    })
    expect(Array.isArray(arr)).toBe(true)

    const obj = mock.mock({
      type: 'object',
      params: {
        properties: {
          a: { desc: { type: 'boolean' } },
          b: { desc: { type: 'number' } },
          c: { desc: { type: 'string' } },
        }
      }
    })
    expect(typeof obj).toBe('object')
  })
})
