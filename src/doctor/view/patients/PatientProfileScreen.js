
import React from "react";
import {StyleSheet, View} from "react-native";
import {ScreenHeader, ScreenLayout} from "../../../root/view/screen/Layout";
import {Button, Text} from "react-native-paper";
import {rootDao} from "../../../root/data/dao/RootDao";

class PatientProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logoutDialogVisible: false,
            isLoggingOut: false,
            user: {},
        }
    }

    componentDidMount = async () => {
        this.setState({test: Math.random()});
        const user = await rootDao.getUser();
        this.setState({user: user});
    }


    render() {
        return (
            <ScreenLayout>
                <ScreenHeader title={'محسن کریمی'}/>
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

