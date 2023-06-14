import { merge } from 'lodash-es'
import { MockType } from 'src/types'
import { getRandomCharFromCharset, getRandomFromRatio, getRandomIntFromRange } from 'src/utils'
import { Charset } from 'src/utils/getRandomCharFromCharset'

export interface MockStringDesc {
    type: 'string'
    params?: StringGeneratorParams
}

export interface StringGeneratorParams {
    len?: Array<number>
    chartSet?: Array<Charset>
    customString?: Array<string>
}

export class StringMocker implements MockType<string> {
    private static DefParams: StringGeneratorParams = {
        len: [5, 7],
        chartSet: ['zh'],
        customString: undefined,
    }

    public typeName = 'string';
    public generator(params?: StringGeneratorParams): string {
        const { len, chartSet, customString } = merge({}, StringMocker.DefParams, params)
        const strLength = getRandomIntFromRange(len!)

        if (customString?.length) {
            return this.generateStrFromCustomString(customString, strLength)
        }

        return this.generateStrFromCharset(chartSet!, strLength)
    }

    private generateStrFromCharset(chartSet: Array<Charset>, len: number): string {
        let rst = ''
        for (let i = 0; i < len; i++) {
            rst += getRandomCharFromCharset(chartSet!)
        }

        return rst
    }

    private generateStrFromCustomString(strings: Array<string>, len: number) {
        let rst = ''
        while (rst.length < len) {
            const { value: str } = getRandomFromRatio(strings.map(i => ({ value: i, ratio: 1 })))
            rst += str;
        }

        return rst.slice(0, len)
    }
}
