import { merge } from 'lodash-es'
import { getRandomFloatFromRange, getRandomIntFromRange } from 'src/utils'
import { MockType } from 'src/types'


export interface MockNumberDesc {
    type: 'number'
    params?: NumberGeneratorParams
}

export interface NumberGeneratorParams {
    range?: Array<number>
    precision?: Array<number>
}

export class NumberMocker implements MockType<number> {
    private static DefParams: NumberGeneratorParams = {
        range: [0, 10000],
        precision: [0, 0],
    }

    public typeName = 'number';

    public generator(params?: NumberGeneratorParams): number {
        const { range, precision } = merge({}, NumberMocker.DefParams, params)
        const prec = getRandomIntFromRange(precision!)
        const rst = getRandomFloatFromRange(range!, prec)

        return rst
    }

    public setEmptyRule() {
        // todo
    }

    public setConstraint() {
        // todo
    }
}
