interface ratioOption {
    ratio: number
}

export function getRandomFromRatio<T extends ratioOption>(options: Array<T>): T {
    const ratios = options.map(i => i.ratio)
    const totalRatio = ratios.reduce((t, c) => t + c, 0)

    // 生成随机数
    const randomNum = Math.random();

    // 根据比例生成内容
    let randomIdx = 0;
    let cumulativeRatio = 0;
    for (let i = 0; i < ratios.length; i++) {
        cumulativeRatio += ratios[i];
        if (randomNum <= cumulativeRatio / totalRatio) {
            randomIdx = i;
            break;
        }
    }

    return options[randomIdx]
}