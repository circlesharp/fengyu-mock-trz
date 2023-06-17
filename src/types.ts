import {
    MockStringDesc,
    MockNumberDesc,
    MockBooleanDesc,
    MockTimestampDesc,
    MockDateDesc,
} from "src/basic-mocker";
import {
    MockArrayDesc,
    MockOneDesc,
    MockObjectDesc
} from "src/structure-mocker";
import {
    MockPhoneDesc,
    MockPRCIdentityDesc,
} from 'src/addons'

export type MockItemDesc =
    MockStringDesc |
    MockNumberDesc |
    MockBooleanDesc |
    MockTimestampDesc |
    MockDateDesc |
    MockArrayDesc |
    MockOneDesc |
    MockObjectDesc |
    MockPhoneDesc |
    MockPRCIdentityDesc


export interface StructureItem {
    desc?: MockItemDesc
    value?: any
    ratio: number
}

export interface MockType<T> {
    typeName: string;
    generator: (params: any) => T;
    setEmptyRule?: (emptyRule: { allow: boolean, rule: Array<any> }) => void;
    setConstraint?: (constraint: MockConstraint) => void
}

export type MockConstraint = {
    maxObjDepth: number,
    maxArrLenght: number,
    maxStrLength: number,
    maxNumValue: number,
}

type MockerTypeEmptyRule = Partial<Record<MockItemDesc['type'], Array<any>>>
export interface MockEmptyRules extends MockerTypeEmptyRule {
    allow: boolean
}
