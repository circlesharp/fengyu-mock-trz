import { StringMocker, NumberMocker, BooleanMock, TimestampMocker, DateMocker } from "src/basic-mocker"
import { PhoneMocker, PRCIdentityMocker } from 'src/addons'
import { ArrayMocker, OneMocker, ObjectMocker } from 'src/structure-mocker'
import { checkMockTypeExist } from "src/utils"
import { MockType } from 'src/types'

export class Mock {
    private static BasicMockTypes = [
        StringMocker,
        NumberMocker,
        BooleanMock,
        TimestampMocker,
        DateMocker,
    ]
    private static AddonsMockTypes = [
        PhoneMocker,
        PRCIdentityMocker,
    ]
    private static StructureMockTypes = [
        ArrayMocker,
        OneMocker,
        ObjectMocker,
    ]

    private mockTypes: Record<string, MockType<any>> = {}

    constructor() {
        this.initConstraint()
        this.initEmptyRules()
        this.initMockTypes()
    }

    // mock
    public mock(type: string, params: any) {
        const mocker = this.mockTypes[type]
        if (!mocker) throw Error()

        return mocker.generator(params)
    }

    // 添加 mockType
    public addMockType(mockType: MockType<any>) {
        if (checkMockTypeExist(this.mockTypes, mockType.typeName)) {
            throw Error()
        }
        this.mockTypes[mockType.typeName] = mockType
    }

    // 初始化约束条件
    private initConstraint() { }

    // 初始化全局空规则
    private initEmptyRules() { }

    // 初始化 mockTypes
    private initMockTypes() {
        [...Mock.BasicMockTypes, ...Mock.AddonsMockTypes].forEach((MockTypeConstructor) => {
            const mockType = new MockTypeConstructor()
            this.addMockType(mockType)
        })
        Mock.StructureMockTypes.forEach((StructureMockConstructor) => {
            const mockType = new StructureMockConstructor(this.mockTypes)
            this.addMockType(mockType)
        })
    }
}
