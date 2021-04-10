import {StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import React from "react";

export const InfoItem = (props) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                ...props.wrapperStyle
            }}
        >
            <View
                style={{
                    paddingHorizontal: 4,
                }}
            >
                {props.customIcon}
            </View>
            <View
                style={{
                    paddingHorizontal: 4,
                }}
            >
                <Text>{props.title}</Text>
            </View>
        </View>
    )
}
export const Row = (props) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 10,
            }}
        >
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'white',
    },

});