import { MockOpts } from 'src/types';
import { it, expect, describe } from 'vitest';
import { getRandomIntFromRange, mockString, mockNumber, mockBoolean, mockDate, mockIdentity, mockPhone } from '../src/utils';

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

describe('test: mockString', () => {
    it('mockString 应该为字符串类型', () => {
        const mockOpts: MockOpts = {
            len: [5, 8]
        }
        const str = mockString(mockOpts)

        expect(typeof str).toBe('string')
        expect(/[a-zA-Z]{5}/.test(str)).toBe(true) // 不少于 5
        expect(/[a-zA-Z]{9}/.test(str)).toBe(false) // 不大于 9
    })
})

describe('test: mockNumber', () => {
    it('mockNumber 应该为数值类型', () => {
        const mockOpts: MockOpts = {
            len: [5]
        }
        const num = mockNumber(mockOpts)
        expect(typeof num).toBe('number')
    })

    it('mockNumber 支持传入范围 range', () => {
        const num = mockNumber({
            range: [1]
        })
        expect(num).toBe(1)

        const num2 = mockNumber({
            range: [3, 10],
            len: []
        })
        expect(num2).toBeGreaterThanOrEqual(3)
        expect(num2).toBeLessThanOrEqual(10)
    })

    it('mockNumber 支持传入长度 len', () => {
        const len1Rst = []
        for (let i = 0; i < 20; i++) {
            const rst = mockNumber({ len: [1] })
            len1Rst.push(rst)
        }
        expect(len1Rst.every(i => i < 10 && i >= 0)).toBe(true)

        const len4To8Rst = []
        for (let i = 0; i < 20; i++) {
            const rst = mockNumber({ len: [4, 8] })
            len4To8Rst.push(rst)
        }
        expect(len4To8Rst.every(i => i < Math.pow(10, 8) && i >= Math.pow(10, 3))).toBe(true)
    })
})

describe('test: mockBoolean', () => {
    it('mockBoolean 能随机返回 true, false', () => {
        const result = []
        for (let i = 0; i < 50; i++) {
            const rst = mockBoolean()
            result.push(rst)
        }
        expect(result.some(i => i)).toBe(true)
        expect(result.some(i => !i)).toBe(true)
    })

    it('mockBoolean 能支持 formatter', () => {
        const result = []
        for (let i = 0; i < 50; i++) {
            const rst = mockBoolean({ formatter: (i: boolean) => i ? 'yes' : 'no' })
            result.push(rst)
        }
        expect(result.some(i => i === 'yes')).toBe(true)
        expect(result.some(i => i === 'no')).toBe(true)
    })
})

describe('test: mockDate', () => {
    it('mockDate 能支持 len', () => {
        const timestamp1 = mockDate()
        expect(typeof timestamp1).toBe('number')
        expect(String(timestamp1).length).toBe(10)

        const timestamp2 = mockDate({ len: [10] })
        expect(typeof timestamp2).toBe('number')
        expect(String(timestamp2).length).toBe(10)


        const timestamp3 = mockDate({ len: [13] })
        expect(typeof timestamp3).toBe('number')
        expect(String(timestamp3).length).toBe(13)

        expect(() => mockDate({ len: [] })).toThrow()
        expect(() => mockDate({ len: [2] })).toThrow()
    })

    it('mockDate 能支持 format, 且优先级较高', () => {
        const date = mockDate({ format: 'YYYY/MM/DD', len: [] }) as string
        expect(typeof date).toBe('string')
        expect(/202\w\/\w{2}\/\w{2}/.test(date)).toBe(true)

        const time = mockDate({ format: 'HH:mm' }) as string
        expect(typeof time).toBe('string')
        expect(/\w{2}:\w{2}/.test(time)).toBe(true)
    })
})

describe('test: mockIdentity', () => {
    const defPrefix = '440682'
    const ID_LENGTH = 18

    it('mockIdentity 能工作, 能指定前缀', () => {
        const id1 = mockIdentity()
        expect(typeof id1).toBe('string')
        expect(id1.startsWith(defPrefix)).toBe(true)
        expect(id1.length).toBe(ID_LENGTH)

        const id2 = mockIdentity({ startsWith: '123' })
        expect(typeof id2).toBe('string')
        expect(id2.startsWith('123')).toBe(true)
        expect(id2.length).toBe(ID_LENGTH)
    })
})

describe('test: mockPhone', () => {
    const defPrefix = '135'
    const PHONE_LENGTH = 11

    it('mockPhone 能工作, 能指定前缀', () => {
        const phone1 = mockPhone()
        expect(typeof phone1).toBe('string')
        expect(phone1.startsWith(defPrefix)).toBe(true)
        expect(phone1.length).toBe(PHONE_LENGTH)

        const phone2 = mockPhone({ startsWith: '13600' })
        expect(typeof phone2).toBe('string')
        expect(phone2.startsWith('13600')).toBe(true)
        expect(phone2.length).toBe(PHONE_LENGTH)
    })
})
