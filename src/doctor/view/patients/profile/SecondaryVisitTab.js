import React from "react";
import {View} from "react-native";
import {FAB, Text, Subheading} from "react-native-paper";
import {FollowupVisitNotImplementedDialog} from "../VisitRedirect";
import {doctorDao} from "../../../data/dao/DoctorDao";
import {ScreenLayout} from "../../../../root/view/screen/Layout";
import {StyleSheet} from "react-native";
import {hasValue} from "../../../../root/domain/util/Util";
import {PatientProfileContext} from "./PatientProfileScreen";
import {EmptyList} from "../../../../root/view/list/EmptyListMessage";

export class SecondaryVisitTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newVisitDialogOpen: false,
        }
    }

    startVisitSession = (useCache) => {
        this.setState({newVisitDialogOpen: false}, () => {
            this.props.navigation.navigate(
                'VisitSessionScreen',
                {userId: this.props.route.params.userId, patientName: this.state.patient.fullName, useCache: useCache}
            );
        })
    }

    render() {
        return (
            <PatientProfileContext.Consumer>
                {(value) => {
                    return (
                        <ScreenLayout>
                            <View>
                                <EmptyList hidden={false} message={'ویزیتی تا کنون انجام نشده‌است.'}/>
                            </View>
                            <FAB
                                style={styles.fab}
                                icon={'note-plus'}
                                onPress={() => this.setState({newVisitDialogOpen: true})}
                            />
                            <StartSecondaryVisitDialog
                                visible={this.state.newVisitDialogOpen}
                                onDismiss={() => this.setState({newVisitDialogOpen: false})}
                            />
                        </ScreenLayout>
                )}}
            </PatientProfileContext.Consumer>
        )
    }
}

const StartSecondaryVisitDialog = (props) => {
    return <FollowupVisitNotImplementedDialog
        visible={props.visible}
        onDismiss={props.onDismiss}
    />;
}
const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 24,
        left: 0,
        bottom: 0,
    },
})