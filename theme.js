import {DefaultTheme} from "react-native-paper";

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
    },
};