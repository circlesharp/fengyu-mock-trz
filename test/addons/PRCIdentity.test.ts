import { it, expect, describe } from 'vitest'
import { PRCIdentityMocker } from 'src/addons'

const DEF_PREFIX = '440682'

describe('test: PRCIdentityMocker', () => {
    const mocker = new PRCIdentityMocker()

    it('PRCIdentityMocker 能随机返回18位身份证号码', () => {
        const rst = mocker.generator()
        expect(rst.length).toBe(18)
        expect(rst).toBeTypeOf('string')
        expect(rst.startsWith(DEF_PREFIX)).toBe(true)
    })

    it('PRCIdentityMocker 能设置身份证前缀', () => {
        const prefix = '123456'
        const rst = mocker.generator({ prefix })
        expect(rst.length).toBe(18)
        expect(/^123456/.test(rst)).toBe(true)
    })
})