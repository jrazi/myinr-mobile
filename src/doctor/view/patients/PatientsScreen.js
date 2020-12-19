import React from "react";
import {StyleSheet, View, ScrollView, RefreshControl} from "react-native";
import {
    List,
    Surface,
    Card,
    Text,
    Avatar, TouchableRipple,
} from "react-native-paper";
import Icons from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {currentTheme, mostlyWhiteTheme} from "../../../../theme";
import {rootDao} from "../../../root/data/dao/RootDao";
import {calcAge, e2p, hasValue, jalaliTimePastInFarsi, normalizeDictForDisplay} from "../../../root/domain/util/Util";
import {ScreenHeader, ScreenLayout} from "../../../root/view/screen/Layout";
import {IntraSectionDivider} from "./visit/first/forms/Layout";

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


    render() {
        const patientInfoCards = [];
        for (let patient of this.state.patients) {
            patient.age = calcAge(patient.birthDate);
            const displayPatient = normalizeDictForDisplay(patient, 'FA');
            patientInfoCards.push([
                <PatientInfoCard
                    key={patient.nationalId + patient.username}
                    patientInfo={displayPatient}
                    onPress={() => this.props.navigation.navigate('PatientProfileScreen', {userId: patient.userId})}
                />,

            ]);
        }
        return (
            <ScreenLayout>
                <ScreenHeader
                    title="فهرست بیماران"
                    style={{elevation: 0}}
                />
                <ScrollView
                    style={styles.container}
                    refreshControl={
                        <RefreshControl refreshing={this.state.loading} onRefresh={this.refresh} colors={[currentTheme.colors.primary]} />
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

const PatientInfoCard = (props) => {
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
            <Surface style={[{
                // elevation: 4,
            }, styles.patientInfoCardContainer]}>
                <TouchableRipple
                    onPress={props.onPress}
                    rippleColor="rgba(0, 0, 0, .1)"
                    delayPressIn={ 100 }
                >
                    <View style={{
                        // paddingBottom: 10,
                    }}>
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
                        <IntraSectionDivider none borderWidth={0.1} style={{marginHorizontal: 20, marginTop: 10,}}/>
                    </View>
                </TouchableRipple>
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
        // paddingVertical: 10,
        // paddingHorizontal: 30,
        flex: 1,
        backgroundColor: 'white',
    },

    patientsListContainer: {
        // paddingVertical: 10,
        // paddingHorizontal: 20,
    },
    patientInfoCardContainer: {
        // elevation: 4,
        // marginVertical: 10,
        // borderRadius: currentTheme.roundness*2,
    },
    patientInfoCard: {
    },
    patientCardDetails: {
    }
});