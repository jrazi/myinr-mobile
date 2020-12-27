import React, {useEffect, useRef, useState} from "react";
import {StyleSheet} from "react-native";
import {currentTheme} from "../../../../../../theme";
import * as Layout from "./forms/Layout";
import {
    ConditionalCollapsibleRender,
    ConditionalRender,
    IntraSectionDivider,
    IntraSectionInvisibleDivider
} from "./forms/Layout";
import {visitDao} from "../../../../data/dao/VisitDao";
import {firstNonEmpty, hasValue} from "../../../../../root/domain/util/Util";
import {ChipBox, DefaultSwitchRow} from "./forms/ContextSpecificComponents";
import {TextInput} from "react-native-paper";
import {View} from 'react-native';
import {Formik} from "formik";
import * as Yup from "yup";
import * as Validators from "../../../../../root/view/form/Validators";
import {FirstVisit} from "../../../../domain/visit/Visit";


export class PastMedicalHistoryStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
        this.medicalHistory = FirstVisit.createNew().medicalHistory;
    }

    componentDidMount() {
        this.setState({loaded: false}, () => {
            this.medicalHistory = visitDao.getVisits(this.props.route.params.userId).medicalHistory;
            this.setState({loaded: true});
        })
    }

    handleTextInputChange = (inputName, data, isValid) => {
        this.medicalHistory[inputName].info = data;
    }

    handleTextInputSwitchChange = (inputName, switchValue) => {
        this.medicalHistory[inputName].active = switchValue;
    }

    render() {
        return (
            <Layout.VisitScreen
            >
                <Layout.ScreenTitle title={'Medical History'}/>
                <Layout.FormSection>
                    <Layout.InputTitle title={'Past Medical Conditions'}/>
                    <MedicalHistoryChipBox userId={this.props.route.params.userId}/>
                </Layout.FormSection>
                <IntraSectionDivider s/>
                <Layout.FormSection>
                    <Formik
                        initialValues={{
                            majorSurgery: this.medicalHistory.majorSurgery.info,
                            minorSurgery: this.medicalHistory.minorSurgery.info,
                            hospitalAdmission: this.medicalHistory.hospitalAdmission.info,
                        }}
                        validationSchema={Yup.object({
                            majorSurgery: Validators.SHORT_TEXT,
                            minorSurgery: Validators.SHORT_TEXT,
                            hospitalAdmission: Validators.SHORT_TEXT,
                        })}
                        validateOnChange={false}
                        validateOnBlur={true}
                        key={this.state.loaded}
                        onSubmit={(values, { validate }) => {
                        }}
                    >
                        {({ handleChange, handleBlur, values, touched, errors, validateField, isValid }) => {
                            return (
                                <View>
                                    <MedicalInfoInput
                                        title={'Major Surgery'}
                                        description={'In the last 5 years'}
                                        placeholder={'Surgery info'}
                                        value={values.majorSurgery}
                                        onChangeText={handleChange('majorSurgery')}
                                        onBlur={(event) => {
                                            handleBlur('majorSurgery')(event);
                                            this.handleTextInputChange('majorSurgery', values.majorSurgery, true);
                                        }}
                                        error={errors.majorSurgery}
                                        initialSwitchValue={this.medicalHistory['majorSurgery'].active}
                                        onChangeSwitch={(value) => this.handleTextInputSwitchChange('majorSurgery', value)}
                                    />
                                    <MedicalInfoInput
                                        title={'Minor Surgery'}
                                        description={'In the last 5 years'}
                                        placeholder={'Surgery info'}
                                        value={values.minorSurgery}
                                        onChangeText={handleChange('minorSurgery')}
                                        onBlur={(event) => {
                                            handleBlur('minorSurgery')(event);
                                            this.handleTextInputChange('minorSurgery', values.minorSurgery, true);
                                        }}
                                        error={errors.minorSurgery}
                                        initialSwitchValue={this.medicalHistory['minorSurgery'].active}
                                        onChangeSwitch={(value) => this.handleTextInputSwitchChange('minorSurgery', value)}
                                    />
                                    <MedicalInfoInput
                                        title={'Hospital Admission'}
                                        description={'In the last 5 years'}
                                        placeholder={'Admission info'}
                                        value={values.hospitalAdmission}
                                        onChangeText={handleChange('hospitalAdmission')}
                                        onBlur={(event) => {
                                            handleBlur('hospitalAdmission')(event);
                                            this.handleTextInputChange('hospitalAdmission', values.hospitalAdmission, true);
                                        }}
                                        error={errors.hospitalAdmission}
                                        initialSwitchValue={this.medicalHistory['hospitalAdmission'].active}
                                        onChangeSwitch={(value) => this.handleTextInputSwitchChange('hospitalAdmission', value)}
                                    />
                                </View>
                            );
                        }}
                    </Formik>
                </Layout.FormSection>
            </Layout.VisitScreen>
        );
    }
}

