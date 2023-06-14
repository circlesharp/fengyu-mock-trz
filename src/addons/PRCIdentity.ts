import { merge } from 'lodash-es'
import { StringMocker } from "src/basic-mocker"
import { MockType } from 'src/types'

export interface MockPRCIdentityDesc {
    type: 'PRCIdentity'
    params: PRCIdentityGeneratorParams
}

export interface PRCIdentityGeneratorParams {
    prefix?: string
}

export class PRCIdentityMocker implements MockType<string> {
    private static IdLength = 18
    private static DefParams: PRCIdentityGeneratorParams = {
        prefix: '440682'
    }

    public typeName = 'PRCIdentity';
    private stringMocker!: StringMocker

    constructor() {
        this.stringMocker = new StringMocker()
    }

    public generator(params?: PRCIdentityGeneratorParams): string {
        const { prefix } = merge({}, PRCIdentityMocker.DefParams, params)
        if (typeof prefix !== 'string')
            throw Error()

        const restLen = PRCIdentityMocker.IdLength - prefix.length ?? 0
        const restStr = this.stringMocker.generator({
            len: [restLen, restLen],
            chartSet: ['num']
        })

        const identity = `${prefix}${restStr}`

        return identity
    }
}
