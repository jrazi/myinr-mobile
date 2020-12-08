
import React from "react";
import {StyleSheet, View} from "react-native";
import {ScreenHeader, ScreenLayout} from "../../../root/view/screen/Layout";
import {Button, Text} from "react-native-paper";
import {rootDao} from "../../../root/data/dao/RootDao";
import {doctorDao} from "../../data/dao/DoctorDao";
import {hasValue} from "../../../root/domain/Util";

class PatientProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patient: {},
            loading: true,
        }
    }

    componentDidMount = () => {
        if (!hasValue(this.props.route.params.nationalId)) return;
        this.refresh();
    }

    refresh = () => {
        doctorDao.getPatientInfo(this.props.route.params.nationalId)
            .then(patient => this.setState({patient: patient, loading: false}))
            .catch(err => {})
    }

    render() {
        return (
            <ScreenLayout>
                <ScreenHeader title={this.state.patient.fullName}/>
                <View>
                    <Text>HI THERE BUDDY {this.state.test}</Text>
                    <Button onPress={() => {this.props.navigation.navigate('PatientsScreen')}}>THIS IS</Button>
                </View>
            </ScreenLayout>
        );
    }
}

export default PatientProfileScreen;



const styles = StyleSheet.create({
});

