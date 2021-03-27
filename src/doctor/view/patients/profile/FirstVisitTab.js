import React from "react";
import {doctorDao} from "../../../data/dao/DoctorDao";
import {ScreenLayout} from "../../../../root/view/screen/Layout";
import {
    Button,
    Dialog,
    FAB,
    Portal,
    withTheme,
    Title,
    Caption,
    Headline,
    Subheading,
    Paragraph,
    List,
    TouchableRipple,
    Surface,
    Text,
} from "react-native-paper";
import {DialogMessage, FollowupVisitNotImplementedDialog, visitDialogStyles} from "../VisitRedirect";
import {StyleSheet, View, ScrollView} from "react-native";
import {ConditionalRender} from "../visit/first/forms/Layout";
import {visitDao} from "../../../data/dao/VisitDao";
import {FirstVisit} from "../../../domain/visit/Visit";
import {
    firstNonEmpty,
    getFormattedJalaliDate,
    getFormattedJalaliDateTime, getJalaliDateInDisplayableFormat,
    hasValue
} from "../../../../root/domain/util/Util";
import {PatientProfileContext} from "./ContextProvider";

class _FirstVisitTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            certifyVisitDialogOpen: false,
            doingAction: false,
        }
    }

    async componentDidMount() {
    }

    navigateToFirstVisit = (patient) => {
        this.props.navigation.navigate(
            'VisitSessionScreen',
            {userId: this.props.route.params.userId, patientName: patient.fullName, useCache: true, readonly: false}
        );
    }

    navigateToFirstVisitReadonly = (patient) => {
        this.props.navigation.navigate(
            'VisitSessionScreen',
            {userId: this.props.route.params.userId, patientName: patient.fullName, useCache: true, readonly: true}
        );
    }

    finishFirstVisit = () => {
        this.setState({doingAction: true}, async () => {
            try {
                await doctorDao.endFirstVisit(this.props.route.params.userId);
                const context = this.context;
                context.endFirstVisit();
                this.setState({doingAction: false, certifyVisitDialogOpen: false,});
            } catch (e) {
                this.setState({doingAction: false, certifyVisitDialogOpen: true,});
            }
        })
    }

    render() {
        const theme = this.props.theme;
        return (
            <PatientProfileContext.Consumer>
                {(value) => {
                    return (
                        <ScreenLayout>
                            <FirstVisitInfo firstVisit={value.firstVisit}/>
                            <View style={styles.fabContainer}>
                                <ConditionalRender hidden={!value.firstVisit.visitInfo.flags.isEnded}>
                                    <View style={styles.fabWrapper}>
                                        <FAB
                                            style={[styles.fab,]}
                                            icon={'file-eye-outline'}
                                            onPress={() => this.navigateToFirstVisitReadonly(value.patient)}
                                        />
                                    </View>
                                </ConditionalRender>
                                <ConditionalRender hidden={value.firstVisit.visitInfo.flags.isEnded }>
                                    <View style={styles.fabWrapper}>
                                        <FAB
                                            style={[styles.fab,]}
                                            icon={'circle-edit-outline'}
                                            onPress={() => this.navigateToFirstVisit(value.patient)}
                                        />
                                    </View>
                                </ConditionalRender>
                                <ConditionalRender hidden={value.firstVisit.visitInfo.flags.isEnded }>
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
                                onYes={this.finishFirstVisit}
                                loading={this.state.doingAction}
                            />
                        </ScreenLayout>
                    )}}
            </PatientProfileContext.Consumer>
        )
    }
}

_FirstVisitTab.contextType = PatientProfileContext;
export const FirstVisitTab = withTheme(_FirstVisitTab);

const FirstVisitInfo = (props) => {
    const {startDate, lastEditDate, endDate} = props.firstVisit.local;

    console.log('FirstVisitTab: first visit local key', props.firstVisit.local);
    return (
        <View style={{paddingTop: 10,}}>
            {/*<Title>مشخصات ویزیت اول</Title>*/}
            <FirstVisitInfoContainer>
                <FirstVisitInfoRow>
                    <FirstVisitInfoItem
                        title={'وضعیت'}
                        value={props.firstVisit.visitInfo.flags.isEnded ? 'به اتمام رسیده' : 'تایید نشده'}
                        itemIcon={props.firstVisit.visitInfo.flags.isEnded ? 'check-all' : 'timer-sand'}
                    />
                    <FirstVisitInfoItem
                        title={'تاریخ شروع'}
                        value={getFormattedJalaliDateTime(startDate) || 'نامشخص'}
                        itemIcon={'calendar'}
                    />
                </FirstVisitInfoRow>
                <FirstVisitInfoRow>
                    <ConditionalRender hidden={props.firstVisit.visitInfo.flags.isEnded}>
                        <FirstVisitInfoItem
                            title={'آخرین ویرایش'}
                            value={getFormattedJalaliDateTime(lastEditDate) || 'نامشخص'}
                            itemIcon={'calendar-edit'}
                        />
                    </ConditionalRender>
                    <ConditionalRender hidden={!props.firstVisit.visitInfo.flags.isEnded}>
                        <FirstVisitInfoItem
                            title={'تاریخ اتمام'}
                            value={getFormattedJalaliDateTime(endDate) || 'نامشخص'}
                            itemIcon={'calendar-check'}
                        />
                    </ConditionalRender>
                </FirstVisitInfoRow>
            </FirstVisitInfoContainer>
        </View>
    )
}


const FirstVisitInfoContainer = (props) => {
    return (
        <ScrollView
            // style={{marginBottom: 0,}}
        >
            <List.Section
                style={{
                    // flexDirection: 'row',
                    // flexWrap: 'wrap',
                }}
            >
                {props.children}
            </List.Section>
        </ScrollView>
    )
}

const FirstVisitInfoRow = (props) => {
    return <View style={{}}>
        {props.children}
    </View>
}
const FirstVisitInfoItem = (props) => {
    return (
        <View
            style={{
                paddingHorizontal: 10,
                marginVertical: 8,
            }}
        >
            <Surface
                style={{
                    elevation: 0,
                }}
            >
                <List.Subheader
                    style={{marginVertical: 0, paddingVertical: 0,}}
                >
                    {props.title}
                </List.Subheader>
                <List.Item
                    title={props.value}
                    style={{
                        paddingVertical: 0,
                    }}
                    left={() => <List.Icon icon={props.itemIcon}/>}
                />
            </Surface>
        </View>
    )
}

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