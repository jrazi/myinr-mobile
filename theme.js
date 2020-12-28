import {configureFonts, DefaultTheme} from "react-native-paper";
import color from 'color';
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

export const Colors = {
    DEFAULT_RED: '#8D021F',
}


const _mostlyWhiteTheme = {
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
const defaultFonts = configureFonts({
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
    }
);

const lightTheme = {
    ...DefaultTheme,
        // dark: true,
    colors: {
        ...DefaultTheme.colors,
        primary: '#03045e',
        accent: '#03045e',
        secondary: Colors.DEFAULT_RED,
        // accent: '#0077b6',
        background: '#fff',
        surface: '#fff',
        lightPrimary: color('#03045e').alpha(0.2).string(),
    },
    fonts: defaultFonts,
    // roundness: 16,
}

const blueGrey = {
    200: '#bcccdc',
    300: '#9fb3c8',
    400: '#829ab1',
    500: '#627d98',
    600: '#486581',
    700: '#334e68',
    800: '#243b53',
    900: '#102a43',
}

const actionColors = {
    primary: '#3303F9F',
    secondary: '#3303F9F',
    confirm: '#00897b',
    warning: '#303f9f',
    remove: '#c62828',
    help: '#673ab7',
}

const darkThemePrimary = color('#03045e').alpha(0.2).string();
const darkDisabled = color('#FFFFFF').alpha(0.38).string();
const darkMediumEmphasis = color('#FFFFFF').alpha(0.6).string();
const darkHighEmphasis = color('#FFFFFF').alpha(0.87).string();

const darkGrey = '#121212';
const darkPrimary = darkHighEmphasis;
const darkAccent = blueGrey[900];

const darkTheme = {
    ...DefaultTheme,
    dark: true,
    mode: 'adaptive',
    colors: {
        ...DefaultTheme.colors,
        primary: darkPrimary,
        accent: darkAccent,
        secondary: Colors.DEFAULT_RED,
        // accent: '#0077b6',
        backdrop: darkDisabled,
        placeholder: darkDisabled,
        background: darkGrey,
        surface: darkGrey,
        onBackground: darkHighEmphasis,
        onSurface: darkHighEmphasis,
        text: darkMediumEmphasis,
        lightPrimary: color(darkThemePrimary).alpha(0.2).string(),
    },
    fonts: defaultFonts,
    // roundness: 16,
}

export const currentTheme = darkTheme;
export const mostlyWhiteTheme = darkTheme;
// surface: #121212
// That’s why Google Material design recommends using a slightly darker white:
//     High-emphasis text should have an opacity of 87%
// Medium emphasis text is applied at 60%
// Disabled text uses an opacity of 38%.

