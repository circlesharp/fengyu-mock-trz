import { merge } from 'lodash-es'
import { StringMocker } from "src/basic-mocker"
import { MockType } from 'src/types'

export interface MockPRCIdentityDesc {
    type: 'PRCIdentity'
    params: PRCIdentityGeneratorParams
}

export interface PRCIdentityGeneratorParams {
    startsWith?: string
}

export class PRCIdentityMocker implements MockType<string> {
    private static IdLength = 18
    private static IdChartSet = ('0123456789').split('')
    private static DefParams: PRCIdentityGeneratorParams = {
        startsWith: '440682'
    }

    public typeName = 'PRCIdentity';
    private stringMocker!: StringMocker

    constructor() {
        this.stringMocker = new StringMocker()
    }

    public generator(params?: PRCIdentityGeneratorParams): string {
        const { startsWith } = merge(PRCIdentityMocker.DefParams, params)
        if (typeof startsWith !== 'string')
            throw Error()

        const restLen = PRCIdentityMocker.IdLength - startsWith.length ?? 0
        const restStr = this.stringMocker.generator({
            len: [restLen, restLen],
            customCharSet: PRCIdentityMocker.IdChartSet
        })

        const identity = `${startsWith}${restStr}`

        return identity
    }
}
