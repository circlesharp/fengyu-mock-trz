import { MockType } from 'src/types'

export function checkMockTypeExist(mockTypes: Record<string, MockType<any>>, mockTypeName: string): boolean {
    return mockTypeName in mockTypes
}
