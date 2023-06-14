import { it, expect, describe } from 'vitest'
import { PhoneMocker } from 'src/addons'

const DEF_PREFIX = '136'

describe('test: PhoneMocker', () => {
    const mocker = new PhoneMocker()
    it('PhoneMocker 能随机返回11位手机号字符串', () => {
        const rst = mocker.generator()
        expect(rst.length).toBe(11)
        expect(rst).toBeTypeOf('string')
        expect(rst.startsWith(DEF_PREFIX)).toBe(true)
    })

    it('PhoneMocker 能设置前缀', () => {
        const prefix = '(+86)135'
        const rst = mocker.generator({ prefix, len: [16, 16] })
        expect(rst.length).toBe(16)
        expect(/\+86/.test(rst)).toBe(true)
        expect(/135/.test(rst)).toBe(true)
    })
})