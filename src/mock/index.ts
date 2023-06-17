import { merge } from "lodash-es"
import { StringMocker, NumberMocker, BooleanMock, TimestampMocker, DateMocker } from "src/basic-mocker"
import { PhoneMocker, PRCIdentityMocker } from 'src/addons'
import { ArrayMocker, OneMocker, ObjectMocker } from 'src/structure-mocker'
import { checkMockTypeExist } from "src/utils"
import { MockItemDesc, MockType, MockConstraint, MockEmptyRules } from 'src/types'

export class Mock {
    constructor(params?: { constraint: MockConstraint, emptyRules: MockEmptyRules }) {
        const { constraint, emptyRules } = params ?? {}

        this.initConstraint(constraint)
        this.initEmptyRules(emptyRules)
        this.initMockTypes()
    }

    // mock
    public mock(desc: MockItemDesc) {
        const { type, params } = desc
        const mocker = this.mockTypes[type]
        if (!mocker) throw Error()

        return mocker.generator(params)
    }

    // 集中管理的 mock 类型
    private mockTypes: Partial<Record<MockItemDesc['type'], MockType<any>>> = {}
    public addMockType(mockType: MockType<any>) {
        if (checkMockTypeExist(this.mockTypes, mockType.typeName)) {
            throw Error()
        }

        const typeName = mockType.typeName as MockItemDesc['type']
        this.mockTypes[typeName] = mockType

        // 设置空规则
        const rule = this.emptyRules[typeName]!
        if (mockType.setEmptyRule && this.emptyRules[typeName]) {
            mockType.setEmptyRule({ allow: this.emptyRules.allow, rule })
        }

        // 设置约束条件
        if (mockType.setConstraint) {
            mockType.setConstraint(this.constraint)
        }
    }

    // 约束条件
    private constraint: MockConstraint = {
        maxObjDepth: 7,
        maxArrLenght: 1000,
        maxStrLength: 100,
        maxNumValue: Number.MAX_SAFE_INTEGER,
    }
    private initConstraint(constraint?: MockConstraint) {
        this.constraint = merge({}, this.constraint, constraint)
    }

    // 空规则
    private emptyRules: MockEmptyRules = {
        allow: true,
        string: ['-'],
        number: [0, NaN, undefined],
    }
    private initEmptyRules(emptyRules?: MockEmptyRules) {
        this.emptyRules = merge({}, this.emptyRules, emptyRules)
    }

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

    private static BasicMockTypes = [
        StringMocker,
        NumberMocker,
        BooleanMock,
        TimestampMocker,
        DateMocker,
    ]
    private static StructureMockTypes = [
        ArrayMocker,
        OneMocker,
        ObjectMocker,
    ]
    private static AddonsMockTypes = [
        PhoneMocker,
        PRCIdentityMocker,
    ]
}
