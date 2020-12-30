import React, {useCallback, useState} from "react";
import * as Layout from "./forms/Layout";
import {Text, Button, Divider, Switch, TextInput, Portal, useTheme} from "react-native-paper";
import {
    ConditionalCollapsibleRender,
    ConditionalRender,
    IntraSectionInvisibleDivider,
    PrimaryText
} from "./forms/Layout";
import {Platform, PanResponder, View} from 'react-native';
import {Formik} from "formik";
import * as Yup from 'yup';
import {visitDao} from "../../../../data/dao/VisitDao";
import {
    firstNonEmpty,
    getFormattedJalaliDate,
    getFormFormattedJalaliDate,
    hasValue, jalaliToGeorgian
} from "../../../../../root/domain/util/Util";
import * as Validators from "../../../../../root/view/form/Validators";
import {FirstVisit} from "../../../../domain/visit/Visit";
import DatePicker from '@mohamadkh75/react-native-jalali-datepicker';
import {DefaultDatePicker} from "./forms/JalaliDatePicker";



export class InrInfoStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
        this.inrTestInfo = FirstVisit.createNew().inr;
        this.formRef = React.createRef();
    }

    toggleLatestInrAtHome = () => {
        this.inrTestInfo.testAtHome = !this.state.latestInrAtHome;
        this.setState({latestInrAtHome: !this.state.latestInrAtHome});
    }

    componentDidMount() {
        this.setState({loaded: false}, () => {
            this.inrTestInfo = visitDao.getVisits(this.props.route.params.userId).inr;
            this.setState({latestInrAtHome: firstNonEmpty(this.inrTestInfo.testAtHome, false), loaded: true});
        })
    }

    handleChange = (inputName, data, isValid) => {
        this.inrTestInfo[inputName] = data;
    }

    handleArrayChange = (inputName, index, data, isValid) => {
        this.inrTestInfo[inputName][index] = data;
    }


    render() {
        return (
            <Layout.VisitScreen
            >
                <Layout.ScreenTitle title={'INR Test'} description={'Results of the latest INR test'}/>
                <Formik
                    initialValues={{
                        inrResult: this.inrTestInfo.inrResult,
                        testLocation: this.inrTestInfo.testLocation,
                        targetRangeFrom: this.inrTestInfo.targetRange[0],
                        targetRangeTo: this.inrTestInfo.targetRange[1],
                    }}
                    validationSchema={Yup.object({
                        inrResult: Validators.INR,
                        testLocation: Validators.SHORT_TEXT,
                        targetRangeFrom: Validators.INR,
                        targetRangeTo: Validators.INR,
                    })}
                    validateOnChange={false}
                    validateOnBlur={true}
                    key={this.state.loaded}
                    onSubmit={(values, { validate }) => {
                    }}
                >
                    {({ handleChange, handleBlur, values, touched, errors, validateField, isValid }) => {
                        return (
                            <Layout.FormSection>
                                <SwitchRow
                                    title={'Self-Test'}
                                    description={'Did the test take place at home?'}
                                    value={this.state.latestInrAtHome}
                                    onChange={this.toggleLatestInrAtHome}
                                />
                                <Layout.IntraSectionInvisibleDivider sm/>
                                <Layout.InputTitle title={'Test Result'}/>
                                <DefaultTextInput
                                    placeholder={"INR"}
                                    value={values.inrResult}
                                    numeric
                                    onChangeText={handleChange('inrResult')}
                                    onBlur={(event) => {
                                        handleBlur('inrResult')(event);
                                        this.handleChange('inrResult', values.inrResult, true);
                                    }}
                                />
                                <Layout.TextInputHelperText type="error" visible={hasValue(errors.inrResult)}>
                                    {errors.inrResult}
                                </Layout.TextInputHelperText>
                                <Layout.IntraSectionInvisibleDivider sm/>
                                <ConditionalCollapsibleRender hidden={this.state.latestInrAtHome}>
                                    <Layout.InputTitle title={'Test Location'} style={{}}/>
                                    <DefaultTextInput
                                        placeholder={"Eg. Farabi Lab"}
                                        value={values.testLocation}
                                        textContentType={'location'}
                                        onChangeText={handleChange('testLocation')}
                                        onBlur={(event) => {
                                            handleBlur('testLocation')(event);
                                            this.handleChange('testLocation', values.testLocation, true);
                                        }}
                                        style={{}}
                                    />
                                    <Layout.TextInputHelperText type="error" visible={errors.testLocation}>
                                        {errors.testLocation}
                                    </Layout.TextInputHelperText>
                                    <Layout.IntraSectionInvisibleDivider sm/>
                                </ConditionalCollapsibleRender>
                                <Layout.InputTitle title={'Test Date'}/>
                                <DateInput
                                    placeholder={"Date of INR Test"}
                                    onDateChange={(date) => this.handleChange('testDate', date, true)}
                                    initialValue={this.inrTestInfo.testDate}
                                />
                                <Layout.IntraSectionInvisibleDivider sm/>
                                <Layout.InputTitle title={'Target Range'} description={"Target range for patient's INR"}/>
                                <Layout.IntraSectionInvisibleDivider xs/>
                                <Layout.Row justifyCenter>
                                    <View>
                                        <DefaultTextInput
                                            placeholder={'From'}
                                            style={{textAlign: 'center', paddingHorizontal: 25}}
                                            numeric
                                            value={values.targetRangeFrom}
                                            onChangeText={handleChange('targetRangeFrom')}
                                            onBlur={(event) => {
                                                handleBlur('targetRangeFrom')(event);
                                                this.handleArrayChange('targetRange', 0, values.targetRangeFrom, true);
                                            }}
                                        />
                                        <Layout.TextInputHelperText type="error" visible={hasValue(errors.targetRangeFrom)}>
                                            {'0-30.0'}
                                        </Layout.TextInputHelperText>
                                    </View>
                                    <View style={{flexGrow: 0, marginHorizontal: 15,  paddingHorizontal: 30,}}></View>
                                    <View>
                                        <DefaultTextInput
                                            placeholder={'To'}
                                            style={{textAlign: 'center', paddingHorizontal: 25}}
                                            numeric
                                            value={values.targetRangeTo}
                                            onChangeText={handleChange('targetRangeTo')}
                                            onBlur={(event) => {
                                                handleBlur('targetRangeTo')(event);
                                                this.handleArrayChange('targetRange', 1, values.targetRangeTo, true);
                                            }}
                                        />
                                        <Layout.TextInputHelperText type="error" visible={hasValue(errors.targetRangeTo)}>
                                            {'0-30.0'}
                                        </Layout.TextInputHelperText>
                                    </View>
                                </Layout.Row>
                            </Layout.FormSection>
                        )
                    }}
                </Formik>
                {/*<DefaultDatePicker/>*/}
            </Layout.VisitScreen>
        );
    }
}

