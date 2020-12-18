import React, {useCallback, useState} from "react";
import * as Layout from "./forms/Layout";
import {Text, Button, Divider, Switch, TextInput, HelperText} from "react-native-paper";
import {currentTheme, mostlyWhiteTheme} from "../../../../../../theme";
import {ConditionalRender, IntraSectionInvisibleDivider, PrimaryText} from "./forms/Layout";
import {Platform, PanResponder, View} from 'react-native';
import {Formik} from "formik";
import * as Yup from 'yup';
import {debugBorderRed} from "../../../../../root/view/styles/borders";
import {visitDao} from "../../../../data/dao/VisitDao";
import {firstNonEmpty, hasValue} from "../../../../../root/domain/util/Util";
import * as Validators from "../../../../../root/view/form/Validators";
import {rootDao} from "../../../../../root/data/dao/RootDao";
import {SHORT_TEXT} from "../../../../../root/view/form/Validators";


export class InrInfoStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latestInrAtHome: false,
            inrResult: 0,
            testLocation: '',
            testDate: [],
            targetRange: [0, 0],
        }
        this.inrTestInfo = {};
    }

    toggleLatestInrAtHome = () => {
        this.inrTestInfo.testAtHome = !this.state.latestInrAtHome;
        this.setState({latestInrAtHome: !this.state.latestInrAtHome});
    }

    componentDidMount() {
        this.inrTestInfo = visitDao.getVisits(this.props.route.params.userId).inr;

        this.setState({latestInrAtHome: firstNonEmpty(this.inrTestInfo.testAtHome, false)});
    }

    handleChange = (inputName, data) => {
        this.inrTestInfo[inputName] = data;
        let stateChange = {};
        stateChange[inputName] = data;
        this.setState(stateChange);
    }

    handleArrayChange = (inputName, index, data) => {
        this.inrTestInfo[inputName][index] = data;
        let stateChange = {};
        stateChange[inputName] = this.state[inputName];
        stateChange[inputName][index] = data;
        this.setState(stateChange);
    }

    render() {
        return (
            <Layout.VisitScreen
            >
                <Layout.ScreenTitle title={'آزمایش INR'} description={'اطلاعات مربوط به نتایج آخرین آزمایش INR'}/>
                <Formik
                    initialValues={{
                        inrResult: null,
                        testLocation: null,
                        testDateDay: null,
                        testDateMonth: null,
                        testDateYear: null,
                        targetRangeFrom: null,
                        targetRangeTo: null,
                    }}
                    validationSchema={Yup.object({
                        inrResult: Validators.INR,
                        testLocation: Validators.SHORT_TEXT,
                        testDateDay: Validators.DAY,
                        testDateMonth: Validators.MONTH,
                        testDateYear: Validators.YEAR,
                        targetRangeFrom: Validators.INR,
                        targetRangeTo: Validators.INR,
                    })}
                    validateOnChange={false}
                    validateOnBlur={true}
                    validateOn
                    onSubmit={(values, { validate }) => {
                        this.submitForm(values);
                    }}
                >
                    {({ handleChange, handleBlur, values, touched, errors, validateField }) => {
                        return (
                            <Layout.FormSection>
                                <SwitchRow
                                    title={'آزمایش خانگی'}
                                    description={'آیا آزمایش در خانه انجام شده؟'}
                                    value={this.state.latestInrAtHome}
                                    onChange={this.toggleLatestInrAtHome}
                                />
                                <Layout.IntraSectionInvisibleDivider sm/>
                                <Layout.InputTitle title={'میزان شاخص'}/>
                                <DefaultTextInput
                                    placeholder={"INR"}
                                    numeric
                                    onChangeText={handleChange('inrResult')}
                                    onBlur={handleBlur('inrResult')}
                                />
                                <HelperText type="error" visible={errors.inrResult}>
                                    {errors.inrResult}
                                </HelperText>
                                <Layout.IntraSectionInvisibleDivider sm/>
                                <ConditionalRender hidden={this.state.latestInrAtHome}>
                                    <Layout.InputTitle title={'محل آزمایش'} style={{}}/>
                                    <DefaultTextInput
                                        placeholder={"مثال: آزمایشگاه فارابی"}
                                        textContentType={'location'}
                                        onChangeText={handleChange('testLocation')}
                                        onBlur={handleBlur('testLocation')}
                                        style={{}}
                                    />
                                    <HelperText type="error" visible={errors.testLocation}>
                                        {errors.testLocation}
                                    </HelperText>
                                    <Layout.IntraSectionInvisibleDivider sm/>
                                </ConditionalRender>
                                <Layout.InputTitle title={'تاریخ آزمایش'}/>
                                <Layout.Row justifyCenter>
                                    <View>
                                        <DefaultTextInput
                                            placeholder={"روز"}
                                            style={{flexGrow: 0, paddingHorizontal: 25}}
                                            numeric
                                            onChangeText={handleChange('testDateDay')}
                                            onBlur={handleBlur('testDateDay')}
                                        />
                                        <HelperText type="error" visible={errors.testDateDay}>
                                            {errors.testDateDay}
                                        </HelperText>
                                    </View>
                                    <View>
                                        <DefaultTextInput
                                            placeholder={"ماه"}
                                            style={{flexGrow: 0,marginHorizontal: 15,  paddingHorizontal: 25}}
                                            numeric
                                            onChangeText={handleChange('testDateMonth')}
                                            onBlur={handleBlur('testDateMonth')}
                                        />
                                        <HelperText type="error" visible={errors.testDateMonth}>
                                            {errors.testDateMonth}
                                        </HelperText>
                                    </View>
                                    <View>
                                        <DefaultTextInput
                                            placeholder={"سال"}
                                            style={{flexGrow: 0, paddingHorizontal: 25}}
                                            numeric
                                            onChangeText={handleChange('testDateYear')}
                                            onBlur={handleBlur('testDateYear')}
                                        />
                                        <HelperText type="error" visible={errors.testDateYear}>
                                            {errors.testDateYear}
                                        </HelperText>
                                    </View>
                                </Layout.Row>
                                <Layout.IntraSectionInvisibleDivider sm/>
                                <Layout.InputTitle title={'بازه هدف'}/>
                                <Layout.Row justifyCenter>
                                    <View>
                                        <DefaultTextInput
                                            label={'از'}
                                            style={{flexGrow: 0, paddingHorizontal: 25}}
                                            numeric
                                            onChangeText={handleChange('targetRangeFrom')}
                                            onBlur={handleBlur('targetRangeFrom')}
                                        />
                                        <HelperText type="error" visible={hasValue(errors.targetRangeFrom)}>
                                            {'0-5.0'}
                                        </HelperText>
                                    </View>
                                    <View style={{flexGrow: 0, marginHorizontal: 15,  paddingHorizontal: 30}}></View>
                                    <View>
                                        <DefaultTextInput
                                            label={'تا'}
                                            style={{flexGrow: 0, paddingHorizontal: 25}}
                                            numeric
                                            onChangeText={handleChange('targetRangeTo')}
                                            onBlur={handleBlur('targetRangeTo')}
                                        />
                                        <HelperText type="error" visible={hasValue(errors.targetRangeTo)}>
                                            {'0-5.0'}
                                        </HelperText>
                                    </View>
                                </Layout.Row>
                            </Layout.FormSection>
                        )
                    }}
                </Formik>
                <IntraSectionInvisibleDivider xl/>
            </Layout.VisitScreen>
        );
    }
}

export const SwitchRow = (props) => {
    return (
        <Layout.Row justifyBetween>
            <Layout.InputTitle title={props.title} description={props.description}/>
            <Switch
                style={{}} value={props.value}
                color={currentTheme.colors.primary}
                onValueChange={() => props.onChange()}
            />
        </Layout.Row>
    );
}


const DefaultTextInput = (props) => {
    return (
            <TextInput
                label={props.label}
                // value={}
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
            />
    )
}