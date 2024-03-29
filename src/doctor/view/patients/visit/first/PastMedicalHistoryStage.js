import React, {useEffect, useRef, useState} from "react";
import * as Layout from "./forms/Layout";
import {
    ConditionalCollapsibleRender,
    ConditionalRender,
    IntraSectionDivider,
    IntraSectionInvisibleDivider
} from "./forms/Layout";
import {firstVisitDao} from "../../../../data/dao/FirstVisitDao";
import {firstNonEmpty, hasValue} from "../../../../../root/domain/util/Util";
import {ChipBox, DefaultSwitchRow} from "./forms/ContextSpecificComponents";
import {TextInput, useTheme} from "react-native-paper";
import {View} from 'react-native';
import {Formik} from "formik";
import * as Yup from "yup";
import * as Validators from "../../../../../root/view/form/Validators";
import {FirstVisit} from "../../../../domain/visit/FirstVisit";
import ListUtil from "../../../../../root/domain/util/ListUtil";


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
            this.medicalHistory = firstVisitDao.getVisits(this.props.route.params.userId).medicalHistory;
            this.setState({loaded: true});
        })
    }

    handleTextInputChange = (inputName, data, isValid) => {
        this.medicalHistory[inputName] = data;
    }

    handleTextInputSwitchChange = (inputName, switchValue) => {
        if (switchValue === false)
            this.medicalHistory[inputName] = "";
    }

    render() {
        const readonly = this.props.route.params.readonly;
        const MedicalInfoInput = (props) => <_MedicalInfoInput {...props} disabled={readonly}/>
        return (
            <Layout.VisitScreen
            >
                <Layout.ScreenTitle title={'Medical History'}/>
                <Layout.FormSection>
                    <Layout.InputTitle title={'Past Medical Conditions'}/>
                    <MedicalHistoryChipBox userId={this.props.route.params.userId} readonly={readonly}/>
                </Layout.FormSection>
                <IntraSectionDivider s/>
                <Layout.FormSection>
                    <Formik
                        initialValues={{
                            majorSurgery: this.medicalHistory.majorSurgery,
                            minorSurgery: this.medicalHistory.minorSurgery,
                            hospitalAdmission: this.medicalHistory.hospitalAdmission,
                        }}
                        validationSchema={Yup.object({
                            majorSurgery: readonly ? Validators.NOTHING : Validators.SHORT_TEXT,
                            minorSurgery: readonly ? Validators.NOTHING : Validators.SHORT_TEXT,
                            hospitalAdmission: readonly ? Validators.NOTHING : Validators.SHORT_TEXT,
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
                                        initialSwitchValue={(this.medicalHistory.majorSurgery || "") != ""}
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
                                        initialSwitchValue={(this.medicalHistory.minorSurgery || "") != ""}
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
                                        initialSwitchValue={(this.medicalHistory.hospitalAdmission || "") != ""}
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
        visit.current = firstVisitDao.getVisits(props.userId);
        medicalConditions
            .forEach(condition => {
                condition['value'] = ListUtil.containsElementWithId(visit.current.medicalHistory.pastConditions, condition.id);
            });
        setLoaded(true);
    }, []);



    const changeValue = (id, value) => {
        const pastConditions = visit.current.medicalHistory.pastConditions;
        if (value == false) {
            ListUtil.removeById(pastConditions, id);
        }
        else {
            const condition = ListUtil.findOneById(medicalConditions, id);
            ListUtil.addById(pastConditions, condition);
        }
    };

    return (
        <Layout.InputArea>
            <Layout.ItemsBox>
                <ChipBox items={medicalConditions} onChange={changeValue} disableAll={props.readonly} key={`ChipMedConHis${loaded}`}/>
            </Layout.ItemsBox>
        </Layout.InputArea>
    )
}

const _MedicalInfoInput = (props) => {
    const theme = useTheme();
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
                disabled={props.disabled}
                onFlip={onSwitchFlipped}
            />
            <ConditionalCollapsibleRender hidden={!enabled}>
                <IntraSectionInvisibleDivider xs/>
                <TextInput
                    value={props.value}
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                    onChangeText={props.onChangeText}
                    onBlur={props.onBlur}
                    autoCompleteType={'off'}
                    returnKeyType={'next'}
                    keyboardType={props.numeric ? 'numeric' : 'default'}
                    textContentType={props.textContentType}
                    autoCorrect={false}
                    style={{
                        backgroundColor: theme.colors.surface,
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
        id: 33,
        name: 'Hypertension',
    },
    {
        id: 34,
        name: 'Diabetes Mellitus',
    },
    {
        id: 35,
        name: 'Hyperlipidemia',
    },
    {
        id: 36,
        name: 'Coronary Artery Disease',
    },
    {
        id: 37,
        name: 'Stroke',
    },
    {
        id: 38,
        name: 'Systemic Embolism',
    },
    {
        id: 39,
        name: 'Major Trauma',
    },
    {
        id: 40,
        name: 'Permanent Pace Maker',
    },
    {
        id: 41,
        name: 'ICD',
    },
    {
        id: 42,
        name: 'CRT',
    },
]

