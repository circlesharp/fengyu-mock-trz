import { merge } from 'lodash-es'
import { MockType } from 'src/types'

export interface MockStringDesc {
    type: 'string'
    params: StringGeneratorParams
}

export interface StringGeneratorParams {
    len: Array<number>
    chartSet?: Array<string>
    customCharSet?: Array<string>
}

export class StringMocker implements MockType<string> {
    private static DefParams: StringGeneratorParams = {
        len: [5, 7],
        chartSet: ['zh'],
        customCharSet: undefined,
    }

    public typeName = 'string';
    public generator(params?: StringGeneratorParams): string {
        const { len, chartSet } = merge(StringMocker.DefParams, params)
        console.log(len, chartSet)

        return '2'
    }
}
