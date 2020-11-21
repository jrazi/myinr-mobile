import {Borders, Spacing, Theme} from "./index";

export const buttonDefaultBoxShadow = {

}

export const defaultButton = {
    ...Spacing.py2,
    ...Borders.borderRadius(2),
    ...buttonDefaultBoxShadow,
    backgroundColor: Theme.themeColors.buttons.primary,
    justifyContent: 'center',
    alignItems:'center',
}

