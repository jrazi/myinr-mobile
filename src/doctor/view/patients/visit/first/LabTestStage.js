import React from "react";
import {StyleSheet, View} from "react-native";
import {Text, TextInput} from "react-native-paper";
import {ScreenLayout} from "../../../../../root/view/screen/Layout";
import {currentTheme} from "../../../../../../theme";
import * as Layout from "./Layout";
import {DefaultText} from "../../../../../root/view/basic/Text";
import {IntraSectionInvisibleDivider} from "./Layout";


export class LabTestStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <Layout.VisitScreen>
                <Layout.ScreenTitle title={'آزمایش کراتینین خون'}/>
                <Layout.FormSection>
                    <LabTestResultForm/>
                </Layout.FormSection>
            </Layout.VisitScreen>
        )
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: currentTheme.colors.surface,
    }
})

const LabTestResultForm = (props) => {
    let fieldsElements = fields
        .map(field => {
            return (
                <LabTestField unit={field.unit} name={field.name} key={`LTRF_${field.id}`}/>
            )
        })

    return (
        <View>
            {fieldsElements}
        </View>
    )
}
const LabTestField = (props) => {
    return (
        <View>
            <View>
                <DefaultTextInput label={props.name} placeholder={props.unit}/>
            </View>
            <IntraSectionInvisibleDivider s/>
        </View>
    )
}

const DefaultTextInput = (props) => {
    return (
        <TextInput
            label={props.label}
            // value={}
            placeholder={props.placeholder}
            onChangeText={() => {}}
            autoCompleteType={'off'}
            keyboardType={'numeric'}
            textContentType={props.textContentType}
            autoCorrect={false}
            style={{
                backgroundColor: currentTheme.colors.surface,
                fontSize: 14,
                // flexGrow: 0,
                flexGrow: 0,
                // width: '75%',
                // flex: 1,
                paddingHorizontal: 0,
                paddingRight: 50,
                // flexDirection: 'row',
                // justifyContent: 'flex-end',
                // alignItems: 'flex-end',
                // alignItems: 'stretch',
                ...props.style
            }}
            // dense={true}
        />
    )
}

let fields = [
    {
        id: 0,
        name: 'Hb',
        unit: 'gr/dl',
    },
    {
        id: 1,
        name: 'Hct',
        unit: '%',
    },
    {
        id: 2,
        name: 'Plt',
        unit: 'Cu/mm',
    },
    {
        id: 3,
        name: 'Bun',
        unit: 'mg/dl',
    },
    {
        id: 4,
        name: 'Urea',
        unit: 'mg/dl',
    },
    {
        id: 5,
        name: 'Cr',
        unit: 'mg/dl',
    },
    {
        id: 6,
        name: 'Na',
        unit: '',
    },
    {
        id: 7,
        name: 'K',
        unit: 'mmol/L',
    },
    {
        id: 8,
        name: 'Alt',
        unit: 'IU/L',
    },
    {
        id: 9,
        name: 'Ast',
        unit: 'IU/L',
    },
]