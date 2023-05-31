import { MockOpts } from "./types";
import dayjs from 'dayjs'

export function getRandomFromRange(range: Array<number | undefined>) {
    const [a, b] = range
    const defaultValue = a ?? b
    if (defaultValue === undefined) throw Error('error: 请传入正确的范围')

    const from = a ?? defaultValue
    const to = b ?? defaultValue
    return Math.floor(Math.random() * (to - from + 1)) + from
}

const defStringMockOpts: MockOpts = {
    type: 'string',
    len: [5, 7],
}
const engStrings = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz'
export function mockString(mockOpts: MockOpts = {}, selectionString = engStrings) {
    const { len } = { ...defStringMockOpts, ...mockOpts }
    const randomLen = getRandomFromRange(len!)

    let rst = ''
    for (let i = 0; i < randomLen; i++) {
        rst += selectionString[getRandomFromRange([0, selectionString.length - 1])]
        debugger
    }

    return rst
}

const defNumberMockOpts: MockOpts = {
    type: 'number',
    len: [5, 7],
}
export function mockNumber(mockOpts: MockOpts = {}) {
  const { len, range } = { ...defNumberMockOpts, ...mockOpts }

  // 如果有范围，直接返回随机值
  if (Array.isArray(range)) return getRandomFromRange(range);

  // 根据位数
  let numStr = mockString({ len }, '0123456789')
  if (numStr.length > 1 && numStr.startsWith('0')) {
      numStr = `${mockString({ len: [1] }, '123456789')}${numStr.slice(1)}`
  }
  return Number(numStr)
}

const defBooleanMockOpts: MockOpts = {
  type: 'boolean',
  formatter: (i: number) => !!i,
}
export function mockBoolean(mockOpts: MockOpts = {}): boolean | any {
  const { formatter } = { ...defBooleanMockOpts, ...mockOpts }

  if (typeof formatter !== 'function') throw Error('error: 请传入回调函数作为 formatter')

  return formatter(mockNumber({ range: [0, 1] }))
}

const defDateMockOpts: MockOpts = {
  type: 'date',
  len: [10],
  format: undefined,
}
export function mockDate(mockOpts: MockOpts = {}) {
  const { format, len } = { ...defDateMockOpts, ...mockOpts }

  const date = dayjs()

  if (format !== undefined) {
      if (typeof format !== 'string')
          throw Error('error: 请传入字符串作为 format')

      return date.format(format)
  }

  if (len) {
      if (typeof (len[0]) !== 'number' || ![10, 13].includes(len[0]))
          throw Error('error: 请传入正确的 len')

      const isUnix10 = len[0] === 10
      return isUnix10 ? date.unix() : date.valueOf()
  }

  return date.valueOf()
}

const ID_LENGTH = 18
const defIdentityMockOpts: MockOpts = {
    type: 'identity',
    startsWith: '440682'
}
export function mockIdentity(mockOpts: MockOpts = {}) {
    const { startsWith = '' } = { ...defIdentityMockOpts, ...mockOpts }

    if (typeof startsWith !== 'string')
        throw Error('error: 请传入正确的 startsWith')

    const restLen = ID_LENGTH - startsWith?.length ?? 0
    const identity = `${startsWith}${mockNumber({ len: [restLen] })}`

    return identity
}
const PHONE_LENGTH = 11
const defPhoneMockOpts: MockOpts = {
    type: 'phone',
    startsWith: '135'
}
export function mockPhone(mockOpts: MockOpts = {}) {
    const { startsWith = '' } = { ...defPhoneMockOpts, ...mockOpts }

    if (typeof startsWith !== 'string')
        throw Error('error: 请传入正确的 startsWith')

    const restLen = PHONE_LENGTH - startsWith?.length ?? 0
    const phone = `${startsWith}${mockNumber({ len: [restLen] })}`

    return phone
}