export function getRandomFloatFromRange(range: Array<number | undefined>, precision: number = 2) {
    const [a, b] = range
    const defaultValue = a ?? b
    if (defaultValue === undefined) throw Error('error: 请传入正确的范围')

    const from = a ?? defaultValue
    const to = b ?? defaultValue

    if (from === to) return from

    return Number(((Math.random() * (to - from)) + from).toFixed(precision))
}
