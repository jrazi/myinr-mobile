const borderRadiusValues = [0, 2, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 75, 90, 100];

export function customBorderRadius(level) {
    return {
        borderRadius: borderRadiusValues[level],
    }
}

export const borderRadius = {
    xs: customBorderRadius(2),
    sm: customBorderRadius(5),
    md: customBorderRadius(8),
    lg: customBorderRadius(10),
    xl: customBorderRadius(2),
    custom: level => customBorderRadius(level),
}

export const defaultBorder = {
    borderColor: 'gray',
    borderWidth: 1,
}

export const debugBorderRed = {
    borderColor: 'red',
    borderWidth: 2,
}

export const debugBorderBlue = {
    borderColor: 'blue',
    borderWidth: 2,
}