import React from "react";
import {ScreenHeader, ScreenLayout} from "../../../root/view/screen/Layout";
import {Avatar, FAB, Surface, Text, useTheme, withTheme} from "react-native-paper";
import * as Layout from "../../../doctor/view/patients/visit/first/forms/Layout";
import {View, StyleSheet} from "react-native";
import {calcAge, getFormattedJalaliDate, hasValue} from "../../../root/domain/util/Util";
import {
    ConditionalRender,
    InputTitle,
    IntraSectionInvisibleDivider,
    Row
} from "../../../doctor/view/patients/visit/first/forms/Layout";
import {getDisplayableFarsiValue, getDisplayableValue} from "../../../root/domain/util/DisplayUtil";
import {PatientDetailedInfoCard} from "../../../doctor/view/patients/profile/PatientInfoTab";

class SecretaryPatientInfoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            loaded: true,
        }
    }

    componentDidMount = async () => {
    }

    navigateToPatientEditScreen = () => {

    }

    render() {
        return (
                <ScreenLayout>
                    <ControlHeader
                    />
                    <PatientInfoView
                        patientInfo={this.props.route.params.patientInfo}
                    />
                    <View style={styles.fabContainer}>
                        <View style={styles.fabWrapper}>
                            <FAB
                                style={[styles.fab, {
                                    backgroundColor: this.props.theme.colors.actionColors.primary,
                                }]}
                                icon={'circle-edit-outline'}
                                // label={'ویرایش'}
                                onPress={this.navigateToPatientEditScreen}
                            />
                        </View>
                    </View>
                </ScreenLayout>
        );
    }
}

export default withTheme(SecretaryPatientInfoScreen);

const ControlHeader = (props) => {
    const theme = useTheme();
    const headerTitle = 'اطلاعات بیمار';
    return (
        <Surface style={{elevation: 4}}>
            <ScreenHeader
                title={headerTitle}
                style={{elevation: 0}}
            />
        </Surface>
    )
}

const PatientInfoView = (props) => {
    const personalInfoItems = [
        {
            id: 'FULL_NAME',
            name: 'نام',
            value: props.patientInfo.fullName,
        },
        {
            id: 'AGE',
            name: 'سن',
            value: calcAge(props.patientInfo.decoratedBirthDate.jalali.asString),
        },
        {
            id: 'BIRTH_DATE',
            name: 'تاریخ تولد',
            value: props.patientInfo.decoratedBirthDate.jalali.asString,
        },
        {
            id: 'NATIONAL_ID',
            name: 'کد ملی',
            value: props.patientInfo.nationalId,
        },
        {
            id: 'LOCATION',
            name: 'آدرس',
            value: props.patientInfo.address,
        },
    ];

    const contactInfoItems = [
        {
            id: 'MOBILE',
            name: 'تلفن همراه',
            value: props.patientInfo.mobile,
        },
        {
            id: 'EMERGENCY_PHONE',
                name: 'تماس اضطراری',
            value: props.patientInfo.emergencyPhone,
        },
        {
            id: 'EMAIL',
            name: 'ایمیل',
            value: props.patientInfo.email,
            disableDigitConversion: true,
        },
    ]

    const medicalInfoItems = [
        {
            id: 'PHYSICIAN_NAME',
            name: 'پزشک معالج',
            value: 'دکتر' + ' ' + props.patientInfo.physician.lastName,
        },
    ]

    return (
        <Layout.VisitScreen
        >
            <PatientInfoSection
                sectionTitle={'مشخصات فردی'}
                items={personalInfoItems}
            />
            <PatientInfoSection
                sectionTitle={'اطلاعات تماس'}
                items={contactInfoItems}
            />
            <PatientInfoSection
                sectionTitle={'اطلاعات پزشکی'}
                items={medicalInfoItems}
            />
            <IntraSectionInvisibleDivider m/>
        </Layout.VisitScreen>
    )
}

const PatientInfoSection = (props) => {

    const theme = useTheme();

    const SectionWrapper = ({children}) => (
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
                flex: 1,
                justifyContent: 'center',
                ...style
            }}
        >
            <Text>{text}</Text>
        </View>
    );

    const infoRows = props.items.map(item => {
        return (
            <TableRow key={'info_row_' + item.id}>
                <TableCell text={item.name}/>
                <TableCell text={item.disableDigitConversion ? getDisplayableValue(item.value) : getDisplayableFarsiValue(item.value)}/>
            </TableRow>
        )
    })
    return (
        <ConditionalRender hidden={false}>
            <View>
                <SectionWrapper>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <View>
                            <Avatar.Icon
                                size={32}
                                icon={props.sectionIcon || 'information-variant'}
                                style={{backgroundColor: theme.colors.accent}}
                            />
                        </View>
                        <InputTitle
                            title={props.sectionTitle}
                            description={props.sectionDescription}
                            titleStyle={{textAlign: 'left'}}
                            descriptionStyle={{textAlign: 'left'}}
                            style={{
                                paddingHorizontal: 15,
                            }}
                        />
                    </View>
                    <IntraSectionInvisibleDivider xs/>
                    {infoRows}
                </SectionWrapper>
            </View>
            <IntraSectionInvisibleDivider s/>
        </ConditionalRender>
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