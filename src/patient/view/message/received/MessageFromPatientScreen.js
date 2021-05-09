import React from "react";
import {getFormattedJalaliDate, hasValue} from "../../../../root/domain/util/Util";
import {doctorMessageDao} from "../../../../doctor/data/dao/DoctorMessageDao";
import {LoadingScreen} from "../../../../root/view/loading/Loading";
import {ScreenHeader, ScreenLayout} from "../../../../root/view/screen/Layout";
import {View} from "react-native";
import {
    ConditionalRender, InputTitle,
    IntraSectionInvisibleDivider, Row
} from "../../../../doctor/view/patients/visit/first/forms/Layout";
import {Avatar, FAB, Surface, Text, useTheme, withTheme} from "react-native-paper";
import * as Layout from "../../../../doctor/view/patients/visit/first/forms/Layout";
import {getDisplayableValue} from "../../../../root/domain/util/DisplayUtil";
import {debugBorderRed} from "../../../../root/view/styles/borders";

class MessageFromPatientScreen extends React.Component {
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
                    <PatientMessageView
                        message={this.props.route.params.message}
                        patientMedicalInfo={this.patientMedicalInfo}
                        patientInfo={this.props.route.params.patientInfo}
                    />
                </ScreenLayout>
            </LoadingScreen>
        );
    }
}

export default withTheme(MessageFromPatientScreen);

const ControlHeader = (props) => {
    const theme = useTheme();

    return (
        <Surface style={{elevation: 4}}>
            <ScreenHeader
                title="پیام ارسالی به پزشک"
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
                lastInrTest={props.message.inr.lastInrTest}
            />
        </Layout.VisitScreen>
    )
}

const PatientComment = (props) => {
    const NoCommentMessage = ({visible}) => (
        <ConditionalRender hidden={!visible}>
            <View style={{alignItems: 'center'}}>
                <Text>{'متن پیام خالی است.'}</Text>
            </View>
        </ConditionalRender>
    );

    const hasComment = hasValue(props.message.patientComment || null);

    const _MessageBox = ({messageText}) => (
        <View>
            <Text>{messageText}</Text>
        </View>
    );

    const theme = useTheme();

    const MessageBox = ({messageText}) => (
        <Surface
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
                paddingVertical: 10,
                paddingHorizontal: 10,
            }}
        >
            <View>
                <Avatar.Icon
                    size={32}
                    icon={'message-text'}
                    style={{backgroundColor: theme.colors.accent}}
                />
            </View>
            <View
                style={{
                    paddingHorizontal: 15,
                    // width: '80%',
                    flexGrow: 1,
                    flex: 1,
                }}
            >
                <Text>{messageText}</Text>
            </View>
        </Surface>
    );


    return (
        <View>
            <MessageBox messageText={props.message.patientComment}/>
            <NoCommentMessage visible={!hasComment}/>
        </View>
    )
}

const PatientInrReport = (props) => {
    const hasLastInrTest = hasValue(props.lastInrTest.lastInrValue || null);

    const theme = useTheme();

    const InrResultBox = ({children}) => (
        <Surface
            style={{
                marginVertical: 10,
                paddingVertical: 10,
                paddingHorizontal: 10,
            }}
        >
            {children}
        </Surface>
    );

    const TableRow = ({children}) => (
        <Row
            rowReverse={false}
            justifyBetween
            style={{
                paddingVertical: 10,
                paddingLeft: 15,
                alignItems: 'center',
            }}
        >
            {children}
        </Row>
    );
    const TableCell = ({text, style}) => (
        <View
            style={{
                // width: '40%',
                flex: 1,
                justifyContent: 'center',
                ...style
            }}
        >
            <Text>{text}</Text>
        </View>
    );

    const lastInrTestDate = hasValue(props.lastInrTest.dateOfLastInrTest.timestamp) ? getFormattedJalaliDate(props.lastInrTest.dateOfLastInrTest.timestamp) : null;

    const lastInrTestPlace = props.lastInrTest.hasUsedPortableDevice ? 'Self-Test' : props.lastInrTest.lastInrTestLabInfo;
    return (
        <ConditionalRender hidden={!hasLastInrTest}>
            <View>
                <InrResultBox>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <View>
                            <Avatar.Icon
                                size={32}
                                icon={'test-tube'}
                                style={{backgroundColor: theme.colors.accent}}
                            />
                        </View>
                        <InputTitle
                            title={'گزارش INR'}
                            description={'نتایج تست آی‌ان‌آر'}
                            titleStyle={{textAlign: 'left'}}
                            descriptionStyle={{textAlign: 'left'}}
                            style={{
                                paddingHorizontal: 15,
                            }}
                        />
                    </View>
                    <IntraSectionInvisibleDivider xs/>
                    <TableRow>
                        <TableCell text={'مقدار INR'}/>
                        <TableCell text={getDisplayableValue(props.lastInrTest.lastInrValue)}/>
                    </TableRow>
                    <TableRow>
                        <TableCell text={'تاریخ تست'}/>
                        <TableCell text={getDisplayableValue(lastInrTestDate)}/>
                    </TableRow>
                    <TableRow>
                        <TableCell text={'مکان تست'}/>
                        <TableCell text={getDisplayableValue(lastInrTestPlace)}/>
                    </TableRow>
                </InrResultBox>
            </View>
            <IntraSectionInvisibleDivider sm/>
        </ConditionalRender>
    )
}
