import React from "react";
import {StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {ScreenLayout} from "../../../../../root/view/screen/Layout";
import {currentTheme} from "../../../../../../theme";


export class PreliminaryStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <ScreenLayout>
                <Text>PRELIMINARY</Text>
            </ScreenLayout>
        )
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: currentTheme.colors.surface,
    }
})