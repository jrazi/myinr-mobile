import React from "react";
import {StyleSheet, View} from "react-native";
import {Text, TextInput} from "react-native-paper";
import {ScreenLayout} from "../../../../../root/view/screen/Layout";
import {currentTheme} from "../../../../../../theme";
import * as Layout from "./Layout";
import {IntraSectionInvisibleDivider} from "./Layout";


export class Echocardiography extends React.Component {
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
                <Layout.ScreenTitle title={'اکوکاردیوگرافی'}/>
                <Layout.FormSection>
                    <ECForm/>
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

const ECForm = (Props) => {
    return (
        <View>
            <LabTestField name={'EF'} unit={'%'}/>
            <LabTestField name={'LAVI'} unit={'ml/m^2'}/>
            <DefaultTextInput label={'توضیحات'} multiline={true} numberOfLines={10}/>
        </View>
    )
}
const LabTestField = (props) => {
    return (
        <View style={{}}>
            <DefaultTextInput label={props.name} placeholder={props.unit} numeric/>
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
            keyboardType={props.numeric ? 'numeric' : 'default'}
            textContentType={props.textContentType}
            autoCorrect={false}
            style={{
                backgroundColor: currentTheme.colors.surface,
                fontSize: 14,
                // width: '50%',
                // flex: 1,
                // paddingLeft: '50%',
                paddingHorizontal: 0,
                // alignSelf: 'center',
                ...props.style
            }}
            multiline={props.multiline}
            numberOfLines={props.numberOfLines}
            // dense={true}
        />
    )
}