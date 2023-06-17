import { MockType, StructureItem } from 'src/types'
import { checkMockTypeExist } from "src/utils"

export interface MockObjectDesc {
    type: 'object'
    params: ObjectGeneratorParams
}

export interface ObjectGeneratorParams {
    properties: Record<string | number, Partial<StructureItem>>
}

export class ObjectMocker implements MockType<object> {
    public typeName = 'object';
    public mockTypes: Record<string, MockType<any>> = {}

    constructor(mockTypes: Record<string, MockType<any>>) {
        this.mockTypes = mockTypes
    }

    public generator(params: ObjectGeneratorParams): any {
        const { properties } = params
        this.generateStandardProperties(properties)
        const rst: any = {}
        for (const key in properties) {
            const property = properties[key]
            const randomlyExist = this.getItemShouldExistRandomly(property.ratio!)

            if (!randomlyExist) continue

            rst[key] = this.generateRstByItem(property as StructureItem)
        }
        // console.log(233, rst)
        debugger
        return rst
    }

    private generateStandardProperties(properties: ObjectGeneratorParams['properties']) {
        for (const key in properties) {
            const property = properties[key]
            if (!property.ratio) property.ratio = 1
        }
    }
    private getItemShouldExistRandomly(ratio: number) {
        return Math.random() <= ratio
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
