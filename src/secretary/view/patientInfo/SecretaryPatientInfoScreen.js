import React from "react";
import {ScreenHeader, ScreenLayout} from "../../../root/view/screen/Layout";
import {FAB, Surface, useTheme, withTheme} from "react-native-paper";
import * as Layout from "../../../doctor/view/patients/visit/first/forms/Layout";
import {View, StyleSheet} from "react-native";

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

    navigateToPatientEditScreen = () => {

    }

    render() {
        return (
                <ScreenLayout>
                    <ControlHeader
                    />
                    <PatientInfoView
                        patientInfo={this.props.route.params.patientInfo}
                    />
                    <View style={styles.fabContainer}>
                        <View style={styles.fabWrapper}>
                            <FAB
                                style={[styles.fab, {
                                    backgroundColor: this.props.theme.colors.actionColors.primary,
                                }]}
                                icon={'circle-edit-outline'}
                                // label={'ویرایش'}
                                onPress={this.navigateToPatientEditScreen}
                            />
                        </View>
                    </View>
                </ScreenLayout>
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

const styles = StyleSheet.create({
    fabContainer: {
        position: 'absolute',
        margin: 24,
        left: 0,
        bottom: 0,
    },
    fabWrapper: {
        paddingTop: 15,
        alignItems: 'center',
    },
    fab: {
    },
})