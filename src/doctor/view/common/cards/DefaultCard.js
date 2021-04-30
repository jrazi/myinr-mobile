import {StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import React from "react";
import {ConditionalRender} from "../../patients/visit/first/forms/Layout";
import {hasValue} from "../../../../root/domain/util/Util";
import {debugBorderRed} from "../../../../root/view/styles/borders";

export const InfoItem = (props) => {
    const hasIcon = hasValue(props.customIcon);
    return (
        <View
            style={[
                {
                flexDirection: 'row',
                alignItems: 'center',

                },
                props.wrapperStyle
            ]}
        >
            <View
                style={{
                    paddingHorizontal: hasIcon ? 4 : 0,
                }}
            >
                {props.customIcon}
            </View>
            <View
                style={{
                    paddingHorizontal: hasIcon ? 4 : 0,
                    width: 120,
                    ...debugBorderRed,
                }}
            >
                <Text {...props.textProps}>{props.title}</Text>
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