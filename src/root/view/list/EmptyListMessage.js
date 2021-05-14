import {ConditionalRender} from "../../../doctor/view/patients/visit/first/forms/Layout";
import {ScrollView, View} from "react-native";
import {Caption} from "react-native-paper";
import React from "react";

export const EmptyList = (props) => {
    return (
        <ConditionalRender hidden={props.hidden}>
            <View style={{paddingTop: 20, alignItems: 'center', ...props.style}}>
                <Caption style={{paddingVertical: 10,fontSize: 16, textAlign: 'center',}}>
                    {props.message}
                </Caption>
            </View>
        </ConditionalRender>
    )
}