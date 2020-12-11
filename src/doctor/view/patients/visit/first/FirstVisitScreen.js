import React from "react";
import {StyleSheet, View} from "react-native";
import {Button, Text} from "react-native-paper";
import {ScreenHeader, ScreenLayout} from "../../../../../root/view/screen/Layout";

export class FirstVisitScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <ScreenLayout>
                <ScreenHeader title={'visit' + this.props.route.params.userId}/>
                <View>
                    <Text>USE CACHE: {new String(this.props.route.params.useCache).toString()} HAVE A NICE DAY</Text>
                </View>
            </ScreenLayout>
        )
    }
}

const styles = StyleSheet.create({

})