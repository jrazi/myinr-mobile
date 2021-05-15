import React from "react";
import {LoadingScreen} from "../../../../../root/view/loading/Loading";
import {ScreenHeader, ScreenLayout} from "../../../../../root/view/screen/Layout";
import {Surface, Text, useTheme, withTheme} from "react-native-paper";
import {View} from "react-native";
import {PatientMessageContext} from "../MessageContext";
import {IntraSectionInvisibleDivider, VisitScreen} from "../../../../../doctor/view/patients/visit/first/forms/Layout";
import {SectionDescriptionText} from "../common/MessageStageLayout";

class DosageChangeReport extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            loaded: false,
        }
        this.patientMessage = {};
    }

    static contextType = PatientMessageContext;

    componentDidMount = () => {
        this.patientMessage = this.context.patientMessage;
        this.setState({loaded: true});
    }


    render() {
        return (
            <VisitScreen>
                <View>
                    <SectionDescriptionText>{'Dosage Change'}</SectionDescriptionText>
                </View>
                <IntraSectionInvisibleDivider xs/>
                <View>
                </View>
            </VisitScreen>
        );
    }
}

export default withTheme(DosageChangeReport);


const ControlHeader = (props) => {
    const theme = useTheme();

    return (
        <Surface style={{elevation: 4}}>
            <ScreenHeader
                title="پیام به پزشک"
                style={{elevation: 0}}
            />
        </Surface>
    )
}
