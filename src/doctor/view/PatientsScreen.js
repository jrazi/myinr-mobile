import React from "react";
import {StyleSheet, View, ScrollView, RefreshControl} from "react-native";
import {List, Surface, Card, Title, Paragraph, Headline, Text, Caption, Subheading, DataTable, Menu, Avatar, Appbar} from "react-native-paper";
import Icons from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {fullSize} from "../../root/view/styles/containers";
import {currentTheme, mostlyWhiteTheme} from "../../../theme";
import {rootDao} from "../../root/data/dao/RootDao";
import {calcAge, e2p, hasValue, jalaliTimePastInFarsi, normalizeDictForDisplay} from "../../root/domain/Util";
import {ScreenHeader, ScreenLayout} from "../../root/view/screen/Layout";

class PatientsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            patients: [],
            loading: true,
        }
    }

    async componentDidMount() {
        this.refresh();
    }

    refresh = () => {
        this.setState({loading: true}, () => {
            rootDao.withRefresh()
                .getUser()
                .then(user => {
                    this.setState({
                        patients: user.patients,
                        loading: false,
                    })
                })
                .catch(err => {
                    this.setState({
                        loading: false,
                    })
                });
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }


    render() {
        const patientInfoCards = [];
        for (var patient of this.state.patients) {
            patient.age = calcAge(patient.birthDate);
            patient = normalizeDictForDisplay(patient, 'FA');
            patientInfoCards.push(
                <PatientInfoCard
                    key={patient.nationalId + patient.username}
                    patientInfo={patient}
                />
            );
        }
        return (
            <ScreenLayout>
                <ScreenHeader
                    title="فهرست بیماران"
                />
                <ScrollView
                    style={styles.container}
                    refreshControl={
                        <RefreshControl refreshing={this.state.loading} onRefresh={this.refresh} colors={[currentTheme.colors.placeholder]} />
                    }
                >
                    <View style={styles.patientsListContainer}>
                        <List.Section>
                            {patientInfoCards}
                        </List.Section>
                    </View>
                </ScrollView>
            </ScreenLayout>
        );
    }
}

export default PatientsScreen;

const AlternatePatientInfoCard = (props) => {
    // TODO Refactor
    const nameSplitted = props.patientInfo.fullName.split(/\s+/);
    const nameChunks = [nameSplitted.shift(), nameSplitted.join(' ')];
    let latestInrTestMessage = null;
    let timePast = null;
    if (hasValue(props.patientInfo.latestINR)) {
        timePast = jalaliTimePastInFarsi(props.patientInfo.latestINR.testDate);
        latestInrTestMessage = 'آخرین گزارش INR در ' + timePast;
        if (timePast != null && !timePast.includes('امروز')) latestInrTestMessage += ' قبل';
    }
    if (timePast == null) {
        latestInrTestMessage = 'عدم ثبت شاخص INR';
    }
    return (
        <Surface style={styles.patientInfoCardContainer}>
            <Card>
                <Card.Title
                    title={props.patientInfo.fullName}
                    subtitle={latestInrTestMessage}
                    left={() => <Avatar.Text size={32} label={nameChunks[0][0] + '.' + nameChunks[1][0]} />}
                />
                <Card.Content>
                    <View >
                        <PatientCardDetails patientInfo={props.patientInfo}/>
                    </View>
                </Card.Content>
            </Card>
        </Surface>
    );
}

const PatientInfoCard = (props) => {
    return (<AlternatePatientInfoCard {...props}/>);
    return (
        <Surface style={styles.patientInfoCardContainer}>
            <List.Item
                style={styles.patientInfoCard}
                title={props.patientInfo.fullName}
                // description={() => <PatientCardDetails patientInfo={props.patientInfo}/>}
                left={() => <Icons style={styles.avatar} name={'user'} size={64}/>}
                titleStyle={{paddingHorizontal: 10, paddingBottom: 10}}
                descriptionStyle={{paddingHorizontal: 10, paddingBottom: 10}}
            />
        </Surface>
    );
}

const PatientCardDetails = (props) => {
    return ([
        <Row key={'first'}>
            <InfoItem
                title={props.patientInfo.medicalCondition}
                customIcon={<MaterialCommunityIcons name="stethoscope" size={20} color={currentTheme.colors.placeholder}/>}
            />
            <InfoItem
                wrapperStyle={{
                    paddingLeft: 40,
                }}
                title={props.patientInfo.age != 'نامشخص' ?  `${props.patientInfo.age} سال ` : 'نامشخص'}
                customIcon={<MaterialCommunityIcons name={'calendar-account'} size={20} color={currentTheme.colors.placeholder}/>}
            />
        </Row>,
        <Row key={'second'}>
            <InfoItem
                title={props.patientInfo.mobile}
                customIcon={<MaterialCommunityIcons name="cellphone" size={20} color={currentTheme.colors.placeholder}/>}
            />
            <InfoItem
                wrapperStyle={{
                    paddingLeft: 40,
                }}
                title={props.patientInfo.birthPlace}
                customIcon={<MaterialCommunityIcons name={'map-marker-outline'} size={20} color={currentTheme.colors.placeholder}/>}
            />
        </Row>
    ]);
}

const InfoItem = (props) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexBasis: '50%',
                ...props.wrapperStyle
            }}
        >
            <View
                style={{
                    paddingHorizontal: 4,
                }}
            >
                {props.customIcon}
            </View>
            <View
                style={{
                    paddingHorizontal: 4,
                }}
            >
                <Text>{props.title}</Text>
            </View>
        </View>
    )
}
const Row = (props) => {return (
    <View
        style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 10,
        }}
    >
        {props.children}
    </View>
)}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        // backgroundColor: '#fff',
        flex: 1,
    },

    patientsListContainer: {
        paddingVertical: 10,
    },
    patientInfoCardContainer: {
        elevation: 4,
        marginVertical: 10,
    },
    patientInfoCard: {
    },
    patientCardDetails: {
    }
});