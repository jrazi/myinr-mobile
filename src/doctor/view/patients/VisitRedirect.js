import {Button, Dialog, Portal, Subheading, useTheme} from "react-native-paper";
import React, {useEffect, useState} from "react";
import {doctorDao, VisitState} from "../../data/dao/DoctorDao";
import {ScreenLayout} from "../../../root/view/screen/Layout";
import {firstNonEmpty} from "../../../root/domain/util/Util";
import {useRoute, useNavigation} from "@react-navigation/native";

export const VisitRedirect = (props) => {
    const navigation = useNavigation();

    const startVisitSession = (useCache) => {
        props.onDismiss();
        navigation.navigate(
            'VisitSessionScreen',
            {userId: props.patient.userId, patientName: props.patient.fullName, useCache: useCache}
        );
    }

    return (
        <StartVisitDialog
            visitState={props.patient.visited ? VisitState.FOLLOWUP_VISIT : VisitState.FIRST_VISIT}
            visible={props.visible}
            onDismiss={props.onDismiss}
            onBeginNew={() => startVisitSession(false)}
            onContinuePrevious={() => startVisitSession(true)}
        />
    )
}

export const StartVisitDialog = (props) => {
    if (props.visitState == VisitState.FIRST_VISIT) {
        return <StartFirstVisitDialog
            visible={props.visible} onDismiss={props.onDismiss} dismissable={true}
            onBeginNew={props.onBeginNew}
        />
    } else if (props.visitState == VisitState.FOLLOWUP_VISIT) {
        return <FollowupVisitNotImplementedDialog
            visible={props.visible} onDismiss={props.onDismiss} dismissable={true}
        />
    } else if (props.visitState == VisitState.INCOMPLETE_VISIT) {
        return <ContinueCachedVisitDialog
            visible={props.visible} onDismiss={props.onDismiss} dismissable={true}
            onBeginNew={props.onBeginNew}
            onContinue={props.onContinuePrevious}
        />
    } else return null;
}
export const ContinueCachedVisitDialog = (props) => {
    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={props.onDismiss} style={{paddingBottom: 10}} dismissable={false}>
                <DialogMessage>ویزیت قبلی این بیمار ناتمام مانده. آیا میخواهید ویزیت قبلی را ادامه دهید؟</DialogMessage>
                <Dialog.Actions style={visitDialogStyles.continueCached.dialogActions}>
                    <Button style={{}} mode="text" loading={props.loading} onPress={props.onContinue}>ادامه
                        قبلی</Button>
                    <Button style={{}} mode="text" loading={props.loading} onPress={props.onBeginNew}>ویزیت
                        جدید</Button>
                    <Button disabled={!props.dismissable} style={{}} mode="text"
                            onPress={props.onDismiss}>انصراف</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}
export const StartFirstVisitDialog = (props) => {
    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={props.onDismiss} style={{paddingBottom: 5}} dismissable={false}>
                <DialogMessage>آیا میخواهید یک جلسه ویزیت را شروع کنید؟</DialogMessage>
                <Dialog.Actions style={visitDialogStyles.firstVisit.dialogActions}>
                    <Button style={{}} labelStyle={{padding: 5}} mode="text" loading={props.loading}
                            onPress={props.onBeginNew}>بله</Button>
                    <Button disabled={!props.dismissable} style={{}} labelStyle={{padding: 5}} mode="text"
                            onPress={props.onDismiss}>خیر</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}
export const FollowupVisitNotImplementedDialog = (props) => {
    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={props.onDismiss} style={{paddingBottom: 5}} dismissable={false}>
                <DialogMessage>در حال حاضر فقط یکبار می‌توانید بیمار را ویزیت کنید.</DialogMessage>
                <Dialog.Actions style={visitDialogStyles.notImplemented.dialogActions}>
                    <Button disabled={false} style={{}} labelStyle={{padding: 5}} mode="text"
                            onPress={props.onDismiss}>قبول</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}
export const DialogMessage = (props) => {
    const theme = useTheme();
    return (
        <Dialog.Content color={theme.colors.placeholder} style={{paddingTop: 20}}>
            <Subheading style={{textAlign: 'center'}}>{props.children}</Subheading>
        </Dialog.Content>
    )
}
export const visitDialogStyles = {
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
    dialogActions: {
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    continueCached: {
        dialogActions: {
            alignItems: 'center',
            justifyContent: 'space-around',
        }
    },
    common: {}
}