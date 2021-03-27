import React, {useState} from "react";
import * as Layout from "./Layout";
import {IntraSectionDivider, LayoutStyles} from "./Layout";
import {Badge, Chip, Switch, TextInput, useTheme, Text} from "react-native-paper";
import {View} from "react-native";
import color from 'color';
import {firstNonEmpty, getFormFormattedJalaliDate} from "../../../../../../root/domain/util/Util";
import {DefaultDatePicker} from "./JalaliDatePicker";
import {debugBorderBlue, debugBorderRed} from "../../../../../../root/view/styles/borders";


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

export const DefaultDateInput = (props) => {
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [dateValue, setDateValue] = useState(props.initialValue);

    const onDateChange = (date) => {
        setDateValue(date);
        setDatePickerVisible(false);
        props.onDateChange(date);
    }

    const dismissModal = () => {
        setDatePickerVisible(false);
    }

    const theme = useTheme();

    return (
        <View>
            {
                props.label ? <Layout.InputOutlineLabel title={props.label}/> : null
            }
            <TextInput
                value={dateValue}
                disabled={props.disabled}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                onFocus={() => setDatePickerVisible(true)}
                autoCompleteType={'off'}
                returnKeyType={'next'}
                keyboardType={null}
                showSoftInputOnFocus={false}
                textContentType={props.textContentType}
                autoCorrect={false}
                style={{
                    backgroundColor: theme.colors.surface,
                    fontSize: 14,
                    flexGrow: 0,
                    paddingHorizontal: 0,
                    textAlign: 'left',

                    ...props.style
                }}
                dense={true}
            />
            <DefaultDatePicker visible={datePickerVisible} onDismiss={dismissModal} onDateChange={onDateChange} selectedDate={dateValue || getFormFormattedJalaliDate(new Date())}/>
        </View>
    )
}

export const DefaultTextInput = (props) => {
    const theme = useTheme();
    return (
        <View>
            <Layout.InputOutlineLabel title={props.label}/>
            <TextInput
                value={props.value}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                disabled={props.disabled}
                onBlur={props.onBlur}
                autoCompleteType={'off'}
                keyboardType={props.numeric ? 'numeric' : 'default'}
                textContentType={props.textContentType}
                autoCorrect={false}
                style={{
                    backgroundColor: theme.colors.surface,
                    fontSize: 14,
                    paddingHorizontal: 0,
                    textAlign: 'left',
                    ...props.style
                }}
                multiline={props.multiline}
                numberOfLines={props.numberOfLines}
                dense={true}
            />
        </View>
    )
}


export const CheckboxGroup = (props) => {
    let selectedStates = [];
    const theme = useTheme();
    let conditionElements = (props.items || [])
        .map((item, index) => {
            const [value, setValue] = useState(firstNonEmpty(item.value, false));
            selectedStates.push([value, setValue]);
            return [
                <View
                    style={{
                        flexDirection: 'row-reverse',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flex: 1,
                        width: '100%',
                    }}
                    key={'CheckBoxGroup' + item.id}
                >
                    <View
                        style={{
                            width: '75%',
                            paddingLeft: 20,
                        }}
                    >
                        <Text style={{fontSize: 14, color: theme.colors.text, textAlign: 'right', }}>{item.name}</Text>
                    </View>
                    <View
                        style={{
                            width: '25%',
                        }}
                    >
                        <DefaultSwitch
                            style={{

                            }}
                            value={value}
                            color={useTheme().colors.accent}
                            onValueChange={() => {{props.onChange(item.id, !value); setValue(!value)}}}
                            disabled={props.readonly}
                        />

                    </View>
                </View>,
                (index == props.items.length - 1) ? null : <IntraSectionDivider key={'CheckBoxGroupDivider' + item.id} s/>
            ]
        })
    return (
        <View>
            {conditionElements}
        </View>
    )
}