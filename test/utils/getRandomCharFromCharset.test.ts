import { it, expect, describe } from 'vitest';
import { getRandomCharFromCharset } from 'src/utils/getRandomCharFromCharset'

const ZH_REGEXP = /[\u4e00-\u9fa5]{1}/
const EN_REGEXP = /[a-zA-Z]{1}/
const JP_REGEXP = /[\u0800-\u4e00]{1}/
const NUM_REGEXP = /\d{1}/

describe('test: getRandomCharFromCharset', () => {
    it('getRandomCharFromCharset 只生成单个字符', () => {
        const rst = []
        for (let i = 0; i < 20; i++) {
            rst.push(getRandomCharFromCharset(['zh']))
            rst.push(getRandomCharFromCharset(['en']))
            rst.push(getRandomCharFromCharset(['jp']))
        }
        expect(rst.every(i => i.length === 1)).toBe(true)
        expect(rst.every(i => typeof i === 'string')).toBe(true)
    })

    it('getRandomCharFromCharset 能生成对应语言的字符', () => {
        const zhChar = getRandomCharFromCharset(['zh'])
        expect(ZH_REGEXP.test(zhChar)).toBe(true)

        const enChar = getRandomCharFromCharset(['en'])
        expect(EN_REGEXP.test(enChar)).toBe(true)

        const jpChar = getRandomCharFromCharset(['jp'])
        expect(JP_REGEXP.test(jpChar)).toBe(true)

        const numChar = getRandomCharFromCharset(['num'])
        expect(NUM_REGEXP.test(numChar)).toBe(true)
    })

    it('getRandomCharFromCharset 对不支持的字符集会报错', () => {
        // @ts-expect-error
        expect(() => getRandomCharFromCharset(['a'])).toThrow()

        // @ts-expect-error
        expect(() => getRandomCharFromCharset(['zh', 'a'])).toThrow()
    })

    it('getRandomCharFromCharset 支持传入多个字符集', () => {
        const rst = []
        for (let i = 0; i < 20; i++) {
            rst.push(getRandomCharFromCharset(['zh', 'en', 'jp', 'num']))
        }
        expect(rst.some(i => ZH_REGEXP.test(i))).toBe(true)
        expect(rst.some(i => EN_REGEXP.test(i))).toBe(true)
        expect(rst.some(i => JP_REGEXP.test(i))).toBe(true)
        expect(rst.some(i => NUM_REGEXP.test(i))).toBe(true)
    })
})
