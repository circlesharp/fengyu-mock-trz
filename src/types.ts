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
    generator(params: any): T;
}
