import { it, expect, describe } from 'vitest'
import { BooleanMock, NumberMocker, StringMocker } from 'src/basic-mocker'
import { ArrayMocker, ObjectMocker } from 'src/structure-mocker'
import { ObjectGeneratorParams } from 'src/structure-mocker/Object'
import { MockItemDesc, MockType } from 'src/types'

function initMockersMap() {
  const booleanMocker = new BooleanMock()
  const numberMocker = new NumberMocker()
  const stringMocker = new StringMocker()
  const mockersMap: Partial<Record<MockItemDesc['type'], MockType<any>>> = {
    [booleanMocker.typeName]: booleanMocker,
    [numberMocker.typeName]: numberMocker,
    [stringMocker.typeName]: stringMocker,
  }

  const arrayMocker = new ArrayMocker(mockersMap)
  mockersMap[(arrayMocker.typeName as MockItemDesc['type'])] = arrayMocker

  const objectMocker = new ObjectMocker(mockersMap)
  mockersMap[(objectMocker.typeName as MockItemDesc['type'])] = objectMocker

  return mockersMap;
}

describe('test: ObjectMocker', () => {
  const mockersMap = initMockersMap()
  const mocker = mockersMap['object'] as ObjectMocker

  it('ObjectMocker 能生成值简单对象', () => {
    const properties: ObjectGeneratorParams['properties'] = {
      a: { value: 1 },
      b: { desc: { type: 'boolean' } },
      c: { desc: { type: 'number' } },
      d: { desc: { type: 'string' } },
    }
    const rst = mocker.generator({ properties })

    expect(rst.a).toBe(1)
    expect(rst.b).toBeTypeOf('boolean')
    expect(rst.c).toBeTypeOf('number')
    expect(rst.d).toBeTypeOf('string')
  })

  it('ObjectMocker 能生成嵌套对象', () => {
    const properties: ObjectGeneratorParams['properties'] = {
      a: { value: 1 },
      b: {
        desc: {
          type: 'object',
          params: {
            properties: {
              c: { value: 2 },
              d: {
                desc: {
                  type: 'object',
                  params: {
                    properties: {
                      e: {
                        desc: {
                          type: 'number'
                        }
                      },
                      f: {
                        value: 'f'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    const rst = mocker.generator({ properties })
    expect(rst.a).toBe(1)
    expect(rst.b).toBeTypeOf('object')
    expect(rst.b.c).toBe(2)
    expect(rst.b.d).toBeTypeOf('object')
    expect(rst.b.d.e).toBeTypeOf('number')
    expect(rst.b.d.f).toBe('f')
  })
})
