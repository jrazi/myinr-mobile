import React, {useState} from "react";
import * as Data from "../Data";
import * as Layout from "./Layout";
import {Chip, Switch} from "react-native-paper";
import {currentTheme} from "../../../../../../../theme";
import {View} from "react-native";


export const ChipBox = (props) => {
    let states = [];
    let chips = props.items
        .map(condition => {
            let [value, setValue] = useState(false);
            states.push([value, setValue]);
            return (
                <ConditionSelectChip
                    title={condition.name}
                    id={condition.id}
                    onPress={() => setValue(!value)}
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