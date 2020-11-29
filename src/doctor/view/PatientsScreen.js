import React from "react";
import {StyleSheet, View, ScrollView} from "react-native";
import UnderConstruction from "../../root/view/screen/UnderConstruction";
import {useNavigation} from "@react-navigation/native";
import {List, Surface, Card, Title, Paragraph, Headline, Text, Caption, Subheading, DataTable, Menu, Avatar, Appbar} from "react-native-paper";
import Icons from "react-native-vector-icons/EvilIcons";
import {debugBorderRed} from "../../root/view/styles/borders";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {fullSize} from "../../root/view/styles/containers";
import {currentTheme, mostlyWhiteTheme} from "../../../App";

const patientList = [
    {
        username: 'rtark',
        fullName: 'رامتین ترکاشوند',
        age: '۶۵',
        sex: 'M',
        illness: 'آریتمی قلب',
        lastVisit: '۹۹/۰۸/۲۷',
    },
    {
        username: 'armin_raisi',
        fullName: 'آرمان رئیسی',
        age: '۵۸',
        sex: 'M',
        illness: ' نارسایی دریچه قلب',
        lastVisit: '۹۹/۰۶/۱۱',
    },
    {
        username: 'maetav',
        fullName: 'مائده زارع',
        age: '۴۲',
        sex: 'F',
        illness: 'ترومبوز سیاهرگی',
        lastVisit: '۹۹/۰۵/۱۱',
    },
    {
        username: 'fargo',
        fullName: 'فرشید قربانی',
        age: '۶۰',
        sex: 'M',
        illness: 'نارسایی دریچه قلب',
        lastVisit: '۹۹/۰۸/۰۱',
    },
    {
        username: 'alidav',
        fullName: 'علی داوودنژاد',
        age: '۸۳',
        sex: 'M',
        illness: 'نامشخص',
        lastVisit: '۹۹/۰۳/۰۵',
    },
    {
        username: 'fatemenas',
        fullName: 'فاطمه نصیری',
        age: '۵۱',
        sex: 'F',
        illness: 'آریتمی قلب',
        lastVisit: '۹۹/۰۷/۲۹',
    },
    {
        username: 'mahnazhagh',
        fullName: 'مهناز حقیقت‌‌نژاد',
        age: '۷۷',
        sex: 'F',
        illness: 'نامشخص',
        lastVisit: '۹۹/۰۵/۱۱',
    },
];

class PatientsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {}
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }


    render() {
        const patientInfoCards = [];
        for (const patient of patientList) {
            patientInfoCards.push(
                <PatientInfoCard
                    key={patient.username}
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
                <ScrollView style={styles.container}>
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
    return (
        <Surface style={styles.patientInfoCardContainer}>
            <Card>
                <Card.Title
                    title={props.patientInfo.fullName}
                    subtitle="تحت نظر از ‌فروردین ۹۸"
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
    return (
        <Row>
            <InfoItem
                title={props.patientInfo.illness}
                customIcon={<MaterialCommunityIcons name="stethoscope" size={20} color={currentTheme.colors.placeholder}/>}
            />
            <InfoItem
                title={`${props.patientInfo.age} سال `}
                customIcon={<MaterialCommunityIcons name={'calendar-account'} size={20} color={currentTheme.colors.placeholder}/>}
            />
        </Row>
    );
}

const InfoItem = (props) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
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