import { merge } from 'lodash-es'
import dayjs from 'dayjs';
import { getRandomFromRange } from 'src/utils';
import { MockType } from 'src/types'

export interface MockTimestampDesc {
    type: 'timestamp',
    params: TimestampGeneratorParams
}

export interface TimestampGeneratorParams {
    range?: Array<number>
    ms?: boolean
}

export class TimestampMocker implements MockType<number> {
    private static DefParams: TimestampGeneratorParams = {
        range: [0, dayjs().valueOf()],
        ms: true,
    }

    public typeName = 'timestamp';
    public generator(params?: TimestampGeneratorParams): number {
        const { range, ms } = merge(TimestampMocker.DefParams, params)
        const _timestamp = getRandomFromRange(range!)
        const timestamp = ms ? _timestamp : dayjs(_timestamp).unix()

        return timestamp
    }
}
