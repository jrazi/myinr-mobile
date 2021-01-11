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

const defaultSurface = DefaultTheme.colors.surface;
const _mostlyWhiteTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: defaultSurface,
        accent: defaultSurface,
        background: defaultSurface,
        surface: defaultSurface,
        backdrop: defaultSurface,
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

const actionColors = {
    primary: Colors.DEFAULT_RED,
    primaryBlue: '#303F9F',
    secondary: '#bdbdbd',
    confirm: '#00897b',
    warning: '#303f9f',
    remove: Colors.DEFAULT_RED,
    removeRed: '#c62828',
    help: '#673ab7',
}

export const lightTheme = {
    ...DefaultTheme,
        // dark: true,
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        primary: '#03045e',
        accent: '#03045e',
        onAccentBackground: DefaultTheme.colors.background,
        // background: DefaultTheme.colors.background,
        // surface: DefaultTheme.colors.background,
        // background: '#ffffff',
        // surface: '#f7f7f7',
        lightPrimary: color('#03045e').alpha(0.2).string(),
        actionColors: actionColors,
    },
    fonts: defaultFonts,
    mostlyWhiteTheme: _mostlyWhiteTheme,
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

const darkThemePrimary = color('#03045e').alpha(0.2).string();
const darkReallyDisabled = color('#FFFFFF').alpha(0.30).string();
const darkDisabled = color('#FFFFFF').alpha(0.38).string();
const darkMediumEmphasis = color('#FFFFFF').alpha(0.6).string();
const darkHighEmphasis = color('#FFFFFF').alpha(0.87).string();

const darkGrey = '#121212';
const darkPrimary = darkHighEmphasis;
const darkAccent = blueGrey[500];

export const darkTheme = {
    ...DefaultTheme,
    dark: true,
    mode: 'adaptive',
    colors: {
        ...DefaultTheme.colors,
        primary: darkPrimary,
        accent: darkAccent,
        onAccentBackground: darkHighEmphasis,
        // accent: '#0077b6',
        backdrop: darkDisabled,
        placeholder: darkDisabled,
        disabled: darkReallyDisabled,
        background: darkGrey,
        surface: darkGrey,
        onBackground: darkHighEmphasis,
        onSurface: darkHighEmphasis,
        text: darkMediumEmphasis,
        // disabled: darkDisabled,
        lightPrimary: color(darkThemePrimary).alpha(0.2).string(),
        actionColors: {
            ...actionColors,
            remove: '#ef9a9a',
            secondary: '#ef9a9a',
            primary: darkAccent,
        },
    },
    fonts: defaultFonts,
    mostlyWhiteTheme: {
        ...DefaultTheme.colors,
        primary: darkPrimary,
        accent: darkAccent,
        // accent: '#0077b6',
        backdrop: darkDisabled,
        placeholder: darkDisabled,
        background: darkGrey,
        surface: darkGrey,
        onBackground: darkHighEmphasis,
        onSurface: darkHighEmphasis,
        text: darkMediumEmphasis,
    }
    // roundness: 16,
}
// darkTheme.mostlyWhiteTheme = darkTheme;


// surface: #121212
// That’s why Google Material design recommends using a slightly darker white:
//     High-emphasis text should have an opacity of 87%
// Medium emphasis text is applied at 60%
// Disabled text uses an opacity of 38%.

