import React from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {ScreenHeader, ScreenLayout, TitleOnlyScreenHeader} from "../../../../root/view/screen/Layout";
import {FAB, Surface, Text, useTheme, withTheme} from "react-native-paper";
import {
    ConditionalCollapsibleRender,
    ConditionalRender,
    InputTitle,
    IntraSectionInvisibleDivider,
    Row
} from "../visit/first/forms/Layout";
import {PatientInfoStage} from "../televisit/stages/PatientInfoStage";
import {ItemListContainer} from "../../../../root/view/list/ItemList";
import {e2p, getFormattedJalaliDate, hasValue, noop} from "../../../../root/domain/util/Util";
import {EmptyList} from "../../../../root/view/list/EmptyListMessage";
import {PhysicianMessage} from "../../../domain/visit/PhysicianMessage";
import * as Layout from "../visit/first/forms/Layout";
import {LoadingScreen} from "../../../../root/view/loading/Loading";
import {doctorMessageDao} from "../../../data/dao/DoctorMessageDao";

class ReceivedMessageScreen extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            loaded: false,
        }
        this.patientMedicalInfo = null;
    }

    componentDidMount = async () => {
        this.patientMedicalInfo = this.props.route.params.patientMedicalInfo;
        if (hasValue(this.patientMedicalInfo))
            this.setState({loaded: true});
        else {
            this.patientMedicalInfo = await doctorMessageDao.getPatientMedicalInfo(this.props.route.params.message.patientUserId);
            this.setState({loaded: true});
        }
    }

    startTeleVisitSession = () => {
        this.props.navigation.navigate(
            'TeleVisitSessionScreen',
            {
                patientUserId: this.props.route.params.patientInfo.patientUserId,
            },
        );
    }

    render() {
        return (
            <LoadingScreen loaded={this.state.loaded}>
                <ScreenLayout>
                    <ControlHeader
                        patientName={this.props.route.params.patientInfo.fullName}
                    />
                    <PatientMessageView
                        message={this.props.route.params.message}
                        patientMedicalInfo={this.patientMedicalInfo}
                        patientInfo={this.props.route.params.patientInfo}
                    />
                    <View style={styles.fabContainer}>
                        <ConditionalRender hidden={false}>
                            <View style={styles.fabWrapper}>
                                <FAB
                                    style={[styles.fab, {
                                        backgroundColor: this.props.theme.colors.actionColors.primary,
                                    }]}
                                    icon={'send'}
                                    onPress={this.startTeleVisitSession}
                                />
                            </View>
                        </ConditionalRender>
                    </View>
                </ScreenLayout>
            </LoadingScreen>
        );
    }
}

export default withTheme(ReceivedMessageScreen);

const ControlHeader = (props) => {
    const theme = useTheme();

    return (
        <Surface style={{elevation: 4}}>
            <ScreenHeader
                title={props.patientName}
                // title="پیام بیمار"
                style={{elevation: 0}}
            />
        </Surface>
    )
}

const PatientMessageView = (props) => {
    return (
        <Layout.VisitScreen
        >
            <PatientComment
                message={props.message}
            />
            <IntraSectionInvisibleDivider sm/>
            <PatientInrReport
                message={props.message}
                patientInfo={props.patientInfo}
            />
            <IntraSectionInvisibleDivider sm/>
            <LatestDosageReport
                lastWarfarinDosage={props.patientMedicalInfo.lastWarfarinDosage}
            />
        </Layout.VisitScreen>
    )
}

const PatientComment = (props) => {
    const NoCommentMessage = ({visible}) => (
        <ConditionalRender hidden={!visible}>
            <View style={{alignItems: 'center'}}>
                <Text>{'توضیحی از سوی بیمار ارسال نشده‌است.'}</Text>
            </View>
        </ConditionalRender>
    );

    const hasComment = hasValue(props.message.patientComment || null);

    const MessageBox = ({messageText}) => (
        <View>
            <Text>{messageText}</Text>
        </View>
    );

    return (
        <View>
            <InputTitle title={'توضیحات بیمار'} titleStyle={{textAlign: 'left'}}/>
            <IntraSectionInvisibleDivider xs/>
            <MessageBox messageText={props.message.patientComment}/>
            <NoCommentMessage visible={!hasComment}/>
        </View>
    )
}

const PatientInrReport = (props) => {
    const NoInrMessage = ({visible}) => (
        <ConditionalRender hidden={!visible}>
            <View style={{alignItems: 'center'}}>
                <Text>{'آی‌ان‌آر بیمار در این پیام گزارش نشده‌است.'}</Text>
            </View>
        </ConditionalRender>
    );

    return (
        <View>
            <InputTitle title={'آی‌ان‌آر'} titleStyle={{textAlign: 'left'}}/>
            <IntraSectionInvisibleDivider xs/>
            <NoInrMessage visible={true}/>
        </View>
    )
}

const LatestDosageReport = (props) => {
    const lastWarfarinDosage = props.lastWarfarinDosage || PhysicianMessage.createRecommendedDosageForNextWeek();

    const getDisplayableDosageValue = (dosage) => hasValue(dosage) ? e2p(dosage*1.25 + ' ' + 'میلی‌گرم') : 'نامشخص';

    const TableRow = ({children}) => (
        <Row
            rowReverse={false}
            justifyBetween
            style={{
                paddingVertical: 10,
            }}
        >
            {children}
        </Row>
    );
    const TableCell = ({text, style}) => (
        <View
            style={{
                width: '35%',
                justifyContent: 'center',
                alignItems: 'center',
                ...style
            }}
        >
            <Text>{text}</Text>
        </View>
    );

    const DosageDateCell = ({date}) => {
        const formattedDate = hasValue(date) ? getFormattedJalaliDate(date.timestamp, 'dddd DD MMMM') : '';
        return (
            <TableCell text={formattedDate} style={{width: '25%'}}/>
        )
    }

    const DosageDataRow = ({dosage}) => (
        <TableRow>
            <DosageDateCell date={dosage.dosageDate}/>
            <TableCell text={getDisplayableDosageValue(dosage.dosagePH)}/>
            <TableCell text={getDisplayableDosageValue(dosage.dosagePA)}/>
        </TableRow>
    );

    const tableData = lastWarfarinDosage.map((dosageRecord, index) => <DosageDataRow dosage={dosageRecord} key={`dosage_data_${index}`}/>);


    return (
        <View>
            <InputTitle title={'دوز مصرف وارفارین'} titleStyle={{textAlign: 'left'}}/>
            <IntraSectionInvisibleDivider xs/>
            <TableRow key={'header_row'}>
                <DosageDateCell date={null}/>
                <TableCell text={'دوز تجویزی'}/>
                <TableCell text={'دوز گزارش‌شده'}/>
            </TableRow>
            {tableData}
        </View>
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
    },
})
