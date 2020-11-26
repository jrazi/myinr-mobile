import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { BottomNavigation, Text as PaperText } from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import DefaultTheme from "react-native-paper";

const MusicRoute = () => <PaperText>Music</PaperText>;

const AlbumsRoute = () => <PaperText>Albums</PaperText>;

const RecentsRoute = () => <PaperText>Recents</PaperText>;



class PatientApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'home', title: 'خانه', icon: 'home-outline' },
                { key: 'patients', title: 'بیماران', icon: 'clipboard-pulse-outline' },
                { key: 'visits', title: 'ویزیت‌ها', icon: 'clock-outline' },
                { key: 'profile', title: 'پروفایل من', icon: 'account-outline' },
            ]
        }
    }

    render() {
        const renderScene = BottomNavigation.SceneMap({
            home: MusicRoute,
            patients: AlbumsRoute,
            visits: RecentsRoute,
            profile: RecentsRoute,
        });

        // const colors = DefaultTheme.colors;
        return (
            <BottomNavigation
                navigationState={{index: this.state.index, routes: this.state.routes}}
                onIndexChange={(index) => {this.setState({index: index})}}
                renderScene={renderScene}
                shifting={false}
                theme={{ colors: {primary: '#FFFFFF', background: '#E744AB'} }}
            />
        );
    }
};

class _PatientApp extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {}
    }

    componentDidMount = async () => {
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>PATIENT APP</Text>
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

export default PatientApp;