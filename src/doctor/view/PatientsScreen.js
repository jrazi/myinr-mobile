import React from "react";
import {StyleSheet, Text, View} from "react-native";
import UnderConstruction from "../../root/view/screen/UnderConstruction";
import {useNavigation} from "@react-navigation/native";
import {List} from "react-native-paper";

const patientsInfo = [
    {
        fullName: 'رامتین ترکاشوند',
        age: 65,
        sex: 'M',
        illness: 'آریتمی قلب',
        lastVisit: '۹۹/۰۸/۲۷',
    }
];

class PatientsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {}
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.patientsListContainer}>
                    <List.Section>
                        <PatientInfoCard
                            title={'مشخصات کاربر'}
                            left={(props) => <List.Icon icon={'circle-edit-outline'}/>}
                        />
                    </List.Section>
                </View>
            </View>
        );
    }
}

export default PatientsScreen;

const PatientInfoCard = (props) => {
    return (
        <List.Item
            style={styles.patientInfoCard}
            title="First Item"
            description="Item description"
            left={() => <List.Icon icon="folder"/>}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 200,
        paddingHorizontal: 40,
        backgroundColor: '#fff',
        flex: 1,
    },

    patientsListContainer: {

    },
    patientInfoCardContainer: {
    },
    patientInfoCard: {
    }
});