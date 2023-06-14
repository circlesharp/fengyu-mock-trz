import { merge } from 'lodash-es'
import { StringMocker } from "src/basic-mocker"
import { MockType } from 'src/types'
import { getRandomIntFromRange } from 'src/utils'

export interface MockPhoneDesc {
    type: 'phone'
    params: PhoneGeneratorParams
}

export interface PhoneGeneratorParams {
    len?: Array<number>
    prefix?: string
}

export class PhoneMocker implements MockType<string> {
    private static DefParams: PhoneGeneratorParams = {
        len: [11, 11],
        prefix: '136'
    }

    public typeName = 'phone';
    public generator(params?: PhoneGeneratorParams): string {
        const { len, prefix } = merge({}, PhoneMocker.DefParams, params)
        const phoneLen = getRandomIntFromRange(len!)
        const restLen = phoneLen - prefix!.length
        const stringMocker = new StringMocker()
        const phone = prefix + stringMocker.generator({ len: [restLen, restLen], chartSet: ['num'] })

        return phone
    }
}

