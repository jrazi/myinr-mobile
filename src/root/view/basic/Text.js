import React from "react";
import {Text} from "react-native";
import {rootDao} from "../../data/dao/RootDao";
import {Locale} from "../../view/styles";

export const DefaultText = (props) => {return (
    <Text
        style={{
            fontFamily: Locale[rootDao.getLocale()].fontFamily,
            ...props.style
        }}
    >
        {props.children}
    </Text>
)}