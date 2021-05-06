import React from "react";

import * as Layout from "../../visit/first/forms/Layout";
import {IntraSectionInvisibleDivider} from "../../visit/first/forms/Layout";
import {StyleSheet} from "react-native";
import {PatientProfileContext} from "../../profile/ContextProvider";
import {PatientDetailedInfoCard} from "../../profile/PatientInfoTab";
import {calcAge} from "../../../../../root/domain/util/Util";
import {getDisplayableValue} from "../../../../../root/domain/util/DisplayUtil";
import Patient from "../../../../../root/domain/Patient";


export class PatientInfoStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: true,
        }
        this.patientMedicalInfo = this.props.route.params.patientMedicalInfo;
        this.patientInfo = this.props.route.params.patientInfo;
    }


    componentDidMount() {
    }


    render() {

        return (
            <Layout.VisitScreen
            >
                <Layout.ScreenTitle title={'Patient Profile Summary'}/>
                <PatientMedicalInfoCard patientMedicalInfo={this.patientMedicalInfo} patientInfo={this.patientInfo}/>
                <IntraSectionInvisibleDivider/>
            </Layout.VisitScreen>

        )
    }
}

const PatientMedicalInfoCard = (props) => {
    const lastVisitDate = getDisplayableValue(props.patientMedicalInfo.lastVisitDate.jalali.asString, 'N/A') ;
    let inrTarget = props.patientMedicalInfo.inr.inrTargetRange;
    inrTarget = (!inrTarget.from && !inrTarget.to) ? 'N/A' : `${inrTarget.from || 'N/A'} - ${inrTarget.to || 'N/A'}`;

    let lastInrValue = props.patientMedicalInfo.inr.lastInrTest.lastInrValue || 'N/A';
    let lastInrTestDate = props.patientMedicalInfo.inr.lastInrTest.dateOfLastInrTest.jalali.asString || 'N/A';

    let medicalConditionList = Patient.getMedicalConditionsListAsString(props.patientInfo);

    const restOfMedicalConditionItems = props.patientInfo.medicalCondition.slice(1)
        .map((condition, index) => {
            return {
                id: `MEDICAL_CONDITIONS_${index}`,
                name: '',
                value: condition.name,
            }
        });

    return <PatientDetailedInfoCard
        patientInfo={props.patientInfo}
        nonFarsiCard
        rowProps={{
            reverse: true,
            style: {
                // paddingLeft: 10,
            }
        }}
        containerStyle={{
            paddingVertical: 0,
        }}
        textProps={{
            numberOfLines: 1,
            // ellipsizeMode: 'tail',
        }}
        columnStyle={{
            paddingHorizontal: 15,
        }}
        textWrapperStyle={{
        }}
        items={[
            {
                id: 'NAME',
                name: 'Name',
                value: props.patientInfo.fullName,
            },
            {
                id: 'AGE',
                name: 'Age',
                value: calcAge(props.patientInfo.birthDate),
            },
            {
                id: 'GENDER',
                name: 'Gender',
                value: props.patientInfo.gender,
            },
            {
                id: 'LAST_VISIT',
                name: 'Last Visit Date',
                value: lastVisitDate,
            },
            // {
            //     id: 'MEDICAL_CONDITIONS',
            //     name: 'Medical Conditions',
            //     value: medicalConditionList,
            // },
            // ...restOfMedicalConditionItems,
            {
                id: 'INR_TARGET_RANGE',
                name: 'INR Target Range',
                value: inrTarget,
            },
            {
                id: 'LAST_INR',
                name: 'Last INR',
                value: lastInrValue,
            },
            {
                id: 'LAST_INR_DATE',
                name: 'Last INR Test Date',
                value: lastInrTestDate,
            },
        ]}
    />
}


const styles = StyleSheet.create({
})