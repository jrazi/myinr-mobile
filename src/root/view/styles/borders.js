const borderRadiusValues = [0, 2, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 75, 90, 100];

export function borderRadius(level) {
    return {
        borderRadius: borderRadiusValues[level],
    }
}
