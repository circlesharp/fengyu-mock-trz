import { getRandomFromRatio } from './getRandomFromRatio'

export type Charset = 'zh' | 'en' | 'jp' | 'num'

const UTF8_CHARSET_RANGE: Record<Charset, [number, number]> = {
    zh: [0x4e00, 0x62ff],
    en: [97, 122],
    jp: [0x30a1, 0x30ff],
    num: [48, 57],
}

export function getRandomCharFromCharset(charset: Array<Charset>): string {
    charset.forEach(i => {
        if (!(i in UTF8_CHARSET_RANGE)) throw Error()
    })

    const { value: randomCharset } = getRandomFromRatio(charset.map(i => ({ value: i, ratio: 1 })))
    const [from, to] = UTF8_CHARSET_RANGE[randomCharset]
    return String.fromCharCode(from + Math.random() * (to - from + 1))
}