import { merge } from 'lodash-es'
import { MockType } from 'src/types'


export interface MockNumberDesc {
    type: 'number'
    params: NumberGeneratorParams
}

export interface NumberGeneratorParams {
    range: Array<number>
    precision: Array<number>
}

export class NumberMocker implements MockType<number> {
    private static DefParams: NumberGeneratorParams = {
        range: [0, 10000],
        precision: [0, 0],
    }

    public typeName = 'number';
    public generator(params?: NumberGeneratorParams): number {
        const { range, precision } = merge(NumberMocker.DefParams, params)
        console.log(range, precision)

        return 2
    }
}