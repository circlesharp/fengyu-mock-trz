import { merge } from 'lodash-es'
import dayjs from 'dayjs';
import { getRandomFromRange } from 'src/utils';
import { MockType } from 'src/types'

export interface MockDateDesc {
    type: 'Date'
    params: DateGeneratorParams
}

export interface DateGeneratorParams {
    range?: Array<number>
    format?: string
}

export class DateMocker implements MockType<string> {
    private static DefParams: DateGeneratorParams = {
        range: [0, dayjs().valueOf()],
        format: 'YYYY/MM/DD',
    }

    public typeName = 'date';
    public generator(params?: DateGeneratorParams): string {
        const { range, format } = merge(DateMocker.DefParams, params)
        const timestamp = getRandomFromRange(range!)
        const date = dayjs(timestamp).format(format)

        return date
    }
}