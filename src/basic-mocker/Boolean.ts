import { getRandomFromRange } from 'src/utils';
import { MockType } from 'src/types'

export interface MockBooleanDesc {
    type: 'boolean'
    params: void
}

export class BooleanMock implements MockType<boolean> {
    public typeName = 'boolean';
    public generator(): boolean {
        const val = getRandomFromRange([0, 1])

        return !!val
    }
}
