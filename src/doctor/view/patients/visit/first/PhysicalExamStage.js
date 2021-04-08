import React from "react";
import {StyleSheet, View} from "react-native";
import {HelperText, Text, TextInput, useTheme} from "react-native-paper";
import * as Layout from './forms/Layout';
import {IntraSectionInvisibleDivider} from "./forms/Layout";
import {firstVisitDao} from "../../../../data/dao/FirstVisitDao";
import {firstNonEmpty, hasValue} from "../../../../../root/domain/util/Util";
import {FirstVisit} from "../../../../domain/visit/FirstVisit";
import {Formik} from "formik";
import * as Yup from "yup";
import * as Validators from "../../../../../root/view/form/Validators";
import {debugBorderRed} from "../../../../../root/view/styles/borders";


export class PhysicalExamStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
        this.physicalExamInfo = FirstVisit.createNew().physicalExam;
    }

    componentDidMount() {
        this.setState({loaded: false}, () => {
            this.physicalExamInfo = firstVisitDao.getVisits(this.props.route.params.userId).physicalExam;
            this.setState({loaded: true});
        })
    }

    handleChange = (inputName, data, isValid) => {
        this.physicalExamInfo[inputName] = data;
    }

    handleInputChange = (changeFunction) => {
        changeFunction();
    }

    render() {
        const readonly = this.props.route.params.readonly;
        const TextInputRow = (props) => <_TextInputRow {...props} disabled={readonly}/>
        return (
            <Layout.VisitScreen>
                <Layout.ScreenTitle title={'Physical Exam'} />
                <Formik
                    initialValues={{
                        bloodPressureSystolic: !this.state.loaded ? "" : this.physicalExamInfo.bloodPressure.systolic,
                        bloodPressureDiastolic: !this.state.loaded ? "" : this.physicalExamInfo.bloodPressure.diastolic,
                        heartBeat: !this.state.loaded ? "" : this.physicalExamInfo.heartBeat,
                        respiratoryRate: !this.state.loaded ? "" : this.physicalExamInfo.respiratoryRate,
                    }}
                    validationSchema={Yup.object({
                        bloodPressureSystolic: readonly ? Validators.NOTHING : Validators.BLOOD_PRESSURE,
                        bloodPressureDiastolic: readonly ? Validators.NOTHING : Validators.BLOOD_PRESSURE,
                        heartBeat: readonly ? Validators.NOTHING : Validators.HEARTBEAT,
                        respiratoryRate: readonly ? Validators.NOTHING : Validators.RESPIRATORY_RATE,
                    })}
                    validateOnChange={false}
                    validateOnBlur={true}
                    validateOnMount={true}
                    key={this.state.loaded}
                    onSubmit={(values, { validate }) => {
                    }}
                >
                    {({ handleChange, handleBlur, values, touched, errors, validateField, isValid }) => {
                        return (
                            <Layout.FormSection>
                                <TextInputRow
                                    title={'Blood Pressure' + ' (Systolic)'}
                                    placeholder={'mmHg'}
                                    numeric
                                    value={values.bloodPressureSystolic}
                                    onChangeText={handleChange('bloodPressureSystolic')}
                                    onBlur={(event) => {
                                        handleBlur('bloodPressureSystolic')(event);
                                        this.handleInputChange(() => {
                                            this.physicalExamInfo.bloodPressure.systolic = values.bloodPressureSystolic;
                                        });
                                    }}
                                    error={errors.bloodPressureSystolic}
                                />
                                <TextInputRow
                                    title={'Blood Pressure'  + ' (Diastolic)'}
                                    placeholder={'mmHg'}
                                    numeric
                                    value={values.bloodPressureDiastolic}
                                    onChangeText={handleChange('bloodPressureDiastolic')}
                                    onBlur={(event) => {
                                        handleBlur('bloodPressureDiastolic')(event);
                                        this.handleInputChange(() => {
                                            this.physicalExamInfo.bloodPressure.diastolic = values.bloodPressureDiastolic;
                                        });
                                    }}
                                    error={errors.bloodPressureDiastolic}
                                />
                                <TextInputRow
                                    title={'Heart Rate'}
                                    placeholder={'BPM'}
                                    numeric
                                    value={values.heartBeat}
                                    onChangeText={handleChange('heartBeat')}
                                    onBlur={(event) => {
                                        handleBlur('heartBeat')(event);
                                        this.handleChange('heartBeat', values.heartBeat, true);
                                    }}
                                    error={errors.heartBeat}
                                />
                                <TextInputRow
                                    title={'Respiratory Rate'}
                                    placeholder={'BPM'}
                                    numeric
                                    value={values.respiratoryRate}
                                    onChangeText={handleChange('respiratoryRate')}
                                    onBlur={(event) => {
                                        handleBlur('respiratoryRate')(event);
                                        this.handleChange('respiratoryRate', values.respiratoryRate, true);
                                    }}
                                    error={errors.respiratoryRate}
                                />
                            </Layout.FormSection>
                        );
                    }}
                </Formik>
            </Layout.VisitScreen>
        )
    }
}

const _TextInputRow = ({title, error, ...props}) => {
    return (
        <View>
            {/*<Layout.InputTitle title={title}/>*/}
            <DefaultTextInput
                {...props}
                label={title}
            />
            <Layout.TextInputHelperText type="error" visible={hasValue(error)}>
                {error}
            </Layout.TextInputHelperText>
            <IntraSectionInvisibleDivider s/>
        </View>
    )
}

const DefaultTextInput = (props) => {
    return (
        <View>
            <Layout.InputOutlineLabel title={props.label}/>
            <TextInput
                value={props.value}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                disabled={props.disabled}
                onBlur={props.onBlur}
                autoCompleteType={'off'}
                keyboardType={props.numeric ? 'numeric' : 'default'}
                textContentType={props.textContentType}
                autoCorrect={false}
                style={{
                    backgroundColor: useTheme().colors.surface,
                    // ...debugBorderRed,
                    fontSize: 14,
                    flexGrow: 0,
                    paddingHorizontal: 0,
                    textAlign: 'left',
                    ...props.style
                }}
                dense={true}
            />
        </View>
    )
}
