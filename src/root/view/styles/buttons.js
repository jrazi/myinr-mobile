import * as Spacing from "./spacing";
import * as Borders from "./borders";
import * as Theme from "./theme";

export const buttonDefaultBoxShadow = {

}

export const defaultButton = {
    ...Spacing.py2,
    ...Borders.borderRadius.xs,
    ...buttonDefaultBoxShadow,
    backgroundColor: Theme.themeColors.buttons.primary,
    justifyContent: 'center',
    alignItems:'center',
}

