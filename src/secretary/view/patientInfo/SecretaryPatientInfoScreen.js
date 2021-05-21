import React from "react";
import {LoadingScreen} from "../../../root/view/loading/Loading";
import {ScreenHeader, ScreenLayout} from "../../../root/view/screen/Layout";
import {Surface, useTheme, withTheme} from "react-native-paper";
import * as Layout from "../../../doctor/view/patients/visit/first/forms/Layout";

class SecretaryPatientInfoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            loaded: true,
        }
    }

    componentDidMount = async () => {
    }

    render() {
        return (
            <LoadingScreen loaded={this.state.loaded}>
                <ScreenLayout>
                    <ControlHeader
                    />
                    <PatientInfoView
                        patientInfo={this.props.route.params.patientInfo}
                    />
                </ScreenLayout>
            </LoadingScreen>
        );
    }
}

export default withTheme(SecretaryPatientInfoScreen);

const ControlHeader = (props) => {
    const theme = useTheme();
    const headerTitle = 'اطلاعات بیمار';
    return (
        <Surface style={{elevation: 4}}>
            <ScreenHeader
                title={headerTitle}
                style={{elevation: 0}}
            />
        </Surface>
    )
}

const PatientInfoView = (props) => {
    return (
        <Layout.VisitScreen
        >
        </Layout.VisitScreen>
    )
}
