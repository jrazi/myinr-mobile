import React from "react";
import {PatientProfileContext} from "./PatientProfileScreen";
import {doctorDao, VisitState} from "../../../data/dao/DoctorDao";
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
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {visitDao} from "../../../data/dao/VisitDao";
import {FirstVisit} from "../../../domain/visit/Visit";
import {
    firstNonEmpty,
    getFormattedJalaliDate,
    getFormattedJalaliDateTime,
    hasValue
} from "../../../../root/domain/util/Util";
import {debugBorderRed} from "../../../../root/view/styles/borders";

class _FirstVisitTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            certifyVisitDialogOpen: false,
            visitInfo: FirstVisit.createNew(),
            loaded: false,
        }
    }

    async componentDidMount() {
        const {userId,} = this.props.route.params;

        doctorDao.getCachedVisit(userId)
            .then(cachedVisit => {
                this.setState({visitInfo: cachedVisit.visitInfo});
            })
            .catch(err => {
            })
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
                            <FirstVisitInfo visitInfo={this.state.visitInfo}/>
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

const FirstVisitInfo = (props) => {
    return (
        <View style={{paddingTop: 10,}}>
            {/*<Title>مشخصات ویزیت اول</Title>*/}
            <FirstVisitInfoContainer>
                <FirstVisitInfoRow>
                    <FirstVisitInfoItem
                        title={'وضعیت'}
                        value={props.visitInfo.finished ? 'به اتمام رسیده' : 'تایید نشده'}
                        itemIcon={props.visitInfo.finished ? 'check-all' : 'timer-sand'}
                    />
                    <FirstVisitInfoItem
                        title={'تاریخ شروع'}
                        value={hasValue(props.visitInfo.startDate) ? getFormattedJalaliDateTime(props.visitInfo.startDate) : 'نامشخص'}
                        itemIcon={'calendar'}
                    />
                </FirstVisitInfoRow>
                <FirstVisitInfoRow>
                    <FirstVisitInfoItem
                        title={'آخرین ویرایش'}
                        value={hasValue(props.visitInfo.lastEditedDate) ? getFormattedJalaliDateTime(props.visitInfo.lastEditedDate) : 'نامشخص'}
                        itemIcon={'calendar-edit'}
                    />
                    <ConditionalRender hidden={!props.visitInfo.finished}>
                        <FirstVisitInfoItem
                            title={'تاریخ اتمام'}
                            value={hasValue(props.visitInfo.finishDate) ? getFormattedJalaliDateTime(props.visitInfo.finishDate) : 'نامشخص'}
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
    return props.children
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
                    // paddingHorizontal: 10,
                    // paddingBottom: 10,
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