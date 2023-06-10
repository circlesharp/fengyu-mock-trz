import { ArrayMocker } from './Array';
import { MockType, StructureItem } from 'src/types'

export interface MockOneDesc {
    type: 'one'
    params: OneGeneratorParams
}

export interface OneGeneratorParams {
    items: Array<Partial<StructureItem>>
}

export class OneMocker implements MockType<Array<any>> {
    public typeName = 'one';
    public mockTypes: Record<string, MockType<any>> = {}
    public arrayMocker!: ArrayMocker

    constructor(mockTypes: Record<string, MockType<any>>) {
        this.mockTypes = mockTypes
        this.arrayMocker = (mockTypes.array || new ArrayMocker(mockTypes)) as ArrayMocker
    }

    public generator(params: OneGeneratorParams): Array<any> {
        const { items } = params
        const [rst] = this.arrayMocker.generator({
            len: [1, 1],
            items
        })

        return rst
    }
}
