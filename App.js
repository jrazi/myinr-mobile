import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MockServerGateway from "./src/service/server/MockServerGateway";
import UserDao from "./src/service/data/UserDao";

let server = new MockServerGateway();
let userDao = new UserDao();

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {}
    }

    componentDidMount = async () => {
        let patient = server.fetchUserDataWithLogin(null, null);
        await userDao.saveUser(patient);
        this.user = await userDao.getUser();
        this.setState(this.state)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>HERE IS THE USER {this.user.username} OK {this.user.fullName}</Text>
                <StatusBar style="auto" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

