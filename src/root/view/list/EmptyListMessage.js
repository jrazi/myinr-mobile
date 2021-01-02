import {ConditionalRender} from "../../../doctor/view/patients/visit/first/forms/Layout";
import {ScrollView, View} from "react-native";
import {Caption} from "react-native-paper";
import React from "react";

export const EmptyList = (props) => {
    return (
        <ConditionalRender hidden={props.hidden}>
            <View style={{paddingTop: 20, alignItems: 'center'}}>
                <Caption style={{paddingVertical: 10,fontSize: 16}}>
                    {props.message}
                </Caption>
            </View>
        </ConditionalRender>
    )
}