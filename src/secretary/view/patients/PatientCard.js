import React from "react";
import {calcAge, e2p, hasValue, jalaliTimePastInFarsi} from "../../../root/domain/util/Util";
import {Avatar, Card, Surface, Text, TouchableRipple, useTheme} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import {IntraSectionInvisibleDivider} from "../../../doctor/view/patients/visit/first/forms/Layout";
import Patient from "../../../root/domain/Patient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


export const PatientInfoCard = (props) => {
    // TODO Refactor
    const nameChunks = [props.patientInfo.firstName || '', props.patientInfo.lastName || ''];

    const theme = useTheme();
    const CardContainer = ({index, style, ...props}) => {
        if (index % 2 == 0) {
            return <View style={[{}, style]}>
                {props.children}
            </View>
        }
        else return <Surface style={[{elevation: 0,}, style]}>
            {props.children}
        </Surface>
    }
    return (
        <CardContainer index={props.index}
                       style={[{
                           // elevation: 4,
                       }, styles.patientInfoCardContainer]}
        >
            <TouchableRipple
                onPress={props.onPress}
                rippleColor="rgba(0, 0, 0, .1)"
                delayPressIn={ 100 }
            >
                <View style={{
                    // paddingBottom: 10,
                    paddingVertical: 5,
                }}>
                    <Card.Title
                        title={props.patientInfo.fullName}
                        subtitle={''}
                        left={() => <Avatar.Text
                            size={32} label={nameChunks[0][0] + '.' + nameChunks[1][0]}
                            style={{backgroundColor: theme.colors.accent}}
                        />}
                    />
                    <Card.Content>
                        <View >
                            <PatientCardDetails patientInfo={props.patientInfo}/>
                        </View>
                    </Card.Content>
                    <IntraSectionInvisibleDivider none borderWidth={0.1} style={{marginHorizontal: 20, marginTop: 10,}}/>
                </View>
            </TouchableRipple>
        </CardContainer>
    );
}

const PatientCardDetails = (props) => {
    const theme = useTheme();
    const age = props.patientInfo.decoratedBirthDate.jalali.asString ? e2p(String(calcAge(props.patientInfo.decoratedBirthDate.jalali.asString)).toString()) : null;
    const ageDescription =  (age || null) ? age + ' ' + 'سال' : 'نامشخص';

    const physicianName = props.patientInfo.physician.lastName ? ('دکتر' + ' ' + props.patientInfo.physician.lastName) : 'بدون پزشک';
    return ([
        <Row key={'first'}>
            <InfoItem
                title={physicianName}
                customIcon={<MaterialCommunityIcons name="stethoscope" size={20} color={theme.colors.placeholder}/>}
            />
            <InfoItem
                wrapperStyle={{
                    paddingLeft: 40,
                }}
                title={Patient.getMedicalConditionsListAsString(props.patientInfo) || '-'}
                customIcon={<MaterialCommunityIcons name="clipboard-list-outline" size={20} color={theme.colors.placeholder}/>}
            />
        </Row>,
        <Row key={'second'}>
            <InfoItem
                title={e2p(props.patientInfo.mobile || 'نامشخص')}
                customIcon={<MaterialCommunityIcons name="cellphone" size={20} color={theme.colors.placeholder}/>}
            />
            <InfoItem
                wrapperStyle={{
                    paddingLeft: 40,
                }}
                title={ageDescription}
                customIcon={<MaterialCommunityIcons name={'calendar-account'} size={20} color={theme.colors.placeholder}/>}
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
        flex: 1,
        // backgroundColor: 'white',
    },

    patientsListContainer: {

    },
    patientInfoCardContainer: {
    },
    patientInfoCard: {
    },
    patientCardDetails: {
    }
});

