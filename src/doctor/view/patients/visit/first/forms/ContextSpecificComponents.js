import React, {useEffect, useRef, useState} from "react";
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
                    disabled={props.disableAll}
                />
            )
        })
    return (
        <Layout.ItemsBox style={props.itemBoxStyle}>
            {chips}
        </Layout.ItemsBox>
    );
}

export class RadioChipBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chipValues: [],
        }
    }

    changeChipValue = (index, value) => {
        const newChipValues = [...this.state.chipValues];
        this.state.chipValues.forEach((chipValue, chipIndex) => {
            if (chipIndex == index) {
                newChipValues[chipIndex] = value;
            } else {
                newChipValues[chipIndex] = false;
            }
        })
        this.setState({chipValues: newChipValues});
    }

    componentDidMount = () => {
        let newChipValues = [];
        this.props.items.forEach((item, index) => {
            newChipValues[index] = item.value;
        });
        this.setState({chipValues: newChipValues});
    }

    render() {
        let chips = this.props.items
            .map((condition, index) => {
                return (
                    <ConditionSelectChip
                        title={condition.name}
                        id={condition.id}
                        onPress={() => {this.props.onChange(condition.id, !this.state.chipValues[index]); this.changeChipValue(index, !this.state.chipValues[index])}}
                        selected={this.state.chipValues[index]}
                        key={condition.id}
                        disabled={this.props.disableAll}
                    />
                )
            })
        return (
            <Layout.ItemsBox style={this.props.itemBoxStyle}>
                {chips}
            </Layout.ItemsBox>
        );
    }
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
            icon="information"
            onPress={props.disabled ? null : () => props.onPress(props.id)}
            style={style}

            // disabled={true}
        >
            {props.title}
        </Chip>
    </Layout.BasicElement>
)}

export const DefaultSwitchRow = (props) => {
    return (
        <Layout.Row justifyBetween style={props.rowStyle}>
            <Layout.InputTitle title={props.title} description={props.description} titleStyle={props.titleStyle}/>
            <DefaultSwitch
                value={props.value}
                onValueChange={props.onFlip}
                disabled={props.disabled}
            />
        </Layout.Row>
    )
}

export const DefaultSwitch = ({disabled, value, onValueChange, ...props}) => {
    const theme = useTheme();
    return <Switch
        value={value}
        onValueChange={disabled ? null : onValueChange}
        color={theme.colors.accent}
        {...props}
    />
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