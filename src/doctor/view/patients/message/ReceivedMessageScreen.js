import React from "react";
import {View} from "react-native";
import {ScreenHeader, ScreenLayout, TitleOnlyScreenHeader} from "../../../../root/view/screen/Layout";
import {Surface, useTheme} from "react-native-paper";
import {ConditionalCollapsibleRender} from "../visit/first/forms/Layout";

export default class ReceivedMessageScreen extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <ScreenLayout>
                <ControlHeader
                />
                <PatientMessageView message={this.props.route.params.message} medicalInfo={this.props.route.params.patientMedicalInfo}/>
            </ScreenLayout>
        );
    }
}


const ControlHeader = (props) => {
    const theme = useTheme();

    return (
        <Surface style={{elevation: 4}}>
            <ScreenHeader
                title="پیام بیمار"
                style={{elevation: 0}}
            />
            <ConditionalCollapsibleRender hidden={false}>
            </ConditionalCollapsibleRender>
        </Surface>
    )
}

const PatientMessageView = (props) => {
    return (
        <View>

        </View>
    )
}