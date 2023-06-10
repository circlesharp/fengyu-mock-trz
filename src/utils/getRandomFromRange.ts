export function getRandomFromRange(range: Array<number | undefined>) {
    const [a, b] = range
    const defaultValue = a ?? b
    if (defaultValue === undefined) throw Error('error: 请传入正确的范围')

    const from = a ?? defaultValue
    const to = b ?? defaultValue
    return Math.floor(Math.random() * (to - from + 1)) + from
}