export const MedicalHistoryChipBox = (props) => {

    medicalConditions.sort((a, b) => a.name.length - b.name.length);

    let visit = useRef({});

    let [loaded, setLoaded] = useState(false);
    useEffect(() => {
        visit.current = visitDao.getVisits(props.userId);
        medicalConditions
            .sort((a, b) => a.name.length - b.name.length)
            .forEach(condition => {
                condition['value'] = firstNonEmpty(visit.current.medicalHistory.pastConditions[condition.id], false);
            });
        setLoaded(true);
    }, []);



    const changeValue = (id, value) => {visit.current.medicalHistory.pastConditions[id] = value};
    
    return (
        <Layout.InputArea>
            <Layout.ItemsBox>
                <ChipBox items={medicalConditions} onChange={changeValue}/>
            </Layout.ItemsBox>
        </Layout.InputArea>
    )
}

const MedicalInfoInput = (props) => {
    const [enabled, setEnabled] = useState(props.initialSwitchValue);
    const onSwitchFlipped = () => {
        props.onChangeSwitch(!enabled);
        setEnabled(!enabled);
    }
    return (
        <View>
            <DefaultSwitchRow
                title={props.title}
                description={props.description}
                value={enabled}
                onFlip={onSwitchFlipped}
            />
            <ConditionalCollapsibleRender hidden={!enabled}>
                <IntraSectionInvisibleDivider xs/>
                <TextInput
                    value={props.value}
                    placeholder={props.placeholder}
                    onChangeText={props.onChangeText}
                    onBlur={props.onBlur}
                    autoCompleteType={'off'}
                    returnKeyType={'next'}
                    keyboardType={props.numeric ? 'numeric' : 'default'}
                    textContentType={props.textContentType}
                    autoCorrect={false}
                    style={{
                        backgroundColor: currentTheme.colors.surface,
                        fontSize: 14,
                        flexGrow: 0,
                        paddingHorizontal: 0,
                        textAlign: 'left',

                        ...props.style
                    }}
                    dense={true}
                />
                <Layout.TextInputHelperText type="error" visible={hasValue(props.error)}>
                    {props.error}
                </Layout.TextInputHelperText>
            </ConditionalCollapsibleRender>
            <IntraSectionInvisibleDivider s/>
        </View>
    )
}


let medicalConditions = [
    {
        id: 0,
        name: 'Hypertension',
    },
    {
        id: 1,
        name: 'Diabetes Mellitus',
    },
    {
        id: 2,
        name: 'Hyperlipidemia',
    },
    {
        id: 3,
        name: 'Coronary Artery Disease',
    },
    {
        id: 4,
        name: 'Stroke',
    },
    {
        id: 5,
        name: 'Systemic Embolism',
    },
    {
        id: 6,
        name: 'Major Trauma',
    },
    {
        id: 7,
        name: 'Permanent Pace Maker',
    },
    {
        id: 8,
        name: 'ICD',
    },
    {
        id: 9,
        name: 'CRT',
    },
]

