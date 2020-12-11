
import React from "react";
import {StyleSheet, View} from "react-native";
import {ScreenHeader, ScreenLayout} from "../../../root/view/screen/Layout";
import {doctorDao, VisitState} from "../../data/dao/DoctorDao";
import {hasValue} from "../../../root/domain/util/Util";
import {currentTheme} from "../../../../theme";
import HomeScreen from "../HomeScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {Button, Dialog, FAB, Headline, Paragraph, Portal, Subheading, Text} from 'react-native-paper';

const Tab = createMaterialTopTabNavigator();

class PatientProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patient: {},
            loading: true,
            newVisitDialogOpen: false,
            visitState: null,
        }
    }

    componentDidMount = () => {
        if (!hasValue(this.props.route.params.userId)) return;
        this.refresh();
    }

    refresh = () => {
        doctorDao.getPatientInfo(this.props.route.params.userId)
            .then(patient => this.setState({patient: patient, loading: false}))
            .catch(err => {})

        doctorDao.getVisitState(this.props.route.params.userId)
            .then(visitState => this.setState({visitState: visitState}))
            .catch(err => {})
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
        const colors = currentTheme.colors;
        return (
            <ScreenLayout>
                <ScreenHeader title={this.state.patient.fullName} style={{elevation: 0}}/>
                <Tab.Navigator
                    initialRouteName={"Home"}
                    barStyle={{ backgroundColor: colors.background }}
                    shifting={false}
                    backBehavior={'history'}
                    activeColor={currentTheme.colors.primary}
                    inactiveColor={currentTheme.colors.placeholder}
                    lazy={false}
                    tabBarOptions={{
                        // activeTintColor: currentTheme.colors.primary,
                        indicatorStyle: {
                            borderBottomWidth: 2,
                            borderColor: currentTheme.colors.primary,
                        },
                        labelStyle: {
                            fontSize: 14,
                        },
                    }}
                >
                    <Tab.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            tabBarLabel: 'مشخصات',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="home-outline" color={color} size={26} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="PatientsTab"
                        component={HomeScreen}
                        options={{
                            tabBarLabel: 'ویزیت‌ها',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="clipboard-pulse-outline" color={color} size={26} />
                            ),
                        }}

                    />
                    <Tab.Screen
                        name="Visits"
                        component={HomeScreen}
                        options={{
                            tabBarLabel: 'آزمایش‌ها',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="clipboard-pulse-outline" color={color} size={26} />
                            ),
                        }}

                    />
                </Tab.Navigator>
                <FAB
                    style={styles.fab}
                    icon={'note-plus'}
                    onPress={() => this.setState({newVisitDialogOpen: true})}
                />
                <StartVisitDialog
                    visitState={5 > 3 ? VisitState.INCOMPLETE_VISIT : this.state.visitState} // TODO temp values
                    visible={this.state.newVisitDialogOpen}
                    onDismiss={() => this.setState({newVisitDialogOpen: false})}
                    onBeginNew={() => this.startVisitSession(false)}
                    onContinuePrevious={() => this.startVisitSession(true)}
                />
            </ScreenLayout>
        );
    }
}

export default PatientProfileScreen;

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 20,
        left: 0,
        bottom: 0,
    },
})

const StartVisitDialog = (props) => {
    if (props.visitState == VisitState.FIRST_VISIT) {
        return <StartFirstVisitDialog
            visible={props.visible} onDismiss={props.onDismiss} dismissable={true}
            onBeginNew={props.onBeginNew}
        />
    }
    else if (props.visitState == VisitState.FOLLOWUP_VISIT) {
        return <FollowupVisitNotImplementedDialog
            visible={props.visible} onDismiss={props.onDismiss} dismissable={true}
        />
    }
    else if (props.visitState == VisitState.INCOMPLETE_VISIT) {
        return <ContinueCachedVisitDialog
            visible={props.visible} onDismiss={props.onDismiss} dismissable={true}
            onBeginNew={props.onBeginNew}
            onContinue={props.onContinuePrevious}
        />
    }
    else return null;
}

// TODO Refactor: Reuse components
const ContinueCachedVisitDialog = (props) => {
    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={props.onDismiss} style={{paddingBottom: 10}} dismissable={false}>
                <DialogMessage>ویزیت قبلی این بیمار ناتمام مانده. آیا میخواهید ویزیت قبلی را ادامه دهید؟</DialogMessage>
                <Dialog.Actions style={visitDialogStyles.continueCached.dialogActions}>
                    <Button style={{ }} mode="text" loading={props.loading} onPress={props.onContinue} >ادامه قبلی</Button>
                    <Button style={{ }} mode="text" loading={props.loading} onPress={props.onBeginNew} >ویزیت جدید</Button>
                    <Button disabled={!props.dismissable} style={{ }} mode="text" onPress={props.onDismiss} >انصراف</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

const StartFirstVisitDialog = (props) => {
    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={props.onDismiss} style={{paddingBottom: 5}} dismissable={false}>
                <DialogMessage>آیا میخواهید یک جلسه ویزیت را شروع کنید؟</DialogMessage>
                <Dialog.Actions style={visitDialogStyles.firstVisit.dialogActions}>
                    <Button style={{}} labelStyle={{padding: 5}} mode="text" loading={props.loading} onPress={props.onBeginNew} >بله</Button>
                    <Button disabled={!props.dismissable} style={{}} labelStyle={{padding: 5}} mode="text" onPress={props.onDismiss} >خیر</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

const FollowupVisitNotImplementedDialog = (props) => {
    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={props.onDismiss} style={{paddingBottom: 5}} dismissable={false}>
                <DialogMessage>در حال حاضر فقط یکبار می‌توانید بیمار را ویزیت کنید.</DialogMessage>
                <Dialog.Actions style={visitDialogStyles.notImplemented.dialogActions}>
                    <Button disabled={false} style={{}} labelStyle={{padding: 5}} mode="text" onPress={props.onDismiss} >باشه</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

const DialogMessage = (props) => {return (
    <Dialog.Content color={currentTheme.colors.placeholder} style={{paddingTop: 20}}>
        <Subheading style={{textAlign: 'center'}}>{props.children}</Subheading>
    </Dialog.Content>
)}

const visitDialogStyles = {
    notImplemented: {
        dialogActions: {
            alignItems: 'center',
            justifyContent: 'center',
        }
    },
    firstVisit: {
        dialogActions: {
            alignItems: 'center',
            justifyContent: 'space-around',
        }
    },
    continueCached: {
        dialogActions: {
            alignItems: 'center',
            justifyContent: 'space-around',
        }
    },
    common: {

    }
}