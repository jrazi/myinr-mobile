import React, {useState} from "react";
import * as Data from "../Data";
import * as Layout from "./Layout";
import {Badge, Chip, Switch} from "react-native-paper";
import {currentTheme} from "../../../../../../../theme";
import {View} from "react-native";
import {LayoutStyles} from "./Layout";


export const ChipBox = (props) => {
    let states = [];
    let chips = props.items
        .map(condition => {
            let [value, setValue] = useState(condition.value);
            states.push([value, setValue]);
            return (
                <ConditionSelectChip
                    title={condition.name}
                    id={condition.id}
                    onPress={() => {props.onChange(condition.id, !value); setValue(!value)}}
                    selected={value}
                    key={condition.id}
                />
            )
        })
    return (
        <Layout.ItemsBox>
            {chips}
        </Layout.ItemsBox>
    );
}

const ConditionSelectChip = (props) => {return (
    <Layout.BasicElement>
        <Chip
            selected={props.selected} icon="information" onPress={() => props.onPress(props.id)}
        >
            {props.title}
        </Chip>
    </Layout.BasicElement>
)}

export const DefaultSwitchRow = (props) => {return (
    <Layout.Row justifyBetween>
        <Layout.InputTitle title={props.title} description={props.description}/>
        <Switch
            style={{}} value={props.value}
            color={currentTheme.colors.primary}
            onValueChange={props.onFlip}
        />
    </Layout.Row>
)}

export const TitleWithBadge = (props) => {
    return (
        <View style={{...LayoutStyles.screenTitle, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
            <View style={{}}>
                <Layout.ScreenTitle title={props.title} style={{paddingBottom: 0,}}/>
            </View>
            <View style={{}}>
                <Badge size={28}>{props.badgeValue}</Badge>
            </View>
        </View>
    )
}