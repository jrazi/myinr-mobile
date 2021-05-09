import React from "react";
import {e2p, getFormattedJalaliDate, hasValue} from "../../../../root/domain/util/Util";
import {LoadingScreen} from "../../../../root/view/loading/Loading";
import {ScreenHeader, ScreenLayout} from "../../../../root/view/screen/Layout";
import {StyleSheet, View} from "react-native";
import {
    ConditionalRender, InputTitle,
    IntraSectionInvisibleDivider, Row
} from "../../../../doctor/view/patients/visit/first/forms/Layout";
import {Avatar, FAB, Surface, Text, useTheme, withTheme} from "react-native-paper";
import * as Layout from "../../../../doctor/view/patients/visit/first/forms/Layout";
import {PhysicianMessage} from "../../../../doctor/domain/visit/PhysicianMessage";


class MessageFromPhysicianScreen extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            loaded: true,
        }
    }

    componentDidMount = async () => {
    }


    render() {
        return (
            <LoadingScreen loaded={this.state.loaded}>
                <ScreenLayout>
                    <ControlHeader
                    />
                    <MessageFromPhysicianView
                        message={this.props.route.params.message}
                        patientMedicalInfo={this.props.route.params.patientMedicalInfo}
                        patientInfo={this.props.route.params.patientInfo}
                    />
                </ScreenLayout>
            </LoadingScreen>
        );
    }
}

export default withTheme(MessageFromPhysicianScreen);

const ControlHeader = (props) => {
    const theme = useTheme();

    return (
        <Surface style={{elevation: 4}}>
            <ScreenHeader
                title="پیام از پزشک"
                style={{elevation: 0}}
            />
        </Surface>
    )
}

const MessageFromPhysicianView = (props) => {
    return (
        <Layout.VisitScreen
        >
            <PhysicianInstructions
                message={props.message}
            />
            <PhysicianComment
                message={props.message}
            />
            <IntraSectionInvisibleDivider sm/>
        </Layout.VisitScreen>
    )
}

const PhysicianInstructions = (props) => {

    const theme = useTheme();

    const hasMainInstructions = (props.message.physicianInstructions.length > 0);
    const hasDaysWithoutWarfarinRecommended = props.message.physicianInstructions.recommendedDaysWithoutWarfarin > 0;
    const hasNextInrCheckDate = (props.message.nextInrCheckDate.jalali.asString || null) != null;

    const hasInstruction = hasMainInstructions || hasDaysWithoutWarfarinRecommended || hasNextInrCheckDate;

    const Instruction = ({instructionText}) => (
        <Surface
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
                paddingVertical: 5,
                paddingHorizontal: 10,
            }}
        >
            <View>
                <Avatar.Icon
                    size={32}
                    icon={'comment-alert'}
                    style={{backgroundColor: theme.colors.accent}}
                />
            </View>
            <View
                style={{
                    paddingHorizontal: 10,
                    // width: '80%',
                    flexGrow: 1,
                    flex: 1,
                }}
            >
                <Text>{instructionText}</Text>
            </View>
        </Surface>
    );

    const instructions = props.message.physicianInstructions.map(instruction => <Instruction key={'ins_' + instruction.name} instructionText={instruction.name}/>)
    if (hasDaysWithoutWarfarinRecommended)
        instructions.push(
            <Instruction
                key={'ins_stop_warfarin'}
                instructionText={'مصرف وارفارین را برای' + ' ' + props.message.physicianInstructions.recommendedDaysWithoutWarfarin + ' ' + 'روز متوقف کنید.'}
            />
        );

    if (hasNextInrCheckDate) {
        let nextInrCheckDate = getFormattedJalaliDate(props.message.nextInrCheckDate.timestamp, 'DD MMMM YYYY');
        instructions.push(
            <Instruction
                key={'ins_next_inr_date'}
                instructionText={
                    'آی‌ان‌آر خود را در تاریخ'
                    + ' '
                    + nextInrCheckDate
                    + ' '
                    + 'اندازه‌گیری بفرمایید.'
                }
            />
        );
    }

    return (
        <ConditionalRender hidden={!hasInstruction}>
            <View>
                <InputTitle title={'دستورالعمل‌ها'} titleStyle={{textAlign: 'left'}}/>
                <IntraSectionInvisibleDivider xs/>
                {instructions}
            </View>
            <IntraSectionInvisibleDivider sm/>
        </ConditionalRender>
    )
}

const PhysicianComment = (props) => {
    const NoCommentMessage = ({visible}) => (
        <ConditionalRender hidden={!visible}>
            <View style={{alignItems: 'center'}}>
                <Text>{'توضیحی از سوی پزشک ارسال نشده‌است.'}</Text>
            </View>
        </ConditionalRender>
    );

    const hasComment = hasValue(props.message.physicianComment || null);

    const MessageBox = ({messageText}) => (
        <View>
            <Text>{messageText}</Text>
        </View>
    );

    return (
        <View>
            <InputTitle title={'توضیحات پزشک'} titleStyle={{textAlign: 'left'}}/>
            <IntraSectionInvisibleDivider xs/>
            <MessageBox messageText={props.message.physicianComment}/>
            <NoCommentMessage visible={!hasComment}/>
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
