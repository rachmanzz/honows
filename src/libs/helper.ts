export function checkMagicNumber(view: DataView, start: number, expected: number[]): boolean {
    for (let i = 0; i < expected.length; i++) {
        if (view.getUint8(start + i) !== expected[i]) {
            return false;
        }
    }
    return true;
}