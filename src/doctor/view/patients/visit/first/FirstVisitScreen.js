import React from "react";
import {StyleSheet, View} from "react-native";
import {Button, Text} from "react-native-paper";
import {ScreenHeader, ScreenLayout} from "../../../../../root/view/screen/Layout";
import {FirstVisit} from "../../../../domain/visit/Visit";
import {doctorDao} from "../../../../data/dao/DoctorDao";

const FIRST_STAGE = '';

export class FirstVisitScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visitInfo: FirstVisit.createNew(),
            currentStage: FIRST_STAGE,
        }
    }

    componentDidMount() {
        const {userId, useCache} = this.props.route.params;
        if (useCache != true) return;

        doctorDao.getCachedVisit(userId)
            .then(cachedVisit => {
                this.setState({visitInfo: cachedVisit.visitInfo, currentStage: cachedVisit.currentStage})
            })
            .catch(err => {
                this.setState({visitInfo: FirstVisit.createNew(), currentStage: FIRST_STAGE})
            })
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