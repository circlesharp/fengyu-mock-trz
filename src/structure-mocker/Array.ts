import { merge } from 'lodash-es'
import { getRandomFromRatio } from 'src/utils';
import { getRandomIntFromRange } from 'src/utils';
import { StructureItem } from 'src/types'
import { checkMockTypeExist } from "src/utils"
import { MockType } from 'src/types'

export interface MockArrayDesc {
    type: 'array'
    params: ArrayGeneratorParams
}

export interface ArrayGeneratorParams {
    items: Array<Partial<StructureItem>>
    len?: Array<number>
}

export class ArrayMocker implements MockType<Array<any>> {
    private static DefParams: Partial<ArrayGeneratorParams> = {
        len: [5, 7],
    }

    public typeName = 'array';
    public mockTypes: Record<string, MockType<any>> = {}

    constructor(mockTypes: Record<string, MockType<any>>) {
        this.mockTypes = mockTypes
    }

    public generator(params: ArrayGeneratorParams): Array<any> {
        const { len, items } = merge({}, ArrayMocker.DefParams, params)
        const stdItems = items.map(this.generateStandardItem)
        const rst = []
        const rstLen = getRandomIntFromRange(len!)
        for (let i = 0; i < rstLen; i++) {
            const randomItem = getRandomFromRatio(stdItems)
            rst.push(this.generateRstByItem(randomItem))
        }

        return rst
    }

    private generateStandardItem(item: Partial<StructureItem>): StructureItem {
        if (item.ratio === undefined) {
            item.ratio = 1;
        }
        return item as StructureItem
    }
    private generateRstByItem(item: StructureItem): any {
        const { desc, value } = item
        if (desc) {
            const { type, params } = desc
            if (!checkMockTypeExist(this.mockTypes, type)) {
                throw Error()
            }
            const rst = this.mockTypes[type].generator(params)
            return rst
        }

        return value
    }
}
