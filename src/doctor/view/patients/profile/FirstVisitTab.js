import React from "react";
import {PatientProfileContext} from "./PatientProfileScreen";
import {VisitState} from "../../../data/dao/DoctorDao";
import {ScreenLayout} from "../../../../root/view/screen/Layout";
import {Button, Dialog, FAB, Portal, withTheme} from "react-native-paper";
import {DialogMessage, FollowupVisitNotImplementedDialog, visitDialogStyles} from "../VisitRedirect";
import {StyleSheet, View} from "react-native";
import {ConditionalRender} from "../visit/first/forms/Layout";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

class _FirstVisitTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            certifyVisitDialogOpen: false,
        }
    }


    navigateToFirstVisit = (patient) => {
        this.props.navigation.navigate(
            'VisitSessionScreen',
            {userId: this.props.route.params.userId, patientName: patient.fullName, useCache: true}
        );
    }

    render() {
        const theme = this.props.theme;
        return (
            <PatientProfileContext.Consumer>
                {(value) => {
                    const visitState =
                        value.patient.visitCount > 1 && value.visitState == VisitState.FOLLOWUP_VISIT
                            ? VisitState.FOLLOWUP_VISIT
                            : value.patient.visitCount > 1 && value.visitState == VisitState.FOLLOWUP_VISIT
                    return (
                        <ScreenLayout>
                            <View style={styles.fabContainer}>
                                <ConditionalRender hidden={value.firstVisit.finished == false}>
                                    <View style={styles.fabWrapper}>
                                        <FAB
                                            style={[styles.fab, {
                                                // width: 40,
                                                // height: 40,
                                            }]}
                                            // icon={() => <MaterialIcon
                                            //     name={'circle-edit-outline'}
                                            //     color={'white'} size={20}
                                            //     // style={{position: 'absolute', right: 2, top: 2}}
                                            // />}
                                            icon={'circle-edit-outline'}
                                            onPress={() => this.navigateToFirstVisit(value.patient)}
                                        />
                                    </View>
                                </ConditionalRender>
                                <ConditionalRender hidden={value.firstVisit.finished == false}>
                                    <View style={styles.fabWrapper}>
                                        <FAB
                                            style={[styles.fab, {
                                                backgroundColor: theme.colors.actionColors.confirm,
                                            }]}
                                            icon={'check-all'}
                                            onPress={() => this.setState({certifyVisitDialogOpen: true})}

                                        />
                                    </View>
                                </ConditionalRender>
                            </View>
                            <CertifyVisitDialog
                                visible={this.state.certifyVisitDialogOpen}
                                onDismiss={() => this.setState({certifyVisitDialogOpen: false})}
                            />
                        </ScreenLayout>
                    )}}
            </PatientProfileContext.Consumer>
        )
    }
}

export const FirstVisitTab = withTheme(_FirstVisitTab);

const CertifyVisitDialog = (props) => {
    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={props.onDismiss} style={{paddingBottom: 5}} dismissable={false}>
                <DialogMessage>آیا مطمئنید که میخواهید ویزیت اول را به اتمام برسانید؟</DialogMessage>
                <Dialog.Actions style={visitDialogStyles.dialogActions}>
                    <Button style={{}} labelStyle={{padding: 5}} mode="text" loading={props.loading}
                            onPress={props.onYes}>بله</Button>
                    <Button disabled={props.loading} style={{}} labelStyle={{padding: 5}} mode="text"
                            onPress={props.onDismiss}>خیر</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
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
        // marginTop: 5,
        // position: 'absolute',
        // margin: 24,
        // left: 0,
        // bottom: 0,
    },
})