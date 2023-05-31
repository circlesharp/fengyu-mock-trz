export type MockBasicType = 'string' | 'number' | 'boolean' | 'date'
export type MockDerivativeType = 'identity' | 'phone'

export interface MockOpts {
    type?: MockBasicType | MockDerivativeType,
    range?: Array<number | undefined>,
    len?: Array<number | undefined>,
    format?: string,
    formatter?: Function,
    startsWith?: string
}
