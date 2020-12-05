import React from "react";
import {StyleSheet, View, ScrollView, RefreshControl} from "react-native";
import UnderConstruction from "../../root/view/screen/UnderConstruction";
import {useNavigation} from "@react-navigation/native";
import {List, Surface, Card, Title, Paragraph, Headline, Text, Caption, Subheading, DataTable, Menu, Avatar, Appbar} from "react-native-paper";
import Icons from "react-native-vector-icons/EvilIcons";
import {debugBorderRed} from "../../root/view/styles/borders";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {fullSize} from "../../root/view/styles/containers";
import {currentTheme, mostlyWhiteTheme} from "../../../theme";
import {rootDao} from "../../root/data/dao/RootDao";
import {calcAge, e2p, hasValue, jalaliTimePastInFarsi, normalizeDictForDisplay} from "../../root/domain/Util";

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
            <View style={styles.componentWrapper}>
                <Appbar.Header
                    style={{
                        paddingVertical: 40,
                        paddingHorizontal: 10,
                    }}
                    theme={mostlyWhiteTheme}
                >
                    <Appbar.Content color={currentTheme.colors.primary} title="فهرست بیماران"  />
                    <Appbar.Action icon="arrow-left" onPress={() => this.props.navigation.goBack()} color={currentTheme.colors.placeholder}/>
                </Appbar.Header>
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
            </View>
        );
    }
}

export default PatientsScreen;

const AlternatePatientInfoCard = (props) => {
    // TODO Refactor
    const nameSplitted = props.patientInfo.fullName.split(/\s+/);
    const nameChunks = [nameSplitted.shift(), nameSplitted.join(' ')];
    let latestInrTestMessage = null;
    if (hasValue(props.patientInfo.latestINR)) {
        const timePast = jalaliTimePastInFarsi(props.patientInfo.latestINR.testDate);
        latestInrTestMessage = 'آخرین گزارش INR در ' + timePast;
        if (!timePast.includes('امروز')) latestInrTestMessage += ' قبل';
    }
    if (latestInrTestMessage == null) {
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
                title={`${props.patientInfo.age} سال `}
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
    componentWrapper: {
        ...fullSize,
    },
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