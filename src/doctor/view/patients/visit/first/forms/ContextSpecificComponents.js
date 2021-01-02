import React, {useState} from "react";
import * as Data from "../Data";
import * as Layout from "./Layout";
import {Badge, Chip, Switch, useTheme} from "react-native-paper";
import {View} from "react-native";
import {LayoutStyles} from "./Layout";
import color from 'color';
import {debugBorderRed} from "../../../../../../root/view/styles/borders";


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
        <Layout.ItemsBox style={props.itemBoxStyle}>
            {chips}
        </Layout.ItemsBox>
    );
}

const ConditionSelectChip = (props) => {
    const theme = useTheme();
    const backgroundColor = color(theme.colors.backdrop).alpha(0.1).string();
    const selectedBackgroundColor = theme.colors.backdrop;
    let style = theme.dark ? {backgroundColor: props.selected ? selectedBackgroundColor : backgroundColor,} : null;
    return (
    <Layout.BasicElement>
        <Chip
            selected={props.selected}
            icon="information" onPress={() => props.onPress(props.id)}
            style={style}
        >
            {props.title}
        </Chip>
    </Layout.BasicElement>
)}

export const DefaultSwitchRow = (props) => {
    const theme = useTheme();
    return (
        <Layout.Row justifyBetween style={props.rowStyle}>
            <Layout.InputTitle title={props.title} description={props.description} titleStyle={props.titleStyle}/>
            <Switch
                style={{
                }}
                value={props.value}
                onValueChange={props.onFlip}
                color={theme.colors.accent}
            />
        </Layout.Row>
    )
}

export const TitleWithBadge = (props) => {
    const theme = useTheme();
    return (
        <View style={{...LayoutStyles.screenTitle, flexDirection: 'row-reverse', alignItems: 'flex-start', justifyContent: 'space-between',}}>
            <View style={{}}>
                <Layout.ScreenTitle title={props.title} style={{paddingBottom: 0,}}/>
            </View>
            <View style={{}}>
                <Badge size={32} theme={theme} style={{backgroundColor: theme.colors.actionColors.remove, }}>{props.badgeValue}</Badge>
            </View>
        </View>
    )
}