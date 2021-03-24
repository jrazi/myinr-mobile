import React, {useCallback, useState} from "react";
import * as Layout from "./forms/Layout";
import {Text, Button, Divider, Switch, TextInput, Portal, useTheme} from "react-native-paper";
import {
    ConditionalCollapsibleRender,
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
import {DefaultDatePicker} from "./forms/JalaliDatePicker";
import { DefaultSwitchRow} from "./forms/ContextSpecificComponents";



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
            this.setState({latestInrAtHome: firstNonEmpty(this.inrTestInfo.lastInrTest.hasUsedPortableDevice, false), loaded: true});
        })
    }

    handleChange = (inputName, data, isValid) => {
        this.inrTestInfo[inputName] = data;
    }

    handleArrayChange = (inputName, index, data, isValid) => {
        this.inrTestInfo[inputName][index] = data;
    }

    handleChange = (inputName, data, isValid) => {
        this.inrTestInfo[inputName] = data;
    }

    handleObjectChange = (obj, key, value, isValid=true) => {
        obj[key] = value;
    }

    changeValue = (changeFunction) => {
        changeFunction();
    }

    render() {

        const readonly = this.props.route.params.readonly;
        const DefaultTextInput = (props) => <_DefaultTextInput {...props} disabled={readonly}/>
        const DateInput = (props) => <_DateInput {...props} disabled={readonly}/>
        return (
            <Layout.VisitScreen
            >
                <Layout.ScreenTitle title={'INR Test'} description={'Results of the latest INR test'}/>
                <Formik
                    initialValues={{
                        inrResult: !this.state.loaded ? "" : this.inrTestInfo.lastInrTest.lastInrValue,
                        testLocation: !this.state.loaded ? "" : this.inrTestInfo.lastInrTest.lastInrTestLabInfo,
                        targetRangeFrom: !this.state.loaded ? "" : this.inrTestInfo.inrTargetRange.from,
                        targetRangeTo: !this.state.loaded ? "" : this.inrTestInfo.inrTargetRange.to,
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
                                <DefaultSwitchRow
                                    title={'Self-Test'}
                                    description={'Did the test take place at home?'}
                                    value={this.state.latestInrAtHome}
                                    onFlip={this.toggleLatestInrAtHome}
                                    disabled={readonly}
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
                                        this.changeValue(() => {
                                            this.inrTestInfo.lastInrTest.lastInrValue = values.inrResult
                                        });
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
                                            this.changeValue(() => {
                                                this.inrTestInfo.lastInrTest.lastInrTestLabInfo = values.testLocation
                                            });
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
                                    onDateChange={(date => {
                                        this.changeValue(() => {
                                            this.inrTestInfo.lastInrTest.dateOfLastInrTest = date
                                        });
                                    })}
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
                                                this.changeValue(() => {
                                                    this.inrTestInfo.inrTargetRange.from = values.targetRangeFrom
                                                });

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
                                                this.changeValue(() => {
                                                    this.inrTestInfo.inrTargetRange.to = values.targetRangeTo
                                                });

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


const _DefaultTextInput = (props) => {
    const theme = useTheme();
    return (
            <TextInput
                label={props.label}
                // value={}
                disabled={props.disabled}
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

const _DateInput = (props) => {
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
                disabled={props.disabled}
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


