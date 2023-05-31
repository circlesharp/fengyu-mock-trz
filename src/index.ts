import { MockOpts } from "./types";
import { mockString, mockNumber, mockBoolean, mockIdentity, mockPhone } from '../src/utils';

export class Mock {
    static mock(mockOpts: MockOpts) {
        switch (mockOpts.type) {
            case 'string':
                return mockString(mockOpts)
            case 'number':
                return mockNumber(mockOpts)
            case 'boolean':
                return mockBoolean(mockOpts)
            case 'identity':
                return mockIdentity(mockOpts)
            case 'phone':
                return mockPhone(mockOpts)
            default:
                return mockNumber(mockOpts)
        }
    }
}
