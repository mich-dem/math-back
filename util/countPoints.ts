export const countPoints = (info: number[]): number => {
    let sum = 0;
    if (info[15] === 1) {
        for (let i = 0; i < 5; i++) {
            if (info[2 * i] + info[2 * i + 1] === info[i + 10]) {
                sum++;
            }
        }
    } else if (info[15] === 2) {
        for (let i = 0; i < 5; i++) {
            if (info[2 * i + 1] - info[2 * i] === info[i + 10]) {
                sum++;
            }
        }
    } else if (info[15] === 3) {
        for (let i = 0; i < 5; i++) {
            if (info[2 * i] * info[2 * i + 1] === info[i + 10]) {
                sum++;
            }
        }
    } else {
        for (let i = 0; i < 5; i++) {
            if (info[2 * i + 1] === info[2 * i] * info[i + 10]) {
                sum++;
            }
        }
    }
    return sum;
}