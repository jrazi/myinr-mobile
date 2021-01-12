import React from "react";
import {StyleSheet, View} from "react-native";
import {HelperText, Text, TextInput, useTheme} from "react-native-paper";
import * as Layout from './forms/Layout';
import {IntraSectionInvisibleDivider} from "./forms/Layout";
import {visitDao} from "../../../../data/dao/VisitDao";
import {firstNonEmpty, hasValue} from "../../../../../root/domain/util/Util";
import {FirstVisit} from "../../../../domain/visit/Visit";
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
            this.physicalExamInfo = visitDao.getVisits(this.props.route.params.userId).physicalExam;
            this.setState({loaded: true});
        })
    }

    handleChange = (inputName, data, isValid) => {
        this.physicalExamInfo[inputName] = data;
    }

    render() {
        const readonly = this.props.route.params.readonly;
        const TextInputRow = (props) => <_TextInputRow {...props} disabled={readonly}/>
        return (
            <Layout.VisitScreen>
                <Layout.ScreenTitle title={'Physical Exam'} />
                <Formik
                    initialValues={{
                        bloodPressureSystolic: this.physicalExamInfo.bloodPressureSystolic,
                        bloodPressureDiastolic: this.physicalExamInfo.bloodPressureSystolic,
                        heartBeat: this.physicalExamInfo.heartBeat,
                        respiratoryRate: this.physicalExamInfo.respiratoryRate,
                    }}
                    validationSchema={Yup.object({
                        bloodPressureSystolic: Validators.BLOOD_PRESSURE,
                        bloodPressureDiastolic: Validators.BLOOD_PRESSURE,
                        heartBeat: Validators.HEARTBEAT,
                        respiratoryRate: Validators.RESPIRATORY_RATE,
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
                                        this.handleChange('bloodPressureSystolic', values.bloodPressureSystolic, true);
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
                                        this.handleChange('bloodPressureDiastolic', values.bloodPressureDiastolic, true);
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
