import React from "react";
import {LoadingScreen} from "../../../../../root/view/loading/Loading";
import {ScreenHeader, ScreenLayout} from "../../../../../root/view/screen/Layout";
import {Surface, Text, useTheme, withTheme} from "react-native-paper";
import {View} from "react-native";
import {PatientMessageContext} from "../MessageContext";
import {
    ConditionalRender,
    IntraSectionInvisibleDivider,
    VisitScreen
} from "../../../../../doctor/view/patients/visit/first/forms/Layout";
import {SectionDescriptionText} from "../common/MessageStageLayout";
import * as Layout from "../../../../../doctor/view/patients/visit/first/forms/Layout";
import {WeeklyDosagePicker} from "../../../../../doctor/view/patients/visit/first/forms/WeeklyDosagePicker";

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


    onDosageUpdate = (index, dose) => {
        this.patientMessage.lastWarfarinDosage[index].dosagePA = dose;
    }

    render() {
        const dosageData = !this.state.loaded ? [] : this.patientMessage.lastWarfarinDosage.map(dosageInfo => dosageInfo.dosagePA || 0);

        return (
            <VisitScreen>
                <View>
                    <SectionDescriptionText>{'در صورتی که میزان مصرف اخیر وارفارین شما با تجویز پزشک مغایرت دارد، لطفا دوز مصرفی خود را مشخص کنید.'}</SectionDescriptionText>
                </View>
                <IntraSectionInvisibleDivider xs/>
                <Layout.FormSection>
                    <WeeklyDosagePicker
                        onDoseUpdate={this.onDosageUpdate}
                        initialData={dosageData}
                        startingDate={new Date()}
                        increment={-1}
                        disabled={false}
                        key={'dosage_picker_' + this.state.loaded}
                        // key={'weekly_dosage_' + this.state.hasNewPrescription}
                    />
                </Layout.FormSection>
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
