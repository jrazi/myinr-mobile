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
import {FirstVisit} from "../../../../domain/visit/Visit";


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
                <Layout.ScreenTitle title={'آزمایش INR'} description={'اطلاعات مربوط به نتایج آخرین آزمایش INR'}/>
                <Formik
                    initialValues={{
                        inrResult: this.inrTestInfo.inrResult,
                        testLocation: this.inrTestInfo.testLocation,
                        testDateDay: this.inrTestInfo.testDate[2],
                        testDateMonth: this.inrTestInfo.testDate[1],
                        testDateYear: this.inrTestInfo.testDate[0],
                        targetRangeFrom: this.inrTestInfo.targetRange[0],
                        targetRangeTo: this.inrTestInfo.targetRange[1],
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
                    key={this.state.loaded}
                    onSubmit={(values, { validate }) => {
                    }}
                >
                    {({ handleChange, handleBlur, values, touched, errors, validateField, isValid }) => {
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
                                    value={values.inrResult}
                                    numeric
                                    onChangeText={handleChange('inrResult')}
                                    onBlur={(event) => {
                                        handleBlur('inrResult')(event);
                                        this.handleChange('inrResult', values.inrResult, true);
                                    }}
                                />
                                <HelperText type="error" visible={hasValue(errors.inrResult)}>
                                    {errors.inrResult}
                                </HelperText>
                                <Layout.IntraSectionInvisibleDivider sm/>
                                <ConditionalRender hidden={this.state.latestInrAtHome}>
                                    <Layout.InputTitle title={'محل آزمایش'} style={{}}/>
                                    <DefaultTextInput
                                        placeholder={"مثال: آزمایشگاه فارابی"}
                                        value={values.testLocation}
                                        textContentType={'location'}
                                        onChangeText={handleChange('testLocation')}
                                        onBlur={(event) => {
                                            handleBlur('testLocation')(event);
                                            this.handleChange('testLocation', values.testLocation, true);
                                        }}
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
                                            value={values.testDateDay}
                                            onChangeText={handleChange('testDateDay')}
                                            onBlur={(event) => {
                                                handleBlur('testDateDay')(event);
                                                this.handleArrayChange('testDate', 2, values.testDateDay, true);
                                            }}
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
                                            value={values.testDateMonth}
                                            onBlur={(event) => {
                                                handleBlur('testDateMonth')(event);
                                                this.handleArrayChange('testDate', 1, values.testDateMonth, true);
                                            }}
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
                                            value={values.testDateYear}
                                            onChangeText={handleChange('testDateYear')}
                                            onBlur={(event) => {
                                                handleBlur('testDateYear')(event);
                                                this.handleArrayChange('testDate', 0, values.testDateYear, true);
                                            }}
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
                                            value={values.targetRangeFrom}
                                            onChangeText={handleChange('targetRangeFrom')}
                                            onBlur={(event) => {
                                                handleBlur('targetRangeFrom')(event);
                                                this.handleArrayChange('targetRange', 0, values.targetRangeFrom, true);
                                            }}
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
                                            value={values.targetRangeTo}
                                            onChangeText={handleChange('targetRangeTo')}
                                            onBlur={(event) => {
                                                handleBlur('targetRangeTo')(event);
                                                this.handleArrayChange('targetRange', 1, values.targetRangeTo, true);
                                            }}
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