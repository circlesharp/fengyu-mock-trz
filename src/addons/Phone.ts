import { merge } from 'lodash-es'
import { StringMocker } from "src/basic-mocker"
import { MockType } from 'src/types'

export interface MockPhoneDesc {
    type: 'phone'
    params: PhoneGeneratorParams
}

export interface PhoneGeneratorParams {
    len: Array<number>
}

export class PhoneMocker implements MockType<string> {
    private static PhoneChartSet = ('123456789').split('')
    private static DefParams: PhoneGeneratorParams = {
        len: [11, 11]
    }

    public typeName = 'phone';
    public generator(params?: PhoneGeneratorParams): string {
        const { len } = merge({}, PhoneMocker.DefParams, params)
        const stringMocker = new StringMocker()
        const phone = stringMocker.generator({ len, customCharSet: PhoneMocker.PhoneChartSet })

        return phone
    }
}

