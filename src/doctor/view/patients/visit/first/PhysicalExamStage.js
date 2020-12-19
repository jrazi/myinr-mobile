import React from "react";
import {StyleSheet, View} from "react-native";
import {HelperText, Text, TextInput} from "react-native-paper";
import * as Layout from './forms/Layout';
import {currentTheme} from "../../../../../../theme";
import {IntraSectionInvisibleDivider} from "./forms/Layout";
import {visitDao} from "../../../../data/dao/VisitDao";
import {firstNonEmpty, hasValue} from "../../../../../root/domain/util/Util";
import {FirstVisit} from "../../../../domain/visit/Visit";
import {Formik} from "formik";
import * as Yup from "yup";
import * as Validators from "../../../../../root/view/form/Validators";


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
        return (
            <Layout.VisitScreen>
                <Layout.ScreenTitle title={'معاینه بالینی'}/>
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
                                    title={'فشار خون' + ' (Systolic)'}
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
                                    title={'فشار خون'  + ' (Diastolic)'}
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
                                    title={'ضربان قلب'}
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
                                    title={'نرخ تنفسی'}
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
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: currentTheme.colors.surface,
    }
})

const TextInputRow = ({title, error, ...props}) => {
    return (
        <View>
            <Layout.InputTitle title={title}/>
            <DefaultTextInput
                {...props}
            />
            <HelperText type="error" visible={hasValue(error)}>
                {error}
            </HelperText>
            <IntraSectionInvisibleDivider m/>
        </View>
    )
}

const DefaultTextInput = (props) => {
    return (
        <TextInput
            label={props.label}
            value={props.value}
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            onBlur={props.onBlur}
            autoCompleteType={'off'}
            keyboardType={props.numeric ? 'numeric' : 'default'}
            textContentType={props.textContentType}
            autoCorrect={false}
            style={{
                backgroundColor: currentTheme.colors.surface,
                fontSize: 14,
                flexGrow: 0,
                paddingHorizontal: 0,

                ...props.style
            }}
            // dense={true}
        />
    )
}
