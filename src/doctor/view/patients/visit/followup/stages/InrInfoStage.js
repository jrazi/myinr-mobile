import React from "react";
import * as Layout from "../../first/forms/Layout";
import {ConditionalCollapsibleRender} from "../../first/forms/Layout";
import {TextInput, useTheme} from "react-native-paper";
import {View} from 'react-native';
import {Formik} from "formik";
import * as Yup from 'yup';
import {firstNonEmpty, hasValue} from "../../../../../../root/domain/util/Util";
import * as Validators from "../../../../../../root/view/form/Validators";
import {DefaultDateInput, DefaultSwitchRow} from "../../first/forms/ContextSpecificComponents";


export class InrInfoStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            latestInrAtHome: false,
        }
        this.lastInrTestInfo = {};
    }

    toggleLatestInrAtHome = () => {
        this.lastInrTestInfo.hasUsedPortableDevice = !this.state.latestInrAtHome;
        this.setState({latestInrAtHome: !this.state.latestInrAtHome});
    }

    componentDidMount() {
        this.setState({loaded: false}, () => {
            this.lastInrTestInfo = this.props.route.params.visitInfo.inr.lastInrTest;
            this.setState({latestInrAtHome: firstNonEmpty(this.lastInrTestInfo.hasUsedPortableDevice, false), loaded: true});
        })
    }


    handleChange = (inputName, data, isValid) => {
        this.lastInrTestInfo[inputName] = data;
    }

    changeValue = (changeFunction) => {
        changeFunction();
    }

    render() {
        const readonly = this.props.route.params.readonly;
        const DefaultTextInput = (props) => <_DefaultTextInput {...props} disabled={readonly}/>
        const DateInput = (props) => <DefaultDateInput {...props} disabled={readonly}/>
        return (
            <Layout.VisitScreen
            >
                <Layout.ScreenTitle title={'INR Test'} description={'Results of the latest INR test'}/>
                <Formik
                    initialValues={{
                        inrResult: !this.state.loaded ? "" : this.lastInrTestInfo.lastInrValue,
                        testLocation: !this.state.loaded ? "" : this.lastInrTestInfo.lastInrTestLabInfo,
                    }}
                    validationSchema={Yup.object({
                        inrResult:  readonly ? Validators.NOTHING : Validators.INR,
                        testLocation: readonly ? Validators.NOTHING : Validators.SHORT_TEXT,
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
                                            this.lastInrTestInfo.lastInrValue = values.inrResult
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
                                        placeholder={readonly ? "" : "Eg. Farabi Lab"}
                                        value={values.testLocation}
                                        textContentType={'location'}
                                        onChangeText={handleChange('testLocation')}
                                        onBlur={(event) => {
                                            handleBlur('testLocation')(event);
                                            this.changeValue(() => {
                                                this.lastInrTestInfo.lastInrTestLabInfo = values.testLocation
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
                                            this.lastInrTestInfo.dateOfLastInrTest.jalali.asString = date
                                        });
                                    })}
                                    initialValue={!this.state.loaded ? null : this.lastInrTestInfo.dateOfLastInrTest.jalali.asString}
                                />
                                <Layout.IntraSectionInvisibleDivider sm/>
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


