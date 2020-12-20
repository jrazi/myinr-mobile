import {configureFonts, DefaultTheme} from "react-native-paper";

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        // primary: '#fff',
        // accent: '#fff',
        background: '#fff',
        surface: '#fff',
    },
};
export const currentTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#03045e',
        accent: '#03045e',
        // accent: '#0077b6',
        background: '#fff',
        surface: '#fff',
    },
    fonts: configureFonts({
        ...DefaultTheme.fonts,
        android: {
            regular: {
                fontFamily: 'IranSans',
                fontWeight: 'normal',
            },
            bold: {
                fontFamily: 'IranSansBold',
                fontWeight: 'normal',
            },
            black: {
                fontFamily: 'IranSansBlack',
                fontWeight: 'normal',
            },
            medium: {
                fontFamily: 'IranSansMedium',
                fontWeight: 'normal',
            },
            light: {
                fontFamily: 'IranSansLight',
                fontWeight: 'normal',
            },
            thin: {
                fontFamily: 'IranSansUltraLight',
                fontWeight: 'normal',
            },
        }
    }),
    // roundness: 16,
}
export const mostlyWhiteTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#fff',
        accent: '#fff',
        background: '#fff',
        surface: '#fff',
        backdrop: '#fff',
    },
};

export const Colors = {
    DEFAULT_RED: '#8D021F',
}