export const SwitchRow = (props) => {
    const theme = useTheme();
    return (
        <Layout.Row justifyBetween>
            <Layout.InputTitle title={props.title} description={props.description}/>
            <Switch
                style={{}} value={props.value}
                color={theme.colors.accent}
                onValueChange={() => props.onChange()}
            />
        </Layout.Row>
    );
}


const DefaultTextInput = (props) => {
    const theme = useTheme();
    return (
            <TextInput
                label={props.label}
                // value={}
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
                    backgroundColor: theme.colors.surface,
                    fontSize: 14,
                    flexGrow: 0,
                    paddingHorizontal: 0,
                    textAlign: 'left',

                    ...props.style
                }}
                dense={true}
            />
    )
}

const DateInput = (props) => {
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [dateValue, setDateValue] = useState(firstNonEmpty(props.initialValue, getFormFormattedJalaliDate(new Date())));
    const onDateChange = (date) => {
        setDateValue(date);
        setDatePickerVisible(false);
        props.onDateChange(date);
    }
    const theme = useTheme();
    return (
        <View>
            <TextInput
                label={props.label}
                // value={}
                value={dateValue}

                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                // onBlur={() => setDatePickerVisible(false)}
                onFocus={() => setDatePickerVisible(true)}
                autoCompleteType={'off'}
                returnKeyType={'next'}
                keyboardType={null}
                showSoftInputOnFocus={false}
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
            <DefaultDatePicker visible={datePickerVisible} onDateChange={onDateChange} selectedDate={dateValue}/>
        </View>
    )
}


