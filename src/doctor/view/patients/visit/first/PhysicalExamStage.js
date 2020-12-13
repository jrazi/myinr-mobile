import React from "react";
import {StyleSheet, View} from "react-native";
import {Text, TextInput} from "react-native-paper";
import * as Layout from './Layout';
import {currentTheme} from "../../../../../../theme";
import {IntraSectionInvisibleDivider} from "./Layout";


export class PhysicalExamStage extends React.Component {
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
                <Layout.ScreenTitle title={'معاینه بالینی'}/>
                <Layout.FormSection>
                    <TextInputRow
                        title={'فشار خون' + ' (Systolic)'}
                        placeholder={'mmHg'}
                        numeric
                    />
                    <TextInputRow
                        title={'فشار خون'  + ' (Diastolic)'}
                        placeholder={'mmHg'}
                        numeric
                    />
                    <TextInputRow
                        title={'ضربان قلب'}
                        placeholder={'BPM'}
                        numeric
                    />
                    <TextInputRow
                        title={'نرخ تنفسی'}
                        placeholder={'BPM'}
                        numeric
                    />
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

const TextInputRow = ({title, ...props}) => {
    return (
        <View>
            <Layout.InputTitle title={title}/>
            <DefaultTextInput
                {...props}
            />
            <IntraSectionInvisibleDivider m/>
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
                flexGrow: 0,
                paddingHorizontal: 0,

                ...props.style
            }}
            dense={true}
        />
    )
}
