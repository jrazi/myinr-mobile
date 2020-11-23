import React from "react";
import {Text, I18nManager} from "react-native";
import {rootDao} from "../../data/dao/RootDao";
import {Locale} from "../../view/styles";

export const DefaultText = (props) => {return (
    <Text
        style={{
            fontFamily: Locale[rootDao.getLocale()].fontFamily,
            textAlign: I18nManager.isRTL ? 'right': 'left',
            ...props.style
        }}
    >
        {props.children}
    </Text>
)}