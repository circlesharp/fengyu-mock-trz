import { it, expect, describe } from 'vitest'
import { StringMocker } from 'src/basic-mocker'

const ZH_REGEXP = /[\u4e00-\u9fa5]{1}/
const EN_REGEXP = /[a-zA-Z]{1}/
const JP_REGEXP = /[\u0800-\u4e00]{1}/

describe('test: StringMocker', () => {
    const mocker = new StringMocker()
    it('StringMocker 能随机返回字符串，字符串默认长度为 5~7', () => {
        const result = []
        for (let i = 0; i < 50; i++) {
            const rst = mocker.generator()
            result.push(rst)
        }
        expect(result.every(i => typeof i === 'string')).toBe(true)

        // 测试边界情况, 有一定概率会失败
        expect(result.some(i => i.length === 5)).toBe(true)
        expect(result.some(i => i.length === 6)).toBe(true)
        expect(result.some(i => i.length === 7)).toBe(true)
    })

    it('StringMocker 能指定字符串生成随机字符串', () => {
        const zhChar = mocker.generator({ chartSet: ['zh'] })
        expect(ZH_REGEXP.test(zhChar)).toBe(true)

        const enChar = mocker.generator({ chartSet: ['en'] })
        expect(EN_REGEXP.test(enChar)).toBe(true)
    })

    it('StringMocker 能自定义字符串', () => {
        const rst = mocker.generator({ customString: ['a', 'bbbbb'], len: [50, 50] })
        // 测试边界情况, 有一定概率会失败
        expect(/a/.test(rst)).toBe(true)
        expect(/bb/.test(rst)).toBe(true)

        const rst2 = mocker.generator({ customString: ['abcde'], len: [7, 7] })
        expect(rst2).toBe('abcdeab')

        const rst3 = mocker.generator({ customString: ['hello', 'world'], len: [60, 60] })
        expect(/hello/.test(rst3)).toBe(true)
        expect(/world/.test(rst3)).toBe(true)
    })
})