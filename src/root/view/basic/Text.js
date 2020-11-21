import React from "react";
import {Text} from "react-native";

export const DefaultText = (props) => {return (
    <Text
        style={{
            ...props.style
        }}
    >
        {props.children}
    </Text>
)